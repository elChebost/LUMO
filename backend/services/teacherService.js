import prisma from '../config/db.js';

// Crear un docente
export const createTeacher = async ({ name, email, subjects, grades, schedule, role, schoolId }) => {
  try {
    return await prisma.teacher.create({
      data: {
        name,
        email,
        subjects,
        grades,
        schedule,
        role,
        school: { connect: { id: Number(schoolId) } }
      }
    });
  } catch (error) {
    throw error;
  }
};

// Obtener todos los docentes
export const getTeachers = async () => {
  try {
    return await prisma.teacher.findMany();
  } catch (error) {
    throw error; 
  }
};

// Obtener un docente por ID
export const getTeacherById = async (id) => {
  try {
    return await prisma.teacher.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};

// Actualizar un docente
export const updateTeacher = async (id, data) => {
  try {
    return await prisma.teacher.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error; 
  }
};

// Eliminar un docente
export const deleteTeacher = async (id) => {
  try {
    return await prisma.teacher.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};
