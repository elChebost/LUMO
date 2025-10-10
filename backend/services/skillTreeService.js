import prisma from '../config/db.js';

// Crear una skillTree
export const createSkillTree = async ({ progreso, xp, estudianteId }) => {
  try {
  return await prisma.SkillTree.create({
    data: {
      progreso,
      xp,
      estudianteId
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las skillTrees
export const getSkillTrees = async () => {
  try {
  return await prisma.skillTree.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener una skillTree por ID
export const getSkillTreeById = async (id) => {
  try {
  return await prisma.skillTree.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar una skillTree
export const updateSkillTree = async (id, data) => {
  try {
  return await prisma.skillTree.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar una skillTree
export const deleteSkillTree = async (id) => {
  try {
  return await prisma.skillTree.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
