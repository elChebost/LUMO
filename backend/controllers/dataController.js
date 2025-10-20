import prisma from '../config/db.js';
import { recalculateStudentStats, getStudentProgress } from '../services/statsService.js';

// Obtener datos básicos para formularios
export const getBasicData = async (req, res) => {
  try {
    const [schools, teachers, classrooms] = await Promise.all([
      prisma.school.findMany(),
      prisma.teacher.findMany(),
      prisma.classroom.findMany({ include: { teacher: true, school: true } })
    ]);

    res.json({
      schools,
      teachers,
      classrooms
    });
  } catch (error) {
    console.error('Error obteniendo datos básicos:', error);
    res.status(500).json({ 
      message: 'Error al obtener datos básicos', 
      error: error.message 
    });
  }
};

// Obtener un estudiante específico con todos sus datos
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const student = await prisma.student.findUnique({
      where: { id: Number(id) },
      include: {
        profile: true,
        school: true,
        teacher: true,
        classroom: true,
        skillTree: true,
        missionProgress: {
          include: {
            mission: true
          }
        }
      }
    });

    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado' });
    }

    // Recalcular estadísticas antes de devolver
    const stats = await recalculateStudentStats(Number(id));
    const progress = await getStudentProgress(Number(id));

    // Combinar datos
    const studentData = {
      ...student,
      ...stats,
      ...progress
    };

    res.json(studentData);
  } catch (error) {
    console.error('Error obteniendo estudiante:', error);
    res.status(500).json({ 
      message: 'Error al obtener estudiante', 
      error: error.message 
    });
  }
};