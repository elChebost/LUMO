import prisma from '../config/db.js';

// Crear una mision
export const createMission = async ({ title, description, status, activationDate, dueDate, dueTime, teacherId }) => {
  try {
    // Verificar que el profesor existe
    const teacher = await prisma.teacher.findUnique({
      where: { id: Number(teacherId) }
    });
    
    if (!teacher) {
      throw new Error('Profesor no encontrado. Debe crear un profesor primero.');
    }

    return await prisma.mission.create({
      data: {
        title,
        description,
        status: status || 'Borrador',
        activationDate: activationDate ? new Date(activationDate) : null,
        dueDate: dueDate ? new Date(dueDate) : null,
        dueTime: dueTime || null,
        teacher: { connect: { id: Number(teacherId) } },
      },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener todas las misiones
export const getMissions = async () => {
  try {
    return await prisma.mission.findMany({
      include: {
        teacher: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    throw error; 
  }
};

// Obtener misiones por título (búsqueda)
export const getMissionsByTitle = async (title) => {
  try {
    const allMissions = await prisma.mission.findMany();
    
    return allMissions.filter(mission => 
      mission.title.toLowerCase().includes(title.toLowerCase())
    );
  } catch (error) {
    throw error;
  }
};

// Obtener misiones activas
export const getActiveMissions = async () => {
  try {
    return await prisma.mission.findMany({
      where: { status: 'active' },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener misiones inactivas
export const getInactiveMissions = async () => {
  try {
    return await prisma.mission.findMany({
      where: { status: 'inactive' },
    });
  } catch (error) {
    throw error;
  }
};

// Contar total de misiones activas
export const getTotalActiveMissions = async () => {
  try {
    return await prisma.mission.count({
      where: { status: 'active' },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener una mision por ID
export const getMissionById = async (id) => {
  try {
    return await prisma.mission.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};

// Actualizar una mision
export const updateMission = async (id, data) => {
  try {
    return await prisma.mission.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error; 
  }
};

// Eliminar una mision
export const deleteMission = async (id) => {
  try {
    return await prisma.mission.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};
