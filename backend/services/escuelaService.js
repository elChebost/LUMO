import prisma from '../config/db.js';

// Crear una escuela
export const createEscuela = async ({ nombre, direccion, turno }) => {
  return await prisma.escuela.create({
    data: {
      nombre,
      direccion,
      turno,
    },
  });
};

// Obtener todas las escuelas
export const getEscuelas = async () => {
  return await prisma.escuela.findMany();
};

// Obtener una escuela por ID
export const getEscuelaById = async (id) => {
  return await prisma.escuela.findUnique({
    where: { id: Number(id) },
  });
};

// Actualizar una escuela
export const updateEscuela = async (id, data) => {
  return await prisma.escuela.update({
    where: { id: Number(id) },
    data,
  });
};

// Eliminar una escuela
export const deleteEscuela = async (id) => {
  return await prisma.escuela.delete({
    where: { id: Number(id) },
  });
};
