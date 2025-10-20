import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Crea progreso de misiones para los estudiantes con roles asignados aleatoriamente
 */
async function seedMissionProgress() {
  console.log('🌱 Seeding mission progress...\n');

  // Obtener todos los estudiantes y misiones
  const students = await prisma.student.findMany();
  const missions = await prisma.mission.findMany({
    where: {
      estado: 'activa' // Solo misiones activas
    }
  });

  console.log(`📊 Encontrados ${students.length} estudiantes y ${missions.length} misiones activas\n`);

  // Configuración de progreso por estudiante (basado en sus missionsCompleted)
  const studentProgress = {
    1: 8,   // Lucas - 8 misiones
    2: 12,  // Sofía - 12 misiones (imposible con solo 3 activas, ajustaremos)
    3: 5,   // Mateo - 5 misiones
    4: 15,  // Valentina - 15 misiones (imposible, ajustaremos)
    5: 2,   // Benjamín - 2 misiones
    6: 9    // Camila - 9 misiones
  };

  let totalCreated = 0;

  for (const student of students) {
    const targetCompleted = studentProgress[student.id] || 0;
    const maxPossible = missions.length;
    const actualCompleted = Math.min(targetCompleted, maxPossible);

    console.log(`👤 ${student.name}: Completando ${actualCompleted} de ${maxPossible} misiones disponibles`);

    // Mezclar misiones aleatoriamente
    const shuffledMissions = [...missions].sort(() => Math.random() - 0.5);
    const selectedMissions = shuffledMissions.slice(0, actualCompleted);

    for (const mission of selectedMissions) {
      // Elegir un rol aleatorio (1=Lógica, 2=Creatividad, 3=Lengua)
      const roleId = Math.floor(Math.random() * 3) + 1;
      const roleNames = ['Lógica', 'Creatividad', 'Lengua'];
      const roleName = roleNames[roleId - 1];

      // Verificar si ya existe
      const existing = await prisma.studentMissionProgress.findUnique({
        where: {
          studentId_missionId: {
            studentId: student.id,
            missionId: mission.id
          }
        }
      });

      if (existing) {
        console.log(`   ⚠️  Ya existe progreso para misión "${mission.nombre}", saltando...`);
        continue;
      }

      // Crear progreso completado
      await prisma.studentMissionProgress.create({
        data: {
          studentId: student.id,
          missionId: mission.id,
          selectedRoleId: roleId,
          selectedRoleName: roleName,
          status: 'completed',
          tasksCompleted: 100,
          completedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) // Última semana
        }
      });

      totalCreated++;
      console.log(`   ✅ Completó "${mission.nombre}" como ${roleName}`);
    }
    console.log();
  }

  console.log(`\n✅ Seed de progreso completado! Total creado: ${totalCreated}\n`);
}

seedMissionProgress()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
