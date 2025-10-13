import {
  createClassroom,
  getClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom
} from '../services/classroomService.js';

// Crear aula
export const createClassroomHandler = async (req, res) => {
  try {
    const { name, grade } = req.body;

    // Validaciones básicas
    if (!name || !grade) {
      return res.status(400).json({ message: 'Faltan datos obligatorios: nombre o grado.' });
    }

    const classroom = await createClassroom({ name, grade });
    res.status(201).json(classroom);
  } catch (error) {
    console.error('Error al crear aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todas las aulas
export const getClassroomsHandler = async (req, res) => {
  try {
    const classrooms = await getClassrooms();
    res.json(classrooms);
  } catch (error) {
    console.error('Error al obtener aulas:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener aula por ID
export const getClassroomByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const classroom = await getClassroomById(id);

    if (!classroom) {
      return res.status(404).json({ message: 'Aula no encontrada.' });
    }

    res.json(classroom);
  } catch (error) {
    console.error('Error al obtener aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar aula
export const updateClassroomHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await getClassroomById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Aula no encontrada.' });
    }

    const classroom = await updateClassroom(id, data);
    res.json(classroom);
  } catch (error) {
    console.error('Error al actualizar aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar aula
export const deleteClassroomHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getClassroomById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Aula no encontrada.' });
    }

    await deleteClassroom(id);
    res.json({ message: 'Aula eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
