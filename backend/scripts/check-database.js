import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Verificando estado de la base de datos...\n');

  // Contar misiones
  const missions = await prisma.mission.findMany();
  console.log(`📋 Misiones totales: ${missions.length}`);
  missions.forEach(m => {
    console.log(`   - ${m.nombre} (${m.estado})`);
  });

  // Contar estudiantes
  const students = await prisma.student.findMany();
  console.log(`\n👥 Estudiantes totales: ${students.length}`);
  students.forEach(s => {
    console.log(`   - ${s.name} (${s.missionsCompleted} misiones completadas)`);
  });

  // Contar progreso de misiones
  const progress = await prisma.studentMissionProgress.findMany({
    include: {
      student: { select: { name: true } },
      mission: { select: { nombre: true } }
    }
  });
  console.log(`\n📊 Registros de progreso: ${progress.length}`);
  if (progress.length > 0) {
    console.log('\nDetalle del progreso:');
    progress.forEach(p => {
      console.log(`   - ${p.student.name} → ${p.mission.nombre} (${p.selectedRoleName || 'Sin rol'}) - ${p.status}`);
    });
  }

  console.log('\n✅ Verificación completada!\n');
}

checkDatabase()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
