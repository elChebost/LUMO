import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Elimina todas las misiones y el progreso asociado
 */
async function clearMissions() {
  console.log('🗑️  Eliminando todas las misiones...\n');

  try {
    // Primero eliminar el progreso (por foreign key)
    const deletedProgress = await prisma.studentMissionProgress.deleteMany();
    console.log(`   ✅ Eliminado progreso: ${deletedProgress.count} registros`);

    // Luego eliminar las misiones
    const deletedMissions = await prisma.mission.deleteMany();
    console.log(`   ✅ Eliminadas misiones: ${deletedMissions.count} registros`);

    console.log('\n✅ Base de datos limpia!\n');
  } catch (error) {
    console.error('❌ Error al limpiar misiones:', error);
    throw error;
  }
}

clearMissions()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
