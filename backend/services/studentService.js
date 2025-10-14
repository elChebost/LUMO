import prisma from '../config/db.js';

// Crear un estudiante
export const createStudent = async ({ name, email, age, grade, level, schedule, schoolId, teacherId, classroomId }) => {
  try {
    return await prisma.student.create({
      data: { 
        name, 
        email, 
        age: parseInt(age), 
        grade, 
        level: parseInt(level), 
        schedule, 
        schoolId: parseInt(schoolId), 
        teacherId: parseInt(teacherId), 
        classroomId: parseInt(classroomId) 
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

// Obtener estudiante por ID
export const getStudentById = async (id) => {
  try {
    return await prisma.student.findUnique({ where: { id: Number(id) } });
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

// Buscar estudiantes por nombre o email
export const searchStudents = async ({ name, email }) => {
  try {
    return await prisma.student.findMany({
      where: {
        OR: [
          name ? { name: { contains: name, mode: 'insensitive' } } : undefined,
          email ? { email: { contains: email, mode: 'insensitive' } } : undefined,
        ].filter(Boolean),
      },
    });
  } catch (error) {
    throw error;
  }
};

// Calcular XP promedio de un estudiante
export const getXpAverage = async (studentId) => {
  try {
    const profiles = await prisma.profile.findMany({
      where: { studentId: Number(studentId) },
      select: { xp: true }
    });

    if (profiles.length === 0) return 0;

    const totalXp = profiles.reduce((acc, profile) => acc + profile.xp, 0);
    return totalXp / profiles.length;
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
