import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Script para recalcular las estadísticas de todos los estudiantes
 * basándose en sus misiones completadas y roles elegidos
 */
async function recalculateAllStudentStats() {
  console.log('🔄 Iniciando recalculación de estadísticas de estudiantes...\n');

  try {
    // 1. Obtener todos los estudiantes
    const students = await prisma.student.findMany({
      include: {
        missionProgress: {
          where: {
            status: 'completed'
          }
        }
      }
    });

    console.log(`📊 Encontrados ${students.length} estudiantes\n`);

    let updatedCount = 0;

    // 2. Para cada estudiante, recalcular sus estadísticas
    for (const student of students) {
      console.log(`👤 Procesando: ${student.name}`);
      
      const completedMissions = student.missionProgress;
      const total = completedMissions.length;
      
      // Contar roles elegidos
      let rolesLogicCount = 0;
      let rolesCreativityCount = 0;
      let rolesLanguageCount = 0;
      
      completedMissions.forEach(progress => {
        const roleId = progress.selectedRoleId;
        if (roleId === 1) {
          rolesLogicCount++;
        } else if (roleId === 2) {
          rolesCreativityCount++;
        } else if (roleId === 3) {
          rolesLanguageCount++;
        }
      });
      
      // Calcular porcentajes
      const statLogic = total > 0 
        ? Math.round((rolesLogicCount / total) * 100) 
        : 0;
      const statCreativity = total > 0 
        ? Math.round((rolesCreativityCount / total) * 100) 
        : 0;
      const statLanguage = total > 0 
        ? Math.round((rolesLanguageCount / total) * 100) 
        : 0;
      
      console.log(`   📈 Misiones completadas: ${total}`);
      console.log(`   🧠 Lógica: ${rolesLogicCount} veces (${statLogic}%)`);
      console.log(`   🎨 Creatividad: ${rolesCreativityCount} veces (${statCreativity}%)`);
      console.log(`   📝 Lengua: ${rolesLanguageCount} veces (${statLanguage}%)`);
      
      // Actualizar en la base de datos
      await prisma.student.update({
        where: { id: student.id },
        data: {
          statLogic,
          statCreativity,
          statLanguage,
          rolesLogicCount,
          rolesCreativityCount,
          rolesLanguageCount,
          missionsCompleted: total
        }
      });
      
      updatedCount++;
      console.log(`   ✅ Actualizado\n`);
    }
    
    console.log(`\n✅ Recalculación completada exitosamente`);
    console.log(`📊 Total de estudiantes actualizados: ${updatedCount}`);
    
    // 3. Mostrar resumen de promedios de clase
    const avgStats = await calculateClassroomAverage();
    console.log(`\n📊 Promedios de clase:`);
    console.log(`   🧠 Lógica: ${avgStats.avgLogic}%`);
    console.log(`   🎨 Creatividad: ${avgStats.avgCreativity}%`);
    console.log(`   📝 Lengua: ${avgStats.avgLanguage}%`);
    
  } catch (error) {
    console.error('❌ Error durante la recalculación:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function calculateClassroomAverage() {
  const students = await prisma.student.findMany({
    select: {
      statLogic: true,
      statCreativity: true,
      statLanguage: true
    }
  });

  if (students.length === 0) {
    return { avgLogic: 0, avgCreativity: 0, avgLanguage: 0 };
  }

  const sumLogic = students.reduce((sum, s) => sum + s.statLogic, 0);
  const sumCreativity = students.reduce((sum, s) => sum + s.statCreativity, 0);
  const sumLanguage = students.reduce((sum, s) => sum + s.statLanguage, 0);

  return {
    avgLogic: Math.round(sumLogic / students.length),
    avgCreativity: Math.round(sumCreativity / students.length),
    avgLanguage: Math.round(sumLanguage / students.length)
  };
}

// Ejecutar el script
recalculateAllStudentStats()
  .then(() => {
    console.log('\n✨ Script finalizado correctamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
