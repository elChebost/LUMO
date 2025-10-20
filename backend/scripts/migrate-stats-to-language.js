import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateStatsToLanguage() {
  console.log('🔄 Iniciando migración de estadísticas...\n');

  try {
    // 1. Obtener todos los estudiantes
    const students = await prisma.student.findMany({
      include: {
        missionProgress: {
          include: {
            mission: true
          }
        }
      }
    });

    console.log(`📊 Encontrados ${students.length} estudiantes\n`);

    // 2. Para cada estudiante, recalcular sus estadísticas
    for (const student of students) {
      console.log(`\n👤 Procesando: ${student.name}`);
      
      // Contar misiones completadas
      const completedMissions = student.missionProgress.filter(
        p => p.status === 'completed'
      );
      
      const missionsCompleted = completedMissions.length;
      
      // Contar roles elegidos (asumiendo que selectedRoleId: 1=Lógica, 2=Creatividad, 3=Lengua/Writing)
      let rolesLogicCount = 0;
      let rolesCreativityCount = 0;
      let rolesLanguageCount = 0;
      
      completedMissions.forEach(progress => {
        if (progress.selectedRoleId === 1) rolesLogicCount++;
        else if (progress.selectedRoleId === 2) rolesCreativityCount++;
        else if (progress.selectedRoleId === 3) rolesLanguageCount++;
      });
      
      // Calcular porcentajes
      const statLogic = missionsCompleted > 0 
        ? Math.round((rolesLogicCount / missionsCompleted) * 100) 
        : 0;
      const statCreativity = missionsCompleted > 0 
        ? Math.round((rolesCreativityCount / missionsCompleted) * 100) 
        : 0;
      const statLanguage = missionsCompleted > 0 
        ? Math.round((rolesLanguageCount / missionsCompleted) * 100) 
        : 0;
      
      console.log(`   📈 Misiones completadas: ${missionsCompleted}`);
      console.log(`   🧠 Lógica: ${rolesLogicCount} (${statLogic}%)`);
      console.log(`   🎨 Creatividad: ${rolesCreativityCount} (${statCreativity}%)`);
      console.log(`   📝 Lengua: ${rolesLanguageCount} (${statLanguage}%)`);
      
      // Nota: Por ahora solo mostramos los datos, la actualización se hará después de la migración
    }
    
    console.log('\n✅ Análisis completado');
    console.log('\n⚠️  IMPORTANTE: Ejecuta la migración de Prisma después de esto');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

migrateStatsToLanguage();
