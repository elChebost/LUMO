import prisma from '../config/db.js';

// Crear un estudiante
export const createEstudiante = async ({ nombre, email, edad, grado, horario, estudianteId }) => {
  try {
  return await prisma.Estudiante.create({
    data: {
      nombre,
      email,
      edad,
      grado,
      horario,
      estudianteId
    },
  });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todos las estudiantes
export const getEstudiantes = async () => {
  try {
  return await prisma.estudiante.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener un estudiante por ID
export const getEstudianteById = async (id) => {
  try {
  return await prisma.estudiante.findUnique({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};

// Actualizar un estudiante
export const updateEstudiante = async (id, data) => {
  try {
  return await prisma.estudiante.update({
    where: { id: Number(id) },
    data,
  });
  } catch (error) {
    throw error; 
  }
};

// Eliminar una estudiante
export const deleteEstudiante = async (id) => {
  try {
  return await prisma.estudiante.delete({
    where: { id: Number(id) },
  });
  } catch (error) {
    throw error; 
  }
};
