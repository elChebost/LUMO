import prisma from '../config/db.js';

// Crear una escuela
export const createSchool = async ({ name, address, shift }) => {
  try {
    return await prisma.school.create({
      data: { name, address, shift },
    });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las escuelas
export const getSchools = async () => {
  try {
    return await prisma.school.findMany();
  } catch (error) {
    throw error;
  }
};

// Obtener una escuela por ID
export const getSchoolById = async (id) => {
  try {
    return await prisma.school.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};

// Actualizar una escuela
export const updateSchool = async (id, data) => {
  try {
    return await prisma.school.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar una escuela
export const deleteSchool = async (id) => {
  try {
    return await prisma.school.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};
