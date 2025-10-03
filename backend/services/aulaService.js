import prisma from '../config/db.js';

// Crear un aula
export const createAula = async ({ nombre, grado, escuelaId }) => {
  return await prisma.escuela.create({
    data: {
      nombre,
      grado,
      escuelaId,
    },
  });
};

// Obtener todas las aulas
export const getAulas = async () => {
  return await prisma.aula.findMany();
};

