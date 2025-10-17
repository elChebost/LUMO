import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedNotifications() {
  console.log('🌱 Seeding notifications...\n');

  const notifications = [
    {
      title: '🎉 Nueva misión disponible',
      body: 'La misión "El Enigma del Algoritmo Perdido" ya está activa. ¡Comienza tu aventura lógica ahora!',
      senderId: 1, // Teacher ID
      targetStudentId: null, // Para todos
      targetGroup: null,
      read: false,
      metadata: JSON.stringify({
        type: 'mission_available',
        missionId: 1,
        priority: 'high',
      }),
    },
    {
      title: '📚 Recordatorio de entrega',
      body: 'Tienes hasta el 28 de octubre para completar "Corrige al Narrador". ¡No olvides revisar tu trabajo antes de enviarlo!',
      senderId: 1,
      targetStudentId: 2, // Sofía Martínez
      targetGroup: null,
      read: false,
      metadata: JSON.stringify({
        type: 'deadline_reminder',
        missionId: 3,
        daysLeft: 5,
      }),
    },
    {
      title: '🏆 ¡Felicitaciones!',
      body: 'Has completado "Rediseña el Mundo de Coralville" con calificación sobresaliente. Ganaste 15 puntos de creatividad y una nueva insignia.',
      senderId: 1,
      targetStudentId: 4, // Valentina Pérez
      targetGroup: null,
      read: true,
      metadata: JSON.stringify({
        type: 'mission_completed',
        missionId: 2,
        pointsEarned: 15,
        badgeUnlocked: 'creative_master',
      }),
    },
  ];

  for (const notificationData of notifications) {
    const notification = await prisma.notification.create({
      data: notificationData,
    });

    const target = notification.targetStudentId 
      ? `Estudiante #${notification.targetStudentId}` 
      : 'Todos';
    
    console.log(`✅ Creada: "${notification.title}" → ${target}`);
  }

  console.log('\n✅ Seed de notificaciones completado!\n');
}

seedNotifications()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
