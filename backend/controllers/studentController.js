import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents,
  getXpAverage,
  getTotalStudents
} from '../services/studentService.js';

// Crear estudiante
export const createStudentHandler = async (req, res) => {
  try {
    const { name, email, age, grade, schedule } = req.body;

    // Validaciones básicas
    if (!name || !email || !age || !grade || !schedule) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const student = await createStudent({ name, email, age, grade, schedule });
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

// Actualizar estudiante
export const updateStudentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

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

// Buscar estudiantes por nombre o email
export const searchStudentsHandler = async (req, res) => {
  try {
    const { name, email } = req.query;

    if (!name && !email)
      return res.status(400).json({ message: 'Debe proporcionar nombre o email para filtrar.' });

    const students = await searchStudents({ name, email });

    if (students.length === 0)
      return res.status(404).json({ message: 'No se encontraron estudiantes con los criterios proporcionados.' });

    res.json(students);
  } catch (error) {
    console.error('Error al filtrar estudiantes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener XP promedio de un estudiante
export const getXpAverageHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const xpAverage = await getXpAverage(parseInt(id));
    res.json({ studentId: id, xpAverage });
  } catch (error) {
    console.error('Error al calcular XP promedio:', error);
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
