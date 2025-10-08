import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando datos de prueba...');

  // Limpiar datos existentes
  await prisma.notification.deleteMany();
  await prisma.mission.deleteMany();
  await prisma.user.deleteMany();

  // Crear docente
  const teacher = await prisma.user.create({
    data: {
      firstName: 'Elias',
      lastName: 'Diaz',
      name: 'Elias Diaz',
      email: 'remindevelopment@gmail.com',
      password: 'testing1234', // En producción usar hash bcrypt
      role: 'docente',
      xp: 0,
      level: 1
    }
  });

  console.log('✅ Docente creado:', teacher.name);

  // Crear alumnos
  const students = await Promise.all([
    prisma.user.create({
      data: {
        firstName: 'Juan',
        lastName: 'Pérez',
        name: 'Juan Pérez',
        email: 'juan.perez@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 1850,
        level: 5,
        lastActivity: new Date('2025-10-02')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Ana',
        lastName: 'López',
        name: 'Ana López',
        email: 'ana.lopez@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 1420,
        level: 4,
        lastActivity: new Date('2025-10-03')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Pedro',
        lastName: 'Gómez',
        name: 'Pedro Gómez',
        email: 'pedro.gomez@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 980,
        level: 3,
        lastActivity: new Date('2025-10-01')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'María',
        lastName: 'García',
        name: 'María García',
        email: 'maria.garcia@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 1650,
        level: 4,
        lastActivity: new Date('2025-09-30')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Carlos',
        lastName: 'Rodríguez',
        name: 'Carlos Rodríguez',
        email: 'carlos.rodriguez@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 750,
        level: 2,
        lastActivity: new Date('2025-09-28')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Laura',
        lastName: 'Martínez',
        name: 'Laura Martínez',
        email: 'laura.martinez@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 2100,
        level: 5,
        lastActivity: new Date('2025-10-03')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Diego',
        lastName: 'Fernández',
        name: 'Diego Fernández',
        email: 'diego.fernandez@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 1200,
        level: 3,
        lastActivity: new Date('2025-09-29')
      }
    }),
    prisma.user.create({
      data: {
        firstName: 'Sofía',
        lastName: 'Sánchez',
        name: 'Sofía Sánchez',
        email: 'sofia.sanchez@alumno.edu',
        password: 'alumno123',
        role: 'alumno',
        xp: 890,
        level: 2,
        lastActivity: new Date('2025-10-02')
      }
    })
  ]);

  console.log(`✅ ${students.length} alumnos creados`);

  // Crear misiones
  const missions = await Promise.all([
    prisma.mission.create({
      data: {
        title: 'Resolver ejercicios de álgebra',
        description: 'Completar los ejercicios del capítulo 3 sobre ecuaciones lineales y sistemas de ecuaciones.',
        subject: 'Matemáticas',
        dueDate: new Date('2025-10-15'),
        timeLimit: '23:59',
        activationDate: new Date('2025-10-01'),
        status: 'activa',
        students: {
          connect: students.slice(0, 5).map(s => ({ id: s.id }))
        }
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Proyecto de ciencias naturales',
        description: 'Investigar sobre el ciclo del agua y presentar un informe con ilustraciones.',
        subject: 'Ciencias Naturales',
        dueDate: new Date('2025-10-20'),
        timeLimit: '18:00',
        activationDate: new Date('2025-10-02'),
        status: 'activa',
        students: {
          connect: students.slice(2, 7).map(s => ({ id: s.id }))
        }
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Lectura de Don Quijote - Capítulo 1',
        description: 'Leer el primer capítulo de Don Quijote y responder las preguntas de comprensión.',
        subject: 'Lengua',
        dueDate: new Date('2025-10-12'),
        timeLimit: '23:59',
        activationDate: new Date('2025-09-30'),
        status: 'activa',
        students: {
          connect: students.map(s => ({ id: s.id }))
        }
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Práctica de verbos en inglés',
        description: 'Completar el ejercicio de conjugación de verbos irregulares en pasado.',
        subject: 'Inglés',
        dueDate: new Date('2025-09-28'),
        timeLimit: '20:00',
        activationDate: new Date('2025-09-20'),
        status: 'cerrada',
        students: {
          connect: students.slice(0, 6).map(s => ({ id: s.id }))
        }
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Trabajo sobre la Revolución Industrial',
        description: 'Elaborar una presentación sobre las causas y consecuencias de la Revolución Industrial.',
        subject: 'Historia',
        dueDate: new Date('2025-10-25'),
        timeLimit: '23:59',
        activationDate: new Date('2025-10-03'),
        status: 'activa',
        students: {
          connect: students.slice(1, 5).map(s => ({ id: s.id }))
        }
      }
    }),
    prisma.mission.create({
      data: {
        title: 'Ejercicios de geometría',
        description: 'Resolver problemas de áreas y perímetros de figuras planas.',
        subject: 'Matemáticas',
        dueDate: new Date('2025-09-20'),
        timeLimit: '23:59',
        activationDate: new Date('2025-09-10'),
        status: 'cerrada',
        students: {
          connect: students.slice(0, 4).map(s => ({ id: s.id }))
        }
      }
    })
  ]);

  console.log(`✅ ${missions.length} misiones creadas`);

  // Crear notificaciones
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        message: 'Juan Pérez entregó la tarea de álgebra',
        recipientId: teacher.id,
        read: false
      }
    }),
    prisma.notification.create({
      data: {
        message: 'Ana López alcanzó el nivel 4',
        recipientId: teacher.id,
        read: false
      }
    }),
    prisma.notification.create({
      data: {
        message: 'Nueva pregunta en el foro de la Misión 2',
        recipientId: teacher.id,
        read: false
      }
    }),
    prisma.notification.create({
      data: {
        message: 'Pedro Gómez completó la Misión 3',
        recipientId: teacher.id,
        read: true
      }
    }),
    prisma.notification.create({
      data: {
        message: 'María García solicitó una revisión',
        recipientId: teacher.id,
        read: true
      }
    })
  ]);

  console.log(`✅ ${notifications.length} notificaciones creadas`);

  console.log('\n🎉 Datos de prueba sembrados exitosamente!');
  console.log(`\n📊 Resumen:`);
  console.log(`   - ${1} docente`);
  console.log(`   - ${students.length} alumnos`);
  console.log(`   - ${missions.length} misiones (${missions.filter(m => m.status === 'activa').length} activas)`);
  console.log(`   - ${notifications.length} notificaciones\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error sembrando datos:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
