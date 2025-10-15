import prisma from '../config/db.js';

// Crear un estudiante
export const createStudent = async ({ name, email, age, grade, level, schedule, schoolId, teacherId, classroomId }) => {
  try {
    return await prisma.student.create({
      data: {
        name,
        email,
        age: Number(age),
        grade,
        level: Number(level),
        schedule,
        school: { connect: { id: Number(schoolId) } },
        teacher: { connect: { id: Number(teacherId) } },
        classroom: { connect: { id: Number(classroomId) } }
      },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener todos los estudiantes
export const getStudents = async () => {
  try {
    return await prisma.student.findMany();
  } catch (error) {
    throw error;
  }
};

// Buscar estudiantes por nombre o email
export const searchStudents = async ({ name, email }) => {
  const filters = [];

  if (name) {
    filters.push({
      name: {
        contains: name
      }
    });
  }

  if (email) {
    filters.push({
      email: {
        contains: email
      }
    });
  }

  const students = await prisma.student.findMany({
    where: {
      OR: filters
    }
  });

  return students;
};

// Obtener estudiantes por nivel específico
export const getStudentsByLevel = async (level) => {
  try {
    return await prisma.student.findMany({
      where: { 
        level: Number(level) 
      },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener estudiantes por rango de niveles
export const getStudentsByLevelRange = async (minLevel, maxLevel) => {
  try {
    return await prisma.student.findMany({
      where: {
        level: {
          gte: Number(minLevel),
          lte: Number(maxLevel)
        }
      },
    });
  } catch (error) {
    throw error;
  }
};

// Obtener estudiante por ID
export const getStudentById = async (id) => {
  try {
    return await prisma.student.findUnique({ where: { id: Number(id) } });
  } catch (error) {
    throw error;
  }
};

// Contar total de estudiantes
export const getTotalStudents = async () => {
  try {
    return await prisma.student.count();
  } catch (error) {
    throw error;
  }
};

// Actualizar estudiante
export const updateStudent = async (id, data) => {
  try {
    return await prisma.student.update({ where: { id: Number(id) }, data });
  } catch (error) {
    throw error;
  }
};

// Eliminar estudiante
export const deleteStudent = async (id) => {
  try {
    return await prisma.student.delete({ where: { id: Number(id) } });
  } catch (error) {
    throw error;
  }
};
