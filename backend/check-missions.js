import prisma from './config/db.js';

async function checkMissions() {
  try {
    console.log('\n📊 Verificando misiones en la base de datos...\n');
    
    const missions = await prisma.mission.findMany({
      include: {
        teacher: true,
      }
    });
    
    console.log(`Total de misiones: ${missions.length}`);
    
    if (missions.length > 0) {
      console.log('\n📋 Listado de misiones:\n');
      missions.forEach((m, i) => {
        console.log(`${i + 1}. ${m.nombre}`);
        console.log(`   Estado: ${m.estado}`);
        console.log(`   Profesor: ${m.teacher?.name || 'N/A'}`);
        console.log(`   Fecha inicio: ${m.fechaInicio}`);
        console.log(`   Fecha fin: ${m.fechaFin}`);
        console.log('');
      });
    } else {
      console.log('\n⚠️  No hay misiones en la base de datos');
      console.log('   Ejecuta: npm run seed:missions\n');
    }
    
    // Verificar misiones activas específicamente
    const activeMissions = await prisma.mission.findMany({
      where: { estado: 'activa' }
    });
    console.log(`Misiones activas: ${activeMissions.length}`);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

checkMissions();
