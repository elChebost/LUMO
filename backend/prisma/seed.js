import { PrismaClient } from '@prisma/client';import { PrismaClient } from '@prisma/client';



const prisma = new PrismaClient();const prisma = new PrismaClient();



async function main() {async function main() {

  console.log('🌱 Sembrando datos de prueba...');  console.log('🌱 Sembrando datos de prueba...');



  // Crear usuarios (docentes y alumnos)  // Limpiar datos existentes

  const docente = await prisma.user.create({  await prisma.notification.deleteMany();

    data: {  await prisma.mission.deleteMany();

      firstName: 'María',  await prisma.user.deleteMany();

      lastName: 'González',

      name: 'María González',  // Crear docente

      email: 'maria@lumo.com',  const teacher = await prisma.user.create({

      password: '123456',    data: {

      role: 'docente',      firstName: 'Elias',

      xp: 5000,      lastName: 'Diaz',

      level: 10      name: 'Elias Diaz',

    }      email: 'remindevelopment@gmail.com',

  });      password: 'testing1234', // En producción usar hash bcrypt

      role: 'docente',

  const alumnos = [];      xp: 0,

        level: 1

  const alumno1 = await prisma.user.create({    }

    data: {  });

      firstName: 'Juan',

      lastName: 'Pérez',  console.log('✅ Docente creado:', teacher.name);

      name: 'Juan Pérez',

      email: 'juan@lumo.com',  // Crear alumnos

      password: '123456',  const students = await Promise.all([

      role: 'alumno',    prisma.user.create({

      xp: 1500,      data: {

      level: 3        firstName: 'Juan',

    }        lastName: 'Pérez',

  });        name: 'Juan Pérez',

  alumnos.push(alumno1);        email: 'juan.perez@alumno.edu',

        password: 'alumno123',

  const alumno2 = await prisma.user.create({        role: 'alumno',

    data: {        xp: 1850,

      firstName: 'Ana',        level: 5,

      lastName: 'Martínez',        lastActivity: new Date('2025-10-02')

      name: 'Ana Martínez',      }

      email: 'ana@lumo.com',    }),

      password: '123456',    prisma.user.create({

      role: 'alumno',      data: {

      xp: 2000,        firstName: 'Ana',

      level: 4        lastName: 'López',

    }        name: 'Ana López',

  });        email: 'ana.lopez@alumno.edu',

  alumnos.push(alumno2);        password: 'alumno123',

        role: 'alumno',

  const alumno3 = await prisma.user.create({        xp: 1420,

    data: {        level: 4,

      firstName: 'Carlos',        lastActivity: new Date('2025-10-03')

      lastName: 'López',      }

      name: 'Carlos López',    }),

      email: 'carlos@lumo.com',    prisma.user.create({

      password: '123456',      data: {

      role: 'alumno',        firstName: 'Pedro',

      xp: 1800,        lastName: 'Gómez',

      level: 3        name: 'Pedro Gómez',

    }        email: 'pedro.gomez@alumno.edu',

  });        password: 'alumno123',

  alumnos.push(alumno3);        role: 'alumno',

        xp: 980,

  const alumno4 = await prisma.user.create({        level: 3,

    data: {        lastActivity: new Date('2025-10-01')

      firstName: 'Laura',      }

      lastName: 'Sánchez',    }),

      name: 'Laura Sánchez',    prisma.user.create({

      email: 'laura@lumo.com',      data: {

      password: '123456',        firstName: 'María',

      role: 'alumno',        lastName: 'García',

      xp: 2200,        name: 'María García',

      level: 5        email: 'maria.garcia@alumno.edu',

    }        password: 'alumno123',

  });        role: 'alumno',

  alumnos.push(alumno4);        xp: 1650,

        level: 4,

  const alumno5 = await prisma.user.create({        lastActivity: new Date('2025-09-30')

    data: {      }

      firstName: 'Diego',    }),

      lastName: 'Rodríguez',    prisma.user.create({

      name: 'Diego Rodríguez',      data: {

      email: 'diego@lumo.com',        firstName: 'Carlos',

      password: '123456',        lastName: 'Rodríguez',

      role: 'alumno',        name: 'Carlos Rodríguez',

      xp: 1200,        email: 'carlos.rodriguez@alumno.edu',

      level: 2        password: 'alumno123',

    }        role: 'alumno',

  });        xp: 750,

  alumnos.push(alumno5);        level: 2,

        lastActivity: new Date('2025-09-28')

  console.log(`✅ ${alumnos.length + 1} usuarios creados`);      }

    }),

  // Crear misiones    prisma.user.create({

  const mision1 = await prisma.mission.create({      data: {

    data: {        firstName: 'Laura',

      title: 'Resolver ecuaciones cuadráticas',        lastName: 'Martínez',

      description: 'Practicar la resolución de ecuaciones de segundo grado usando la fórmula general',        name: 'Laura Martínez',

      subject: 'Matemáticas',        email: 'laura.martinez@alumno.edu',

      dueDate: new Date('2025-10-20'),        password: 'alumno123',

      timeLimit: '23:59',        role: 'alumno',

      status: 'activa',        xp: 2100,

      students: {        level: 5,

        connect: [{ id: alumno1.id }, { id: alumno2.id }, { id: alumno3.id }]        lastActivity: new Date('2025-10-03')

      }      }

    }    }),

  });    prisma.user.create({

      data: {

  const mision2 = await prisma.mission.create({        firstName: 'Diego',

    data: {        lastName: 'Fernández',

      title: 'Análisis de "Don Quijote"',        name: 'Diego Fernández',

      description: 'Leer los primeros 5 capítulos y escribir un ensayo sobre los personajes principales',        email: 'diego.fernandez@alumno.edu',

      subject: 'Lengua',        password: 'alumno123',

      dueDate: new Date('2025-10-25'),        role: 'alumno',

      timeLimit: '20:00',        xp: 1200,

      status: 'activa',        level: 3,

      students: {        lastActivity: new Date('2025-09-29')

        connect: [{ id: alumno2.id }, { id: alumno4.id }]      }

      }    }),

    }    prisma.user.create({

  });      data: {

        firstName: 'Sofía',

  const mision3 = await prisma.mission.create({        lastName: 'Sánchez',

    data: {        name: 'Sofía Sánchez',

      title: 'Experimento de fotosíntesis',        email: 'sofia.sanchez@alumno.edu',

      description: 'Realizar el experimento de fotosíntesis con plantas y documentar el proceso',        password: 'alumno123',

      subject: 'Ciencias',        role: 'alumno',

      dueDate: new Date('2025-10-18'),        xp: 890,

      timeLimit: '18:00',        level: 2,

      status: 'activa',        lastActivity: new Date('2025-10-02')

      students: {      }

        connect: [{ id: alumno1.id }, { id: alumno3.id }, { id: alumno5.id }]    })

      }  ]);

    }

  });  console.log(`✅ ${students.length} alumnos creados`);



  const mision4 = await prisma.mission.create({  // Crear misiones

    data: {  const missions = await Promise.all([

      title: 'Proyecto de historia: Revolución Industrial',    prisma.mission.create({

      description: 'Crear una presentación sobre los cambios sociales durante la Revolución Industrial',      data: {

      subject: 'Historia',        title: 'Resolver ejercicios de álgebra',

      dueDate: new Date('2025-10-15'),        description: 'Completar los ejercicios del capítulo 3 sobre ecuaciones lineales y sistemas de ecuaciones.',

      timeLimit: '23:59',        subject: 'Matemáticas',

      status: 'cerrada',        dueDate: new Date('2025-10-15'),

      students: {        timeLimit: '23:59',

        connect: [{ id: alumno4.id }, { id: alumno5.id }]        activationDate: new Date('2025-10-01'),

      }        status: 'activa',

    }        students: {

  });          connect: students.slice(0, 5).map(s => ({ id: s.id }))

        }

  console.log('✅ 4 misiones creadas');      }

    }),

  // Crear notificaciones    prisma.mission.create({

  await prisma.notification.create({      data: {

    data: {        title: 'Proyecto de ciencias naturales',

      message: 'Nueva misión de Matemáticas asignada',        description: 'Investigar sobre el ciclo del agua y presentar un informe con ilustraciones.',

      recipientId: alumno1.id,        subject: 'Ciencias Naturales',

      read: false        dueDate: new Date('2025-10-20'),

    }        timeLimit: '18:00',

  });        activationDate: new Date('2025-10-02'),

        status: 'activa',

  await prisma.notification.create({        students: {

    data: {          connect: students.slice(2, 7).map(s => ({ id: s.id }))

      message: 'Tu ensayo de Lengua ha sido evaluado',        }

      recipientId: alumno2.id,      }

      read: true    }),

    }    prisma.mission.create({

  });      data: {

        title: 'Lectura de Don Quijote - Capítulo 1',

  await prisma.notification.create({        description: 'Leer el primer capítulo de Don Quijote y responder las preguntas de comprensión.',

    data: {        subject: 'Lengua',

      message: 'Recordatorio: La misión de Ciencias vence mañana',        dueDate: new Date('2025-10-12'),

      recipientId: alumno3.id,        timeLimit: '23:59',

      read: false        activationDate: new Date('2025-09-30'),

    }        status: 'activa',

  });        students: {

          connect: students.map(s => ({ id: s.id }))

  console.log('✅ 3 notificaciones creadas');        }

      }

  console.log('\n🎉 Base de datos sembrada exitosamente!');    }),

  console.log('\n📊 Resumen:');    prisma.mission.create({

  console.log(`   - ${alumnos.length} alumnos`);      data: {

  console.log(`   - 1 docente`);        title: 'Práctica de verbos en inglés',

  console.log(`   - 4 misiones`);        description: 'Completar el ejercicio de conjugación de verbos irregulares en pasado.',

  console.log(`   - 3 notificaciones`);        subject: 'Inglés',

  console.log('\n🔑 Credenciales de prueba:');        dueDate: new Date('2025-09-28'),

  console.log('   Docente: maria@lumo.com / 123456');        timeLimit: '20:00',

  console.log('   Alumno: juan@lumo.com / 123456');        activationDate: new Date('2025-09-20'),

}        status: 'cerrada',

        students: {

main()          connect: students.slice(0, 6).map(s => ({ id: s.id }))

  .catch((e) => {        }

    console.error('❌ Error:', e);      }

    process.exit(1);    }),

  })    prisma.mission.create({

  .finally(async () => {      data: {

    await prisma.$disconnect();        title: 'Trabajo sobre la Revolución Industrial',

  });        description: 'Elaborar una presentación sobre las causas y consecuencias de la Revolución Industrial.',

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
