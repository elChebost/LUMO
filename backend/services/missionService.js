import prisma from '../config/db.js';

// Crear una mision
export const createMission = async ({ title, description, status, grade, teacherId }) => {
  try {
    return await prisma.mission.create({
      data: {
        title,
        description,
        status,
        grade,
        teacherId
      },
    });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las misiones
export const getMissions = async () => {
  try {
    return await prisma.mission.findMany();
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
