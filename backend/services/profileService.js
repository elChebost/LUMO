import prisma from '../config/db.js';

// Crear un perfil
export const createProfile = async ({ profilePicture, exp, coins, studentId }) => {
  try {
    return await prisma.profile.create({
      data: {
        profilePicture,
        exp,
        coins,
        studentId
      },
    });
  } catch (error) {
    throw error; // el controller se encarga de responder 
  }
};

// Obtener todos los perfiles
export const getProfiles = async () => {
  try {
    return await prisma.profile.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener un perfil por ID
export const getProfileById = async (id) => {
  try {
    return await prisma.profile.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};

// Actualizar un perfil
export const updateProfile = async (id, data) => {
  try {
    return await prisma.profile.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error; 
  }
};

// Eliminar un perfil
export const deleteProfile = async (id) => {
  try {
    return await prisma.profile.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};
