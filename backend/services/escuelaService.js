import prisma from '../config/db.js';

// Crear una escuela
export const createEscuela = async ({ nombre, direccion, turno }) => {
  try {
    return await prisma.escuela.create({
      data: { nombre, direccion, turno },
    });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las escuelas
export const getEscuelas = async () => {
  try {
    return await prisma.escuela.findMany();
  } catch (error) {
    throw error;
  }
};

// Obtener una escuela por ID
export const getEscuelaById = async (id) => {
  try {
    return await prisma.escuela.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};

// Actualizar una escuela
export const updateEscuela = async (id, data) => {
  try {
    return await prisma.escuela.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar una escuela
export const deleteEscuela = async (id) => {
  try {
    return await prisma.escuela.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};
