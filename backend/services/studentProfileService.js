import prisma from '../config/db.js';

// Crear perfil de estudiante
export const createStudentProfile = async ({ avatar, exp, coins, studentId }) => {
  try {
    return await prisma.studentProfile.create({
      data: {
        avatar,
        exp: Number(exp),
        coins: Number(coins),
        student: { connect: { id: Number(studentId) } },
      },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener todos los perfiles de estudiantes
export const getStudentProfiles = async () => {
  try {
    return await prisma.studentProfile.findMany();
  } catch (error) {
    throw error;
  }
};

// Obtener perfil de estudiante por ID
export const getStudentProfileById = async (id) => {
  try {
    return await prisma.studentProfile.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};

// Actualizar perfil de estudiante
export const updateStudentProfile = async (id, data) => {
  try {
    return await prisma.studentProfile.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar perfil de estudiante
export const deleteStudentProfile = async (id) => {
  try {
    return await prisma.studentProfile.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};
