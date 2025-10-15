import prisma from '../config/db.js';

// Crear una skillTree
export const createSkillTree = async ({ progress, xp, studentId }) => {
  try {
    return await prisma.skillTree.create({
      data: {
        progress,
        xp,
        student: { connect: { id: Number(studentId) } },
      },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener todas las skillTrees
export const getSkillTrees = async () => {
  try {
    return await prisma.skillTree.findMany();
  } catch (error) {
    throw error; 
  }
};

// Calcular XP promedio de todos los estudiantes
export const getAverageXpAllStudents = async () => {
  try {
    const skillTrees = await prisma.skillTree.findMany({
      select: { xp: true },
    });

    if (skillTrees.length === 0) return 0;

    const totalXp = skillTrees.reduce((acc, st) => acc + st.xp, 0);
    return totalXp / skillTrees.length;
  } catch (error) {
    throw error;
  }
};

// Obtener una skillTree por ID
export const getSkillTreeById = async (id) => {
  return await prisma.skillTree.findUnique({
    where: { id: Number(id) },
  });
};

// Actualizar una skillTree
export const updateSkillTree = async (id, data) => {
  try {
    return await prisma.skillTree.update({
      where: { id: Number(id) },
      data,
    });
  } catch (error) {
    throw error; 
  }
};

// Eliminar una skillTree
export const deleteSkillTree = async (id) => {
  try {
    return await prisma.skillTree.delete({
      where: { id: Number(id) },
    });
  } catch (error) {
    throw error; 
  }
};
