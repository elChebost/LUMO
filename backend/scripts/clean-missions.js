import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanMissions() {
  try {
    console.log('🧹 Limpiando misiones antiguas...');
    
    // Eliminar progreso de estudiantes relacionado con misiones
    const deletedProgress = await prisma.studentMissionProgress.deleteMany({});
    console.log(`✅ Eliminados ${deletedProgress.count} registros de progreso de estudiantes`);
    
    // Eliminar todas las actividades (si existen)
    try {
      const deletedActivities = await prisma.activity.deleteMany({});
      console.log(`✅ Eliminadas ${deletedActivities.count} actividades`);
    } catch (e) {
      console.log('⚠️ Tabla Activity no existe (es normal si ya fue eliminada del schema)');
    }
    
    // Eliminar todas las misiones
    const deletedMissions = await prisma.mission.deleteMany({});
    console.log(`✅ Eliminadas ${deletedMissions.count} misiones`);
    
    console.log('✨ Limpieza completada exitosamente');
  } catch (error) {
    console.error('❌ Error durante la limpieza:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

cleanMissions();
