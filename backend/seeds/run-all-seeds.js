import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function runSeeds() {
  console.log('\n🚀 ===================================');
  console.log('🌱 LUMO - Ejecutando todos los seeds');
  console.log('=====================================\n');

  try {
    // Verificar conexión a la BD
    await prisma.$connect();
    console.log('✅ Conexión a la base de datos establecida\n');

    const seeds = [
      { name: 'Datos Base (School, Teacher, Classroom)', file: 'base.seed.js' },
      { name: 'Estudiantes', file: 'students.seed.js' },
      { name: 'Misiones', file: 'missions.seed.js' },
      { name: 'Notificaciones', file: 'notifications.seed.js' },
    ];

    for (const seed of seeds) {
      console.log(`\n📦 Ejecutando seed: ${seed.name}...`);
      console.log('─'.repeat(50));
      
      try {
        execSync(`node seeds/${seed.file}`, { stdio: 'inherit' });
      } catch (error) {
        console.error(`❌ Error en seed ${seed.name}:`, error.message);
      }
      
      console.log('─'.repeat(50));
    }

    console.log('\n✅ ===================================');
    console.log('🎉 Todos los seeds completados!');
    console.log('=====================================\n');

    // Mostrar resumen
    const studentsCount = await prisma.student.count();
    const missionsCount = await prisma.mission.count();
    const notificationsCount = await prisma.notification.count();

    console.log('📊 Resumen de la base de datos:');
    console.log(`   👨‍🎓 Estudiantes: ${studentsCount}`);
    console.log(`   🎮 Misiones: ${missionsCount}`);
    console.log(`   🔔 Notificaciones: ${notificationsCount}\n`);

  } catch (error) {
    console.error('❌ Error fatal:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runSeeds();
