import prisma from '../config/db.js';

// Crear una asignatura
export const createSubject = async ({ name, description, studentId }) => {
  try {
    return await prisma.subject.create({
      data: {
        name,
        description,
        student: { connect: { id: Number(studentId) } },
      },
    });
  } catch (error) {
    throw error; // el controller se encarga de responder
  }
};

// Obtener todas las asignaturas
export const getSubjects = async () => {
  try {
    return await prisma.subject.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener una asignatura por ID
export const getSubjectById = async (id) => {
  try {
    return await prisma.subject.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};

// Obtener asignaturas por estudiante
export const getSubjectsByStudent = async (studentId) => {
  try {
    return await prisma.subject.findMany({
      where: { studentId: Number(studentId) },
    });
  } catch (error) {
    throw error;
  }
};

// Actualizar una asignatura
export const updateSubject = async (id, data) => {
  try {
    return await prisma.subject.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error; 
  }
};

// Eliminar una Asignatura
export const deleteSubject = async (id) => {
  try {
    return await prisma.subject.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};
