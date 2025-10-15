import prisma from '../config/db.js';

// Crear perfil de docente
export const createTeacherProfile = async ({ avatar, bio, teacherId }) => {
  try {
    return await prisma.teacherProfile.create({
      data: {
        avatar,
        bio,
        teacher: { connect: { id: Number(teacherId) } },
      },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener todos los perfiles de docentes
export const getTeacherProfiles = async () => {
  try {
    return await prisma.teacherProfile.findMany();
  } catch (error) {
    throw error;
  }
};

// Obtener perfil de docente por ID
export const getTeacherProfileById = async (id) => {
  try {
    return await prisma.teacherProfile.findUnique({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};

// Actualizar perfil de docente
export const updateTeacherProfile = async (id, data) => {
  try {
    return await prisma.teacherProfile.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error;
  }
};

// Eliminar perfil de docente
export const deleteTeacherProfile = async (id) => {
  try {
    return await prisma.teacherProfile.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error;
  }
};
