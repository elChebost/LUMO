import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
  getTotalStudents,
  getStudentsByLevel,
  getStudentsByLevelRange
} from '../services/studentService.js';

// Validar que el nivel esté entre 1 y 5
const validateLevel = (level) => {
  const levelNum = Number(level);
  return levelNum >= 1 && levelNum <= 5;
};

// Crear estudiante
export const createStudentHandler = async (req, res) => {
  try {
    const { name, email, age, grade, level, schedule, schoolId, teacherId, classroomId } = req.body;

    if (!name || !email || !age || !grade || !schedule || !schoolId || !teacherId || !classroomId) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    // Validar nivel si se proporciona
    if (level !== undefined && !validateLevel(level)) {
      return res.status(400).json({ message: 'El nivel debe ser un número entre 1 y 5.' });
    }

    const student = await createStudent({ name, email, age, grade, level, schedule, schoolId, teacherId, classroomId });
    res.status(201).json(student);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todos los estudiantes
export const getStudentsHandler = async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Buscar estudiantes por nombre o email
export const searchStudentsHandler = async (req, res) => {
  try {
    const { name, email } = req.query;

    if (!name && !email) {
      return res.status(400).json({ message: 'Debe proporcionar nombre o email para filtrar.' });
    }

    const students = await searchStudents({ name, email });

    if (students.length === 0) {
      return res.status(404).json({ message: 'No se encontraron estudiantes con los criterios proporcionados.' });
    }

    res.json(students);
  } catch (error) {
    console.error('Error al filtrar estudiantes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener estudiantes por nivel específico
export const getStudentsByLevelHandler = async (req, res) => {
  try {
    const { level } = req.params;
    const levelNum = Number(level);

    if (!validateLevel(levelNum)) {
      return res.status(400).json({ message: 'El nivel debe ser un número entre 1 y 5.' });
    }

    const students = await getStudentsByLevel(levelNum);

    if (students.length === 0) {
      return res.status(404).json({ message: `No se encontraron estudiantes en el nivel ${level}.` });
    }

    res.json(students);
  } catch (error) {
    console.error('Error al obtener estudiantes por nivel:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener estudiantes por rango de niveles
export const getStudentsByLevelRangeHandler = async (req, res) => {
  try {
    const { min, max } = req.query;
    const minLevel = Number(min);
    const maxLevel = Number(max);

    if (minLevel === undefined || maxLevel === undefined) {
      return res.status(400).json({ message: 'Los parámetros "min" y "max" son requeridos.' });
    }

    if (!validateLevel(minLevel) || !validateLevel(maxLevel)) {
      return res.status(400).json({ message: 'Los niveles deben estar entre 1 y 5.' });
    }

    if (minLevel > maxLevel) {
      return res.status(400).json({ message: 'El nivel mínimo no puede ser mayor al nivel máximo.' });
    }

    const students = await getStudentsByLevelRange(minLevel, maxLevel);

    if (students.length === 0) {
      return res.status(404).json({ 
        message: `No se encontraron estudiantes entre los niveles ${minLevel} y ${maxLevel}.` 
      });
    }

    res.json(students);
  } catch (error) {
    console.error('Error al obtener estudiantes por rango de nivel:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener estudiante por ID
export const getStudentByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await getStudentById(id);

    if (!student) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener total de estudiantes
export const getTotalStudentsHandler = async (req, res) => {
  try {
    const total = await getTotalStudents();
    res.json({ totalStudents: total });
  } catch (error) {
    console.error('Error al calcular total de estudiantes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar estudiante
export const updateStudentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // Validar nivel si se está actualizando
    if (data.level !== undefined && !validateLevel(data.level)) {
      return res.status(400).json({ message: 'El nivel debe ser un número entre 1 y 5.' });
    }

    const existing = await getStudentById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    const student = await updateStudent(id, data);
    res.json(student);
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar estudiante
export const deleteStudentHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getStudentById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    await deleteStudent(id);
    res.json({ message: 'Estudiante eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
