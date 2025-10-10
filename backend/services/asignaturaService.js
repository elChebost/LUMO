import prisma from '../config/db.js';

// Crear una asignatura
export const createAsignatura = async ({ nombre, descripcion, estudianteId }) => {
  try {
  return await prisma.asignatura.create({
    data: {
      nombre,
      descripcion,
      estudianteId
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las asignaturas
export const getAsignaturas = async () => {
  try {
  return await prisma.asignatura.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener una asignatura por ID
export const getAsignaturaById = async (id) => {
  try {
  return await prisma.asignatura.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar una asignatura
export const updateAsignatura = async (id, data) => {
  try {
  return await prisma.asignatura.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar una Asignatura
export const deleteAsignatura = async (id) => {
  try {
  return await prisma.asignatura.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
