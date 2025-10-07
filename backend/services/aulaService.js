import prisma from '../config/db.js';

// Crear un aula
export const createAula = async ({ nombre, grado, escuelaId }) => {
  try {
  return await prisma.aula.create({
    data: {
      nombre,
      grado,
      escuelaId,
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las aulas
export const getAulas = async () => {
  try {
  return await prisma.aula.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener una aula por ID
export const getAulaById = async (id) => {
  try {
  return await prisma.aula.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar un aula
export const updateAula = async (id, data) => {
  try {
  return await prisma.aula.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar un aula
export const deleteAula = async (id) => {
  try {
  return await prisma.aula.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
