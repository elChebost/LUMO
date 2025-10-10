import prisma from '../config/db.js';

// Crear una mision
export const createMision = async ({ titulo, descripcion, estado, grado, fechaLimite, docenteId }) => {
  try {
  return await prisma.mision.create({
    data: {
      titulo,
      descripcion,
      estado,
      grado,
      fechaLimite,
      docenteId
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las misiones
export const getMisiones = async () => {
  try {
  return await prisma.mision.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener una mision por ID
export const getMisionById = async (id) => {
  try {
  return await prisma.mision.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar una mision
export const updateMision = async (id, data) => {
  try {
  return await prisma.mision.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar una mision
export const deleteMision = async (id) => {
  try {
  return await prisma.mision.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
