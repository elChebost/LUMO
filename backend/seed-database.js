import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('🌱 Poblando la base de datos con datos de ejemplo...\n');
    
    // Crear escuela
    const school = await prisma.school.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Escuela Primaria LUMO',
        address: 'Av. Educación 123, Ciudad',
        shift: 'Mañana'
      }
    });
    console.log('🏫 Escuela creada:', school.name);

    // Crear profesor
    const teacher = await prisma.teacher.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Prof. María García',
        email: 'maria.garcia@lumo.edu',
        subjects: 'Matemáticas, Ciencias',
        schedule: 'Lunes a Viernes 8:00-14:00',
        role: 'Profesor Principal',
        schoolId: school.id
      }
    });
    console.log('👩‍🏫 Profesor creado:', teacher.name);

    // Crear aula
    const classroom = await prisma.classroom.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Aula 3A',
        schoolId: school.id,
        teacherId: teacher.id
      }
    });
    console.log('🏛️ Aula creada:', classroom.name);

    // Crear estudiantes de ejemplo
    const studentsData = [
      {
        name: 'Ana López',
        email: 'ana.lopez@estudiante.lumo',
        age: 8,
        level: 3,
        xp: 1250,
        schedule: 'Mañana'
      },
      {
        name: 'Carlos Mendoza',
        email: 'carlos.mendoza@estudiante.lumo',
        age: 9,
        level: 5,
        xp: 2800,
        schedule: 'Mañana'
      },
      {
        name: 'Sofía Ramírez',
        email: 'sofia.ramirez@estudiante.lumo',
        age: 8,
        level: 2,
        xp: 850,
        schedule: 'Mañana'
      },
      {
        name: 'Diego Torres',
        email: 'diego.torres@estudiante.lumo',
        age: 9,
        level: 4,
        xp: 1950,
        schedule: 'Mañana'
      }
    ];

    for (const studentData of studentsData) {
      const hashedPassword = await bcrypt.hash('123456', 10);
      
      const student = await prisma.student.upsert({
        where: { email: studentData.email },
        update: {},
        create: {
          ...studentData,
          password: hashedPassword,
          schoolId: school.id,
          teacherId: teacher.id,
          classroomId: classroom.id
        }
      });
      
      // Crear perfil del estudiante
      await prisma.studentProfile.upsert({
        where: { studentId: student.id },
        update: {},
        create: {
          avatar: '/src/assets/avatar.png',
          exp: studentData.xp,
          coins: Math.floor(studentData.xp / 10),
          studentId: student.id
        }
      });
      
      console.log(`👦👧 Estudiante creado: ${student.name} (Nivel ${student.level}, XP: ${student.xp})`);
    }

    // Crear misiones de ejemplo
    const missionsData = [
      {
        title: 'Suma y Resta Básica',
        description: 'Completa 20 ejercicios de suma y resta con números del 1 al 100',
        status: 'Activa',
        activationDate: new Date('2025-10-15T08:00:00'),
        dueDate: new Date('2025-10-22T23:59:00'),
        dueTime: '23:59'
      },
      {
        title: 'Lectura Comprensiva',
        description: 'Lee el cuento "El patito feo" y responde 5 preguntas sobre la historia',
        status: 'Activa',
        activationDate: new Date('2025-10-16T09:00:00'),
        dueDate: new Date('2025-10-25T17:00:00'),
        dueTime: '17:00'
      },
      {
        title: 'Proyecto de Ciencias',
        description: 'Crear un volcán en miniatura y explicar cómo funciona',
        status: 'Borrador',
        activationDate: null,
        dueDate: new Date('2025-11-01T16:00:00'),
        dueTime: '16:00'
      }
    ];

    for (const missionData of missionsData) {
      const mission = await prisma.mission.upsert({
        where: { id: missionsData.indexOf(missionData) + 1 },
        update: {},
        create: {
          ...missionData,
          teacherId: teacher.id
        }
      });
      console.log(`📋 Misión creada: ${mission.title} (${mission.status})`);
    }

    console.log('\n✅ Base de datos poblada exitosamente!');
    console.log('\n📊 Resumen de datos creados:');
    console.log(`   🏫 1 Escuela: ${school.name}`);
    console.log(`   👩‍🏫 1 Profesor: ${teacher.name}`);
    console.log(`   🏛️ 1 Aula: ${classroom.name}`);
    console.log(`   👦👧 ${studentsData.length} Estudiantes`);
    console.log(`   📋 ${missionsData.length} Misiones`);

  } catch (error) {
    console.error('❌ Error poblando la base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();