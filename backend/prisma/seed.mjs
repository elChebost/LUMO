import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando datos...');

  // Alumnos
  const juan = await prisma.user.create({
    data: {
      firstName: 'Juan', lastName: 'Pérez', name: 'Juan Pérez',
      email: 'juan@lumo.com', password: '123456', role: 'alumno', xp: 1500, level: 3
    }
  });

  const ana = await prisma.user.create({
    data: {
      firstName: 'Ana', lastName: 'Martínez', name: 'Ana Martínez',
      email: 'ana@lumo.com', password: '123456', role: 'alumno', xp: 2000, level: 4
    }
  });

  const carlos = await prisma.user.create({
    data: {
      firstName: 'Carlos', lastName: 'López', name: 'Carlos López',
      email: 'carlos@lumo.com', password: '123456', role: 'alumno', xp: 1800, level: 3
    }
  });

  console.log('✅ 3 alumnos creados');

  // Misiones
  await prisma.mission.create({
    data: {
      title: 'Ecuaciones cuadráticas',
      description: 'Resolver ejercicios de ecuaciones',
      subject: 'Matemáticas',
      dueDate: new Date('2025-10-20'),
      status: 'activa',
      students: { connect: [{ id: juan.id }, { id: ana.id }] }
    }
  });

  await prisma.mission.create({
    data: {
      title: 'Análisis Don Quijote',
      description: 'Ensayo sobre personajes',
      subject: 'Lengua',
      dueDate: new Date('2025-10-25'),
      status: 'activa',
      students: { connect: [{ id: carlos.id }] }
    }
  });

  console.log('✅ 2 misiones creadas');

  // Notificación
  await prisma.notification.create({
    data: {
      message: 'Nueva misión asignada',
      recipientId: juan.id
    }
  });

  console.log('✅ 1 notificación creada');
  console.log('\n🎉 ¡Datos sembrados!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
