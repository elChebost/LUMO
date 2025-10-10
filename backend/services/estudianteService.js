import prisma from '../config/db.js';

// Crear un estudiante
export const createEstudiante = async ({ nombre, email, edad, grado, nivel, horario, estudianteId }) => {
  try {
    return await prisma.estudiante.create({
      data: { nombre, email, edad, grado, nivel, horario, estudianteId },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener todos los estudiantes
export const getEstudiantes = async () => {
  try {
    return await prisma.estudiante.findMany();
  } catch (error) {
    throw error;
  }
};

// Obtener estudiante por ID
export const getEstudianteById = async (id) => {
  try {
    return await prisma.estudiante.findUnique({ where: { id: Number(id) } });
  } catch (error) {
    throw error;
  }
};

// Actualizar estudiante
export const updateEstudiante = async (id, data) => {
  try {
    return await prisma.estudiante.update({ where: { id: Number(id) }, data });
  } catch (error) {
    throw error;
  }
};

// Eliminar estudiante
export const deleteEstudiante = async (id) => {
  try {
    return await prisma.estudiante.delete({ where: { id: Number(id) } });
  } catch (error) {
    throw error;
  }
};

// Buscar estudiantes por nombre o email
export const searchEstudiantes = async ({ nombre, email }) => {
  try {
    return await prisma.estudiante.findMany({
      where: {
        OR: [
          nombre ? { nombre: { contains: nombre, mode: 'insensitive' } } : undefined,
          email ? { email: { contains: email, mode: 'insensitive' } } : undefined,
        ].filter(Boolean),
      },
    });
  } catch (error) {
    throw error;
  }
};

// Calcular XP promedio de un estudiante
export const getXpPromedio = async (estudianteId) => {
  try {
    const perfiles = await prisma.perfil.findMany({
      where: { estudianteId: Number(estudianteId) },
      select: { xp: true }
    });

    if (perfiles.length === 0) return 0;

    const totalXp = perfiles.reduce((acc, perfil) => acc + perfil.xp, 0);
    return totalXp / perfiles.length;
  } catch (error) {
    throw error;
  }
};

// Contar total de estudiantes
export const getTotalEstudiantes = async () => {
  try {
    return await prisma.estudiante.count();
  } catch (error) {
    throw error;
  }
};
