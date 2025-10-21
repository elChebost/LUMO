import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Crea progreso de misiones realista para cada estudiante
 * Mantiene coherencia con las estadísticas de roles
 */
async function seedStudentProgress() {
  console.log('🌱 Creando progreso de misiones para estudiantes...\n');

  try {
    // Obtener todos los estudiantes y misiones
    const students = await prisma.student.findMany({ orderBy: { id: 'asc' } });
    const missions = await prisma.mission.findMany({ orderBy: { id: 'asc' } });

    console.log(`📊 ${students.length} estudiantes | ${missions.length} misiones\n`);

    // Limpiar progreso anterior
    await prisma.studentMissionProgress.deleteMany();
    console.log('🗑️  Progreso anterior eliminado\n');

    // Configuración de progreso por estudiante
    // [cantidad de misiones, distribución aproximada de roles: [Lógica, Creatividad, Lengua]]
    const studentProgressConfig = [
      { name: 'Lucas Rodríguez', missions: 3, rolePreference: [0.3, 0.4, 0.3] },
      { name: 'Sofía Martínez', missions: 5, rolePreference: [0.4, 0.3, 0.3] },
      { name: 'Mateo Fernández', missions: 2, rolePreference: [0.5, 0.3, 0.2] },
      { name: 'Valentina Pérez', missions: 4, rolePreference: [0.5, 0.25, 0.25] },
      { name: 'Benjamín Torres', missions: 1, rolePreference: [0.3, 0.4, 0.3] },
      { name: 'Camila González', missions: 4, rolePreference: [0.2, 0.5, 0.3] }
    ];

    let totalProgress = 0;

    for (const student of students) {
      const config = studentProgressConfig.find(c => c.name === student.name);
      if (!config) continue;

      const missionsToComplete = Math.min(config.missions, missions.length);
      
      // Seleccionar misiones aleatorias (solo activa y próxima para realismo)
      const availableMissions = missions.filter(m => m.estado === 'activa' || m.estado === 'proxima');
      const selectedMissions = availableMissions
        .sort(() => Math.random() - 0.5)
        .slice(0, missionsToComplete);

      console.log(`👤 ${student.name}:`);
      console.log(`   🎯 Completará ${selectedMissions.length} misiones`);

      // Distribuir roles según preferencia
      const roleNames = ['Lógica', 'Creatividad', 'Lengua'];
      const roleIds = [1, 2, 3];
      
      for (let i = 0; i < selectedMissions.length; i++) {
        const mission = selectedMissions[i];
        
        // Seleccionar rol basado en preferencias (con algo de aleatoriedad)
        const rand = Math.random();
        let selectedRoleIndex;
        
        if (rand < config.rolePreference[0]) {
          selectedRoleIndex = 0; // Lógica
        } else if (rand < config.rolePreference[0] + config.rolePreference[1]) {
          selectedRoleIndex = 1; // Creatividad
        } else {
          selectedRoleIndex = 2; // Lengua
        }

        const selectedRoleId = roleIds[selectedRoleIndex];
        const selectedRoleName = roleNames[selectedRoleIndex];

        // Crear progreso completado
        await prisma.studentMissionProgress.create({
          data: {
            studentId: student.id,
            missionId: mission.id,
            selectedRoleId: selectedRoleId,
            selectedRoleName: selectedRoleName,
            status: 'completed',
            tasksCompleted: 100,
            completedAt: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000) // Últimas 2 semanas
          }
        });

        console.log(`      ✅ ${mission.nombre} → ${selectedRoleName}`);
        totalProgress++;
      }
      console.log();
    }

    console.log(`\n📦 Total de registros de progreso creados: ${totalProgress}`);
    console.log('✅ Seed completado!\n');

  } catch (error) {
    console.error('❌ Error en seed:', error);
    throw error;
  }
}

seedStudentProgress()
  .catch((e) => {
    console.error('❌ Error fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
