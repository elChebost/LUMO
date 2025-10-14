import prisma from '../config/db.js';

// Crear un aula
export const createClassroom = async ({ name, grade, schoolId }) => {
  try {
  return await prisma.classroom.create({
    data: {
      name,
      grade,
      schoolId,
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las aulas
export const getClassrooms = async () => {
  try {
  return await prisma.classroom.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener una aula por ID
export const getClassroomById = async (id) => {
  try {
  return await prisma.classroom.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar un aula
export const updateClassroom = async (id, data) => {
  try {
  return await prisma.classroom.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar un aula
export const deleteClassroom = async (id) => {
  try {
  return await prisma.classroom.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
