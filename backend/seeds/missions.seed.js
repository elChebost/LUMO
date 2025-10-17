import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedMissions() {
  console.log('🌱 Seeding missions...\n');

  const missions = [
    {
      title: 'El Enigma del Algoritmo Perdido',
      summary: 'El sistema ha detectado un algoritmo incompleto. ¿Podrás reconstruirlo?',
      description: 'Reconstruye los pasos faltantes del algoritmo perdido.',
      previewImage: '/images/missions/algorithm-enigma.jpg',
      narrative: JSON.stringify({
        roles: [
          {
            id: 1,
            title: 'Analista Lógico',
            skill: 'logic',
            story: 'El sistema ha detectado un algoritmo incompleto dentro del código de simulación. Tu tarea es reconstruir los pasos faltantes para que el programa vuelva a funcionar correctamente. Deberás ordenar correctamente 5 pasos lógicos y resolver el enigma sin errores en menos de 3 intentos.',
            objective: 'Resolver una serie de pasos lógicos (tipo puzzle o secuencia) para identificar el orden correcto.',
            rewardPoints: 10,
            estimatedTimeMinutes: 20,
          },
          {
            id: 2,
            title: 'Detective de Patrones',
            skill: 'logic',
            story: 'Los datos están desordenados y necesitas encontrar el patrón oculto. Analiza las secuencias y descubre qué regla matemática se esconde detrás de cada serie de números.',
            objective: 'Identificar patrones numéricos y completar las secuencias.',
            rewardPoints: 10,
            estimatedTimeMinutes: 15,
          },
          {
            id: 3,
            title: 'Arquitecto de Soluciones',
            skill: 'logic',
            story: 'El robot constructor necesita instrucciones precisas para completar la estructura. Diseña el algoritmo paso a paso que le permitirá construir el edificio sin errores.',
            objective: 'Crear un diagrama de flujo o pseudocódigo para resolver el problema.',
            rewardPoints: 12,
            estimatedTimeMinutes: 25,
          },
        ],
      }),
      status: 'active',
      activationDate: new Date('2025-10-15'),
      dueDate: new Date('2025-10-30'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'Rediseña el Mundo de Coralville',
      summary: 'Coralville necesita una renovación visual. ¡Crea tu propia versión!',
      description: 'Diseña una nueva interpretación artística del mundo de Coralville.',
      previewImage: '/images/missions/coralville-redesign.jpg',
      narrative: JSON.stringify({
        roles: [
          {
            id: 1,
            title: 'Artista Conceptual',
            skill: 'creativity',
            story: 'El universo de Coralville necesita una renovación visual. Crea una nueva interpretación artística del entorno o de un personaje usando los recursos disponibles. Se valora originalidad, coherencia temática y nivel de detalle.',
            objective: 'Diseñar o describir un nuevo concepto estético que mantenga coherencia con el entorno original.',
            rewardPoints: 15,
            estimatedTimeMinutes: 30,
          },
          {
            id: 2,
            title: 'Diseñador de Personajes',
            skill: 'creativity',
            story: 'Los habitantes de Coralville están listos para una transformación. Crea un nuevo personaje o rediseña uno existente con personalidad única y estilo visual atractivo.',
            objective: 'Dibujar o describir detalladamente un personaje con backstory.',
            rewardPoints: 15,
            estimatedTimeMinutes: 35,
          },
          {
            id: 3,
            title: 'Compositor Visual',
            skill: 'creativity',
            story: 'Imagina una nueva escena para Coralville: un atardecer mágico, una tormenta misteriosa, o un festival de colores. Crea un concepto visual que capture la atmósfera perfecta.',
            objective: 'Diseñar una escena completa con paleta de colores y mood.',
            rewardPoints: 18,
            estimatedTimeMinutes: 40,
          },
        ],
      }),
      status: 'active',
      activationDate: new Date('2025-10-10'),
      dueDate: new Date('2025-11-05'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'Corrige al Narrador',
      summary: 'El narrador cometió errores. ¡Ayúdalo a mejorar su historia!',
      description: 'Corrige y mejora un texto narrativo manteniendo su estilo original.',
      previewImage: '/images/missions/narrator-fix.jpg',
      narrative: JSON.stringify({
        roles: [
          {
            id: 1,
            title: 'Editor Narrativo',
            skill: 'writing',
            story: 'El narrador ha cometido varios errores de tono y coherencia en su relato. Tu misión es reescribir los fragmentos inconsistentes manteniendo el estilo original, pero mejorando la claridad y emoción. Respeta la voz original del texto y mejora la fluidez sin errores ortográficos.',
            objective: 'Corregir o reescribir un texto de 150 a 200 palabras.',
            rewardPoints: 12,
            estimatedTimeMinutes: 25,
          },
          {
            id: 2,
            title: 'Corrector de Estilo',
            skill: 'writing',
            story: 'La historia tiene el potencial de ser increíble, pero necesita pulirse. Identifica problemas de ritmo, repeticiones innecesarias y diálogos débiles. Reescríbelos con impacto.',
            objective: 'Mejorar la calidad literaria de un texto preservando su esencia.',
            rewardPoints: 12,
            estimatedTimeMinutes: 30,
          },
          {
            id: 3,
            title: 'Maestro de la Gramática',
            skill: 'writing',
            story: 'El texto está lleno de errores gramaticales y de puntuación que dificultan su lectura. Tu trabajo es corregirlos todos mientras mantienes intacto el mensaje del autor.',
            objective: 'Corregir todos los errores sin cambiar el contenido original.',
            rewardPoints: 10,
            estimatedTimeMinutes: 20,
          },
        ],
      }),
      status: 'active',
      activationDate: new Date('2025-10-12'),
      dueDate: new Date('2025-10-28'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'La Secuencia Oculta',
      summary: 'Una base de datos encriptada guarda la clave. ¡Descífrala!',
      description: 'Descifra el patrón entre números y símbolos para revelar el código secreto.',
      previewImage: '/images/missions/hidden-sequence.jpg',
      narrative: JSON.stringify({
        roles: [
          {
            id: 1,
            title: 'Estratega',
            skill: 'logic',
            story: 'Una base de datos encriptada contiene la clave de acceso a la próxima etapa del proyecto. Deberás descifrar el patrón entre números y símbolos para revelar el código secreto. Completa el desafío sin pistas o con mínimo de errores.',
            objective: 'Resolver una secuencia numérica o lógica (tipo Sudoku o patrones de progresión).',
            rewardPoints: 10,
            estimatedTimeMinutes: 18,
          },
          {
            id: 2,
            title: 'Criptoanalista',
            skill: 'logic',
            story: 'El mensaje está codificado con un cifrado antiguo. Analiza las frecuencias, busca patrones repetidos y deduce la clave que desbloquea el mensaje completo.',
            objective: 'Descifrar un mensaje usando lógica deductiva.',
            rewardPoints: 12,
            estimatedTimeMinutes: 22,
          },
          {
            id: 3,
            title: 'Hacker Ético',
            skill: 'logic',
            story: 'El sistema de seguridad tiene una vulnerabilidad lógica. Encuentra la falla en la secuencia de validación y genera el código de acceso correcto sin romper ninguna regla.',
            objective: 'Explotar una vulnerabilidad lógica de forma ética.',
            rewardPoints: 15,
            estimatedTimeMinutes: 25,
          },
        ],
      }),
      status: 'active',
      activationDate: new Date('2025-10-14'),
      dueDate: new Date('2025-11-01'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'Cartas desde la Imaginación',
      summary: 'Escribe una carta desde la perspectiva de un personaje ficticio.',
      description: 'Redacta un texto que conecte emocionalmente con el lector.',
      previewImage: '/images/missions/letters-imagination.jpg',
      narrative: JSON.stringify({
        roles: [
          {
            id: 1,
            title: 'Cronista Creativo',
            skill: 'writing',
            story: 'Debes redactar una carta o diario ficticio desde la perspectiva de un personaje del universo del proyecto, reflejando emociones, dilemas o descubrimientos. Escribe un texto breve (de 100 a 250 palabras) que conecte emocionalmente con el lector.',
            objective: 'Crear un texto narrativo en primera persona con profundidad emocional.',
            rewardPoints: 16,
            estimatedTimeMinutes: 28,
          },
          {
            id: 2,
            title: 'Escritor de Diarios',
            skill: 'writing',
            story: 'Un explorador perdido en un mundo desconocido escribe en su diario cada noche. Redacta su entrada más emotiva, donde reflexiona sobre lo que dejó atrás y lo que espera encontrar.',
            objective: 'Escribir una entrada de diario con conflicto interno y esperanza.',
            rewardPoints: 14,
            estimatedTimeMinutes: 25,
          },
          {
            id: 3,
            title: 'Poeta Narrativo',
            skill: 'creativity',
            story: 'Combina poesía y prosa para contar la historia de un momento crucial en la vida del personaje. Tu texto debe ser breve pero impactante, mezclando metáforas con realidad.',
            objective: 'Crear un texto híbrido (poesía + narrativa) con imagen vívida.',
            rewardPoints: 18,
            estimatedTimeMinutes: 32,
          },
        ],
      }),
      status: 'active',
      activationDate: new Date('2025-10-13'),
      dueDate: new Date('2025-11-03'),
      dueTime: '23:59',
      teacherId: 1,
    },
    {
      title: 'El Laberinto de Decisiones',
      summary: 'Cada elección cuenta. ¿Encontrarás la salida?',
      description: 'Navega por un laberinto de decisiones lógicas para encontrar la salida.',
      previewImage: '/images/missions/decision-maze.jpg',
      narrative: JSON.stringify({
        roles: [
          {
            id: 1,
            title: 'Navegante Estratégico',
            skill: 'logic',
            story: 'Estás atrapado en un laberinto donde cada intersección presenta una decisión lógica. Si eliges bien, avanzas. Si te equivocas, retrocedes. Usa la lógica para encontrar el camino más corto hacia la salida.',
            objective: 'Resolver un árbol de decisiones con la menor cantidad de errores.',
            rewardPoints: 14,
            estimatedTimeMinutes: 22,
          },
          {
            id: 2,
            title: 'Cartógrafo Mental',
            skill: 'logic',
            story: 'No puedes ver el laberinto completo, solo la sección donde estás. Dibuja un mapa mental mientras avanzas y usa tu memoria para no repetir caminos equivocados.',
            objective: 'Crear un diagrama del laberinto mientras lo resuelves.',
            rewardPoints: 16,
            estimatedTimeMinutes: 28,
          },
          {
            id: 3,
            title: 'Maestro de Probabilidades',
            skill: 'logic',
            story: 'Cada camino tiene una probabilidad de éxito. Analiza las pistas sutiles en cada intersección y calcula qué ruta tiene más chances de llevarte a la salida.',
            objective: 'Usar razonamiento probabilístico para elegir el mejor camino.',
            rewardPoints: 18,
            estimatedTimeMinutes: 30,
          },
        ],
      }),
      status: 'inactive',
      activationDate: null,
      dueDate: null,
      dueTime: null,
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
