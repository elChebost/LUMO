import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedStudents() {
  console.log('🌱 Seeding students...\n');

  const hashedPassword = await bcrypt.hash('123456', 10);

  const students = [
    {
      name: 'Lucas Rodríguez',
      email: 'lucas.rodriguez@lumo.com',
      ci: '1234567-8',
      password: hashedPassword,
      age: 12,
      level: 3,
      xp: 450,
      schedule: 'Matutino',
      schoolId: 1,
      teacherId: 1,
      classroomId: 1,
      statLogic: 75,
      statCreativity: 60,
      statWriting: 80,
      avgTimeMinutes: 45,
      missionsCompleted: 8,
      isOnline: true,
    },
    {
      name: 'Sofía Martínez',
      email: 'sofia.martinez@lumo.com',
      ci: '2345678-9',
      password: hashedPassword,
      age: 11,
      level: 4,
      xp: 620,
      schedule: 'Matutino',
      schoolId: 1,
      teacherId: 1,
      classroomId: 1,
      statLogic: 90,
      statCreativity: 85,
      statWriting: 70,
      avgTimeMinutes: 52,
      missionsCompleted: 12,
      isOnline: false,
    },
    {
      name: 'Mateo Fernández',
      email: 'mateo.fernandez@lumo.com',
      ci: '3456789-0',
      password: hashedPassword,
      age: 13,
      level: 2,
      xp: 280,
      schedule: 'Vespertino',
      schoolId: 1,
      teacherId: 1,
      classroomId: 1,
      statLogic: 55,
      statCreativity: 70,
      statWriting: 50,
      avgTimeMinutes: 32,
      missionsCompleted: 5,
      isOnline: true,
    },
    {
      name: 'Valentina Pérez',
      email: 'valentina.perez@lumo.com',
      ci: '4567890-1',
      password: hashedPassword,
      age: 12,
      level: 5,
      xp: 850,
      schedule: 'Matutino',
      schoolId: 1,
      teacherId: 1,
      classroomId: 1,
      statLogic: 80,
      statCreativity: 95,
      statWriting: 90,
      avgTimeMinutes: 68,
      missionsCompleted: 15,
      isOnline: false,
    },
    {
      name: 'Benjamín Torres',
      email: 'benjamin.torres@lumo.com',
      ci: '5678901-2',
      password: hashedPassword,
      age: 11,
      level: 1,
      xp: 120,
      schedule: 'Vespertino',
      schoolId: 1,
      teacherId: 1,
      classroomId: 1,
      statLogic: 40,
      statCreativity: 45,
      statWriting: 35,
      avgTimeMinutes: 25,
      missionsCompleted: 2,
      isOnline: false,
    },
    {
      name: 'Camila González',
      email: 'camila.gonzalez@lumo.com',
      ci: '6789012-3',
      password: hashedPassword,
      age: 13,
      level: 3,
      xp: 510,
      schedule: 'Matutino',
      schoolId: 1,
      teacherId: 1,
      classroomId: 1,
      statLogic: 70,
      statCreativity: 75,
      statWriting: 85,
      avgTimeMinutes: 48,
      missionsCompleted: 9,
      isOnline: true,
    },
  ];

  for (const studentData of students) {
    const existing = await prisma.student.findUnique({
      where: { ci: studentData.ci },
    });

    if (existing) {
      console.log(`⚠️  Estudiante con CI ${studentData.ci} ya existe, saltando...`);
      continue;
    }

    const student = await prisma.student.create({
      data: studentData,
    });

    console.log(`✅ Creado: ${student.name} (CI: ${student.ci})`);
  }

  console.log('\n✅ Seed de estudiantes completado!\n');
}

seedStudents()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
