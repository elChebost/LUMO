import prisma from '../config/db.js';

// Crear un docente
export const createDocente = async ({ nombre, email, clases, grados, horario, rol, escuelaId }) => {
  try {
  return await prisma.docente.create({
    data: {
      nombre,
      email,
      clases,
      grados,
      horario,
      rol,
      escuelaId
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responderS
  }
};

// Obtener todos los docentes
export const getDocentes = async () => {
  try {
  return await prisma.docente.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener un docente por ID
export const getDocenteById = async (id) => {
  try {
  return await prisma.docente.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar un docente
export const updateDocente = async (id, data) => {
  try {
  return await prisma.docente.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar un docente
export const deleteDocente = async (id) => {
  try {
  return await prisma.docente.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
