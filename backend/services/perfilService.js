import prisma from '../config/db.js';

// Crear un perfil
export const createPerfil = async ({ fotoPerfil, exp, monedas, estudianteId }) => {
  try {
  return await prisma.perfil.create({
    data: {
      fotoPerfil,
      exp,
      monedas,
      estudianteId
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responder 
  }
};

// Obtener todos los perfiles
export const getPerfiles = async () => {
  try {
  return await prisma.perfil.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener un perfil por ID
export const getPerfilById = async (id) => {
  try {
  return await prisma.perfil.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar un perfil
export const updatePerfil = async (id, data) => {
  try {
  return await prisma.perfil.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar un perfil
export const deletePerfil = async (id) => {
  try {
  return await prisma.perfil.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
