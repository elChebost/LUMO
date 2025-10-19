import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMissions() {
  console.log('🌱 Seeding missions...\n');

  const missions = [
    {
      title: 'El Faro Dormilón',
      summary: 'Un faro se quedó dormido y los barquitos no pueden ver su luz. ¡Ayúdalo a despertar!',
      description: 'Un faro en la playa se quedó dormido y los barquitos no pueden ver su luz. ¡Hay que despertarlo antes del anochecer!',
      previewImage: '/images/missions/faro-dormilon.jpg',
      narrative: JSON.stringify({
        contexto: 'Un faro muy viejo se quedó dormido justo cuando los barquitos más lo necesitaban. ¡Si no se despierta pronto, chocarán con las rocas!',
        roles: [
          {
            id: 1,
            nombre: 'Reparador de Luces',
            habilidad: 'Lógica',
            descripcion: 'Encuentra qué cables deben conectarse para que el faro vuelva a encenderse.',
            objetivo: 'Resolver un pequeño puzzle o secuencia lógica.'
          },
          {
            id: 2,
            nombre: 'Pintor del Faro',
            habilidad: 'Creatividad',
            descripcion: 'Dibuja o diseña cómo te gustaría que se vea el faro cuando vuelva a brillar.',
            objetivo: 'Usar colores e imaginación para crear una versión alegre del faro.'
          },
          {
            id: 3,
            nombre: 'Cuentacuentos Marino',
            habilidad: 'Lengua',
            descripcion: 'Escribe o cuenta una pequeña historia sobre cómo el faro se despertó.',
            objetivo: 'Crear un texto corto con principio, desarrollo y final.'
          }
        ]
      }),
      status: 'active',
      activationDate: new Date('2025-10-15'),
      dueDate: new Date('2025-10-30'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'La Biblioteca Encantada',
      summary: 'Los libros volaron y escondieron sus letras. ¡Ayúdalos a volver!',
      description: 'Los libros de la gran biblioteca empezaron a volar y a esconder sus letras. Hay que hacer que vuelvan a su lugar.',
      previewImage: '/images/missions/biblioteca-encantada.jpg',
      narrative: JSON.stringify({
        contexto: 'Los libros de la gran biblioteca empezaron a volar y a esconder sus letras. Hay que hacer que vuelvan a su lugar antes de que el guardián se enoje.',
        roles: [
          {
            id: 1,
            nombre: 'Buscador de Palabras',
            habilidad: 'Lógica',
            descripcion: 'Ordena las letras y números para que cada libro vuelva a su estante.',
            objetivo: 'Resolver puzzles de ordenamiento lógico.'
          },
          {
            id: 2,
            nombre: 'Ilustrador de Cuentos',
            habilidad: 'Creatividad',
            descripcion: 'Dibuja la portada de un libro mágico inventado por vos.',
            objetivo: 'Crear diseños originales de portadas de libros.'
          },
          {
            id: 3,
            nombre: 'Narrador de Letras',
            habilidad: 'Lengua',
            descripcion: 'Crea una historia corta sobre un libro que cobra vida por la noche.',
            objetivo: 'Escribir una historia breve y creativa.'
          }
        ]
      }),
      status: 'active',
      activationDate: new Date('2025-10-16'),
      dueDate: new Date('2025-11-01'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'El Reloj del Tiempo Loco',
      summary: 'El reloj corre al revés y el recreo llega antes que las clases. ¡Arreglémoslo!',
      description: 'El reloj de la escuela empezó a correr al revés. Necesitan arreglarlo antes de que todos olviden qué hora es.',
      previewImage: '/images/missions/reloj-loco.jpg',
      narrative: JSON.stringify({
        contexto: 'El reloj de la escuela empezó a correr al revés. ¡Ahora el recreo llega antes que las clases! Necesitan arreglarlo antes de que todos olviden qué hora es.',
        roles: [
          {
            id: 1,
            nombre: 'Ajusta-Tiempos',
            habilidad: 'Lógica',
            descripcion: 'Ordena los números del reloj y encuentra cuál falta o está en el lugar incorrecto.',
            objetivo: 'Resolver problemas de secuencias numéricas.'
          },
          {
            id: 2,
            nombre: 'Diseñador del Tiempo',
            habilidad: 'Creatividad',
            descripcion: 'Dibuja un reloj nuevo con formas y colores locos.',
            objetivo: 'Diseñar un reloj creativo y divertido.'
          },
          {
            id: 3,
            nombre: 'Cronista del Reloj',
            habilidad: 'Lengua',
            descripcion: 'Escribe una historia divertida sobre un día en que el tiempo fue al revés.',
            objetivo: 'Crear una narrativa imaginativa sobre el tiempo.'
          }
        ]
      }),
      status: 'active',
      activationDate: new Date('2025-10-17'),
      dueDate: new Date('2025-11-02'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'El Bosque Parlante',
      summary: 'Los árboles susurran palabras y canciones. ¡Escuchá con atención!',
      description: 'Los árboles empezaron a susurrar palabras y canciones. ¡Dicen que quieren jugar con los niños!',
      previewImage: '/images/missions/bosque-parlante.jpg',
      narrative: JSON.stringify({
        contexto: 'Los árboles empezaron a susurrar palabras y canciones. ¡Dicen que quieren jugar con los niños! Pero para entenderlos, hay que escuchar con atención.',
        roles: [
          {
            id: 1,
            nombre: 'Explorador del Sonido',
            habilidad: 'Lógica',
            descripcion: 'Adivina qué palabra dice cada árbol según las pistas que da.',
            objetivo: 'Resolver acertijos de deducción lógica.'
          },
          {
            id: 2,
            nombre: 'Pintor del Bosque',
            habilidad: 'Creatividad',
            descripcion: 'Dibuja cómo te imaginás a los árboles cuando cantan.',
            objetivo: 'Ilustrar árboles con expresiones y personalidad.'
          },
          {
            id: 3,
            nombre: 'Amigo del Bosque',
            habilidad: 'Lengua',
            descripcion: 'Escribe una pequeña historia sobre un árbol que aprende a hablar.',
            objetivo: 'Escribir una historia sobre la naturaleza.'
          }
        ]
      }),
      status: 'active',
      activationDate: new Date('2025-10-18'),
      dueDate: new Date('2025-11-03'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'La Ciudad Espejo',
      summary: 'Todo se ve al revés en la ciudad de los espejos. ¡Ayudá a que vuelva a la normalidad!',
      description: 'En la ciudad de los espejos, todo se ve al revés: las casas, los nombres e incluso los desayunos.',
      previewImage: '/images/missions/ciudad-espejo.jpg',
      narrative: JSON.stringify({
        contexto: 'En la ciudad de los espejos, todo se ve al revés: las casas, los nombres e incluso los desayunos. ¡Ayudá a que todo vuelva a la normalidad!',
        roles: [
          {
            id: 1,
            nombre: 'Detective de Reflejos',
            habilidad: 'Lógica',
            descripcion: 'Encuentra los objetos que están del lado equivocado.',
            objetivo: 'Identificar diferencias y resolver simetrías.'
          },
          {
            id: 2,
            nombre: 'Diseñador de Sombras',
            habilidad: 'Creatividad',
            descripcion: 'Dibuja cómo se vería la ciudad si los reflejos fueran de colores.',
            objetivo: 'Crear diseños con reflejos y colores imaginativos.'
          },
          {
            id: 3,
            nombre: 'Narrador de Espejos',
            habilidad: 'Lengua',
            descripcion: 'Escribe una historia sobre un niño que se encuentra con su reflejo y se hacen amigos.',
            objetivo: 'Contar una historia sobre identidad y amistad.'
          }
        ]
      }),
      status: 'active',
      activationDate: new Date('2025-10-19'),
      dueDate: new Date('2025-11-04'),
      dueTime: '23:59',
      teacherId: 1,
    },
  ];

  for (const missionData of missions) {
    const existing = await prisma.mission.findFirst({
      where: { title: missionData.title },
    });

    if (existing) {
      console.log(`⚠️  Misión "${missionData.title}" ya existe, saltando...`);
      continue;
    }

    const mission = await prisma.mission.create({
      data: missionData,
    });

    console.log(`✅ Creada: ${mission.title} (${mission.status})`);
  }

  console.log('\n✅ Seed de misiones completado!\n');
}

seedMissions()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
