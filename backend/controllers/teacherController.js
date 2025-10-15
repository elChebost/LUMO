import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
} from '../services/teacherService.js';

// Crear docente
export const createTeacherHandler = async (req, res) => {
  try {
    const { name, email, subjects, grades, schedule, role, schoolId } = req.body;

    if (!name || !email || !role || !schoolId) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const teacher = await createTeacher({ name, email, subjects, grades, schedule, role, schoolId });
    res.status(201).json(teacher);
  } catch (error) {
    console.error('Error al crear docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todos los docentes
export const getTeachersHandler = async (req, res) => {
  try {
    const teachers = await getTeachers();
    res.json(teachers);
  } catch (error) {
    console.error('Error al obtener docentes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener docente por ID
export const getTeacherByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const teacher = await getTeacherById(id);

    if (!teacher) {
      return res.status(404).json({ message: 'Docente no encontrado.' });
    }

    res.json(teacher);
  } catch (error) {
    console.error('Error al obtener docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar docente
export const updateTeacherHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await getTeacherById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Docente no encontrado.' });
    }

    const teacher = await updateTeacher(id, data);
    res.json(teacher);
  } catch (error) {
    console.error('Error al actualizar docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar docente
export const deleteTeacherHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getTeacherById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Docente no encontrado.' });
    }

    await deleteTeacher(id);
    res.json({ message: 'Docente eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
