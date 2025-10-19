import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const misionesData = [
  {
    nombre: 'El Bosque Silencioso',
    descripcionBreve: 'El bosque se quedó sin sonidos. Los árboles, los pájaros y el viento ya no hablan. Hay que ayudarlos a volver a cantar.',
    historia: 'Una mañana, el bosque se despertó muy callado. Nadie sabía por qué. Los aventureros entran entre los árboles para descubrir qué pasó y devolverle la voz al bosque.',
    fechaInicio: new Date('2025-10-20T08:00:00Z'),
    fechaFin: new Date('2025-11-10T23:59:00Z'),
    imagenURL: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800',
    estado: 'activa',
    roles: [
      {
        emoji: '🧩',
        nombre: 'Pensador',
        descripcion: 'Busca pistas entre los árboles para entender qué hizo callar al bosque.'
      },
      {
        emoji: '🎨',
        nombre: 'Soñador',
        descripcion: 'Imagina la canción que hará feliz al bosque otra vez.'
      },
      {
        emoji: '✏️',
        nombre: 'Hablador',
        descripcion: 'Escucha a los animales y cuenta su historia al resto.'
      }
    ]
  },
  {
    nombre: 'El Faro Dormido',
    descripcionBreve: 'El faro del puerto se quedó dormido y los barcos no pueden ver el camino. Hay que ayudarlo a despertar.',
    historia: 'En la noche, el faro olvidó cómo brillar. Los barcos están perdidos entre las olas. Los aventureros van a visitarlo para recordarle cómo encender su luz.',
    fechaInicio: new Date('2025-10-25T09:00:00Z'),
    fechaFin: new Date('2025-11-15T23:59:00Z'),
    imagenURL: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
    estado: 'proxima',
    roles: [
      {
        emoji: '🧩',
        nombre: 'Constructor',
        descripcion: 'Encuentra qué pieza falta para que el faro funcione.'
      },
      {
        emoji: '🎨',
        nombre: 'Artista',
        descripcion: 'Imagina cómo sería la luz más brillante del mar.'
      },
      {
        emoji: '✏️',
        nombre: 'Contador',
        descripcion: 'Habla con los marineros y repite las historias del faro para darle ánimo.'
      }
    ]
  },
  {
    nombre: 'Las Nubes Perdidas',
    descripcionBreve: 'Las nubes desaparecieron del cielo. El sol está cansado y no puede descansar. Hay que traerlas de vuelta.',
    historia: 'Un día, las nubes se fueron a jugar y no volvieron. El cielo se ve muy solo. Los aventureros viajan con el viento para encontrarlas.',
    fechaInicio: new Date('2025-11-01T08:00:00Z'),
    fechaFin: new Date('2025-11-20T23:59:00Z'),
    imagenURL: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800',
    estado: 'inactiva',
    roles: [
      {
        emoji: '🧩',
        nombre: 'Buscador',
        descripcion: 'Mira el cielo y descubre hacia dónde se fueron las nubes.'
      },
      {
        emoji: '🎨',
        nombre: 'Pintor',
        descripcion: 'Dibuja las nubes para que recuerden cómo volver.'
      },
      {
        emoji: '✏️',
        nombre: 'Mensajero',
        descripcion: 'Habla con el sol y el viento para pedir su ayuda.'
      }
    ]
  },
  {
    nombre: 'Las Luces Apagadas',
    descripcionBreve: 'En la ciudad, todas las luces se apagaron. Las calles están oscuras y tristes. Hay que volver a encenderlas.',
    historia: 'Las luces de la ciudad se durmieron al mismo tiempo. Ahora todo está oscuro. Los aventureros caminan por las calles buscando cómo hacerlas brillar otra vez.',
    fechaInicio: new Date('2025-11-10T09:00:00Z'),
    fechaFin: new Date('2025-12-01T23:59:00Z'),
    imagenURL: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    estado: 'inactiva',
    roles: [
      {
        emoji: '🧩',
        nombre: 'Reparador',
        descripcion: 'Descubre qué hizo que las luces se apagaran.'
      },
      {
        emoji: '🎨',
        nombre: 'Creador',
        descripcion: 'Imagina nuevas luces llenas de color.'
      },
      {
        emoji: '✏️',
        nombre: 'Guía',
        descripcion: 'Habla con la gente y cuenta cómo las luces volverán a despertar.'
      }
    ]
  },
  {
    nombre: 'El Castillo Detenido',
    descripcionBreve: 'En un castillo lejano, los relojes dejaron de moverse. Todo está quieto. Hay que hacer que el tiempo vuelva a correr.',
    historia: 'Dentro del castillo, nada cambia. El sol no se mueve y los días son iguales. Los aventureros deben ayudar al castillo a recordar cómo seguir adelante.',
    fechaInicio: new Date('2025-12-05T08:00:00Z'),
    fechaFin: new Date('2025-12-25T23:59:00Z'),
    imagenURL: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800',
    estado: 'inactiva',
    roles: [
      {
        emoji: '🧩',
        nombre: 'Relojero',
        descripcion: 'Mira los relojes y busca por qué se detuvieron.'
      },
      {
        emoji: '🎨',
        nombre: 'Poeta',
        descripcion: 'Imagina cómo suena el tiempo cuando camina.'
      },
      {
        emoji: '✏️',
        nombre: 'Narrador',
        descripcion: 'Habla con el castillo y cuéntale historias para que despierte.'
      }
    ]
  }
];

async function seedMissions() {
  try {
    console.log('🌱 Iniciando seed de misiones...');
    
    // Verificar que existe al menos un profesor
    const teacher = await prisma.teacher.findFirst();
    
    if (!teacher) {
      console.error('❌ No se encontró ningún profesor en la base de datos.');
      console.log('💡 Crea un profesor primero antes de ejecutar este seed.');
      process.exit(1);
    }
    
    console.log(`✅ Usando profesor: ${teacher.name} (ID: ${teacher.id})`);
    
    // Crear cada misión
    for (const misionData of misionesData) {
      const mission = await prisma.mission.create({
        data: {
          ...misionData,
          roles: JSON.stringify(misionData.roles),
          teacherId: teacher.id
        }
      });
      
      console.log(`✅ Misión creada: "${mission.nombre}" (${mission.estado})`);
    }
    
    console.log(`\n🎉 ¡Seed completado! Se crearon ${misionesData.length} misiones.`);
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedMissions();
