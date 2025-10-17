import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedBaseData() {
  console.log('🌱 Seeding base data (Schools, Teachers, Classrooms)...\n');

  // 1. Crear escuela
  let school = await prisma.school.findFirst({ where: { id: 1 } });
  
  if (!school) {
    school = await prisma.school.create({
      data: {
        id: 1,
        name: 'Escuela LUMO',
        address: 'Av. Principal 123',
        shift: 'Matutino',
      },
    });
    console.log(`✅ Escuela creada: ${school.name}`);
  } else {
    console.log(`⚠️  Escuela ya existe: ${school.name}`);
  }

  // 2. Crear profesor
  let teacher = await prisma.teacher.findFirst({ where: { id: 1 } });
  
  if (!teacher) {
    teacher = await prisma.teacher.create({
      data: {
        id: 1,
        name: 'Prof. María González',
        email: 'maria.gonzalez@lumo.com',
        subjects: 'Matemáticas, Ciencias',
        schedule: 'Lunes a Viernes 8:00-14:00',
        role: 'Docente',
        schoolId: 1,
      },
    });
    console.log(`✅ Profesor creado: ${teacher.name}`);
  } else {
    console.log(`⚠️  Profesor ya existe: ${teacher.name}`);
  }

  // 3. Crear aula
  let classroom = await prisma.classroom.findFirst({ where: { id: 1 } });
  
  if (!classroom) {
    classroom = await prisma.classroom.create({
      data: {
        id: 1,
        name: '5to A',
        schoolId: 1,
        teacherId: 1,
      },
    });
    console.log(`✅ Aula creada: ${classroom.name}`);
  } else {
    console.log(`⚠️  Aula ya existe: ${classroom.name}`);
  }

  console.log('\n✅ Seed de datos base completado!\n');
}

seedBaseData()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
