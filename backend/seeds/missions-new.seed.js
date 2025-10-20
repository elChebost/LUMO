import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMissions() {
  console.log('🌱 Seeding missions...\n');

  const missions = [
    {
      nombre: 'El Faro Dormilón',
      descripcionBreve: 'Un faro se quedó dormido y los barquitos no pueden ver su luz. ¡Ayúdalo a despertar!',
      historia: 'Un faro en la playa se quedó dormido y los barquitos no pueden ver su luz. ¡Hay que despertarlo antes del anochecer! Un faro muy viejo se quedó dormido justo cuando los barquitos más lo necesitaban.',
      fechaInicio: new Date('2025-10-15'),
      fechaFin: new Date('2025-10-30'),
      imagenURL: '/images/missions/faro-dormilon.jpg',
      estado: 'activa',
      roles: JSON.stringify([
        {
          id: 1,
          emoji: '🔧',
          nombre: 'Reparador de Luces',
          habilidad: 'Lógica',
          descripcion: 'Encuentra qué cables deben conectarse para que el faro vuelva a encenderse.'
        },
        {
          id: 2,
          emoji: '🎨',
          nombre: 'Pintor del Faro',
          habilidad: 'Creatividad',
          descripcion: 'Dibuja o diseña cómo te gustaría que se vea el faro cuando vuelva a brillar.'
        },
        {
          id: 3,
          emoji: '📝',
          nombre: 'Cuentacuentos Marino',
          habilidad: 'Lengua',
          descripcion: 'Escribe o cuenta una pequeña historia sobre cómo el faro se despertó.'
        }
      ]),
      teacherId: 1,
    },
    {
      nombre: 'La Biblioteca Encantada',
      descripcionBreve: 'Los libros volaron y escondieron sus letras. ¡Ayúdalos a volver!',
      historia: 'Los libros de la gran biblioteca empezaron a volar y a esconder sus letras. Hay que hacer que vuelvan a su lugar antes de que se pierdan para siempre.',
      fechaInicio: new Date('2025-10-15'),
      fechaFin: new Date('2025-11-05'),
      imagenURL: '/images/missions/biblioteca-encantada.jpg',
      estado: 'activa',
      roles: JSON.stringify([
        {
          id: 1,
          emoji: '🔍',
          nombre: 'Detective de Letras',
          habilidad: 'Lógica',
          descripcion: 'Encuentra patrones y pistas para descubrir dónde se escondieron las letras.'
        },
        {
          id: 2,
          emoji: '✨',
          nombre: 'Decorador Mágico',
          habilidad: 'Creatividad',
          descripcion: 'Diseña señales y marcadores para organizar los libros.'
        },
        {
          id: 3,
          emoji: '📖',
          nombre: 'Guardián de Historias',
          habilidad: 'Lengua',
          descripcion: 'Lee y resume historias para catalogar los libros correctamente.'
        }
      ]),
      teacherId: 1,
    },
    {
      nombre: 'El Reloj del Tiempo Loco',
      descripcionBreve: 'Un reloj gigante se volvió loco y mezcló el día con la noche.',
      historia: 'El gran reloj de la plaza empezó a correr hacia atrás y ahora el tiempo está todo mezclado. ¡Hay que arreglarlo antes de que el sol y la luna choquen!',
      fechaInicio: new Date('2025-10-20'),
      fechaFin: new Date('2025-11-10'),
      imagenURL: '/images/missions/reloj-tiempo-loco.jpg',
      estado: 'activa',
      roles: JSON.stringify([
        {
          id: 1,
          emoji: '⚙️',
          nombre: 'Ingeniero del Tiempo',
          habilidad: 'Lógica',
          descripcion: 'Ordena las manecillas y engranajes en el orden correcto.'
        },
        {
          id: 2,
          emoji: '🌈',
          nombre: 'Diseñador de Relojes',
          habilidad: 'Creatividad',
          descripcion: 'Crea un nuevo diseño para que el reloj se vea hermoso.'
        },
        {
          id: 3,
          emoji: '📜',
          nombre: 'Cronista del Reloj',
          habilidad: 'Lengua',
          descripcion: 'Escribe instrucciones para que nadie más lo rompa.'
        }
      ]),
      teacherId: 1,
    },
    {
      nombre: 'El Bosque Parlante',
      descripcionBreve: 'Los árboles perdieron sus voces y necesitan tu ayuda.',
      historia: 'Los árboles del bosque se quedaron sin voz y no pueden comunicarse con los animalitos. ¡Ayúdalos a recuperar sus palabras!',
      fechaInicio: new Date('2025-10-25'),
      fechaFin: new Date('2025-11-15'),
      imagenURL: '/images/missions/bosque-parlante.jpg',
      estado: 'proxima',
      roles: JSON.stringify([
        {
          id: 1,
          emoji: '🔬',
          nombre: 'Científico del Bosque',
          habilidad: 'Lógica',
          descripcion: 'Investiga qué causó que los árboles perdieran su voz.'
        },
        {
          id: 2,
          emoji: '🎭',
          nombre: 'Actor de la Naturaleza',
          habilidad: 'Creatividad',
          descripcion: 'Representa cómo hablan los árboles con gestos y dibujos.'
        },
        {
          id: 3,
          emoji: '💬',
          nombre: 'Traductor Arbóreo',
          habilidad: 'Lengua',
          descripcion: 'Crea un diccionario árbol-humano para comunicarse.'
        }
      ]),
      teacherId: 1,
    },
    {
      nombre: 'La Ciudad Espejo',
      descripcionBreve: 'Todo en la ciudad se reflejó al revés. ¡Hay que arreglarlo!',
      historia: 'Una mañana, toda la ciudad apareció reflejada en un espejo gigante. Las letras, los números y hasta las personas están al revés. ¡Necesitamos tu ayuda!',
      fechaInicio: new Date('2025-11-01'),
      fechaFin: new Date('2025-11-20'),
      imagenURL: '/images/missions/ciudad-espejo.jpg',
      estado: 'proxima',
      roles: JSON.stringify([
        {
          id: 1,
          emoji: '🧮',
          nombre: 'Matemático Reflejado',
          habilidad: 'Lógica',
          descripcion: 'Resuelve problemas y puzzles invertidos.'
        },
        {
          id: 2,
          emoji: '🖼️',
          nombre: 'Artista Simétrico',
          habilidad: 'Creatividad',
          descripcion: 'Dibuja la ciudad como debería verse normalmente.'
        },
        {
          id: 3,
          emoji: '✍️',
          nombre: 'Escritor Inverso',
          habilidad: 'Lengua',
          descripcion: 'Lee y escribe textos al revés para descifrarlos.'
        }
      ]),
      teacherId: 1,
    },
    {
      nombre: 'El Jardín de los Colores Perdidos',
      descripcionBreve: 'Las flores perdieron sus colores y se pusieron grises.',
      historia: 'El hermoso jardín de la escuela perdió todos sus colores. Las flores están tristes y grises. ¡Devuélveles la alegría con tus habilidades!',
      fechaInicio: new Date('2025-11-05'),
      fechaFin: new Date('2025-11-25'),
      imagenURL: '/images/missions/jardin-colores.jpg',
      estado: 'inactiva',
      roles: JSON.stringify([
        {
          id: 1,
          emoji: '🔬',
          nombre: 'Químico Botánico',
          habilidad: 'Lógica',
          descripcion: 'Mezcla colores siguiendo fórmulas científicas.'
        },
        {
          id: 2,
          emoji: '🎨',
          nombre: 'Pintor Floral',
          habilidad: 'Creatividad',
          descripcion: 'Pinta las flores con los colores más hermosos.'
        },
        {
          id: 3,
          emoji: '📝',
          nombre: 'Poeta del Jardín',
          habilidad: 'Lengua',
          descripcion: 'Escribe poemas sobre cada flor y su color.'
        }
      ]),
      teacherId: 1,
    }
  ];

  for (const missionData of missions) {
    const existing = await prisma.mission.findFirst({
      where: { nombre: missionData.nombre },
    });

    if (existing) {
      console.log(`⚠️  Misión "${missionData.nombre}" ya existe, saltando...`);
      continue;
    }

    const mission = await prisma.mission.create({
      data: missionData,
    });

    console.log(`✅ Creada: ${mission.nombre} (Estado: ${mission.estado})`);
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
