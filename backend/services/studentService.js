import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

// Crear un estudiante
export const createStudent = async ({ name, email, password, age, level, xp, schedule, schoolId, teacherId, classroomId }) => {
  try {
    const hashedPassword = await bcrypt.hash(password || '123456', 10);
    
    const student = await prisma.student.create({
      data: {
        name,
        email,
        password: hashedPassword,
        age: Number(age),
        level: Number(level) || 1,
        xp: Number(xp) || 0,
        schedule,
        school: { connect: { id: Number(schoolId) } },
        teacher: { connect: { id: Number(teacherId) } },
        classroom: { connect: { id: Number(classroomId) } }
      },
    });

    // Crear perfil del estudiante automáticamente
    await prisma.studentProfile.create({
      data: {
        avatar: '/src/assets/avatar.png',
        exp: Number(xp) || 0,
        coins: Math.floor((Number(xp) || 0) / 10),
        studentId: student.id
      }
    });

    return student;
  } catch (error) {
    throw error;
  }
};

// Obtener todos los estudiantes
export const getStudents = async () => {
  try {
    return await prisma.student.findMany({
      include: {
        profile: true,
        school: true,
        teacher: true,
        classroom: true
      }
    });
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
