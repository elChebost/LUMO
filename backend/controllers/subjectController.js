import {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
} from '../services/subjectService.js';

// Crear
export const createSubjectHandler = async (req, res) => {
  try {
    const { name, description, studentId } = req.body;

    if (!name || !description || !studentId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const subject = await createSubject({ name, description, studentId });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todas
export const getSubjectsHandler = async (req, res) => {
  try {
    const subjects = await getSubjects();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
export const getSubjectByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await getSubjectById(id);

    if (!subject) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
export const updateSubjectHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await updateSubject(id, req.body);

    if (!subject) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
export const deleteSubjectHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSubject(id);
    res.json({ message: 'Asignatura eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
