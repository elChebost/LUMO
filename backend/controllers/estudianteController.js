import {
  createEstudiante,
  getEstudiantes,
  getEstudianteById,
  updateEstudiante,
  deleteEstudiante
} from '../services/estudianteService.js';

// Crear estudiante
export const createEstudianteHandler = async (req, res) => {
  try {
    const { nombre, email, edad, grado, horario } = req.body;

    // Validaciones básicas
    if (!nombre || !email || !edad || !grado || !horario) {
      return res.status(400).json({ message: 'Faltan datos obligatorios.' });
    }

    const estudiante = await createEstudiante({ nombre, email, edad, grado, horario });
    res.status(201).json(estudiante);
  } catch (error) {
    console.error('Error al crear estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todos los estudiantes
export const getEstudiantesHandler = async (req, res) => {
  try {
    const estudiantes = await getEstudiantes();
    res.json(estudiantes);
  } catch (error) {
    console.error('Error al obtener estudiantes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener estudiante por ID
export const getEstudianteByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const estudiante = await getEstudianteById(id);

    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    res.json(estudiante);
  } catch (error) {
    console.error('Error al obtener estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar estudiante
export const updateEstudianteHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await getEstudianteById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    const estudiante = await updateEstudiante(id, data);
    res.json(estudiante);
  } catch (error) {
    console.error('Error al actualizar estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar estudiante
export const deleteEstudianteHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getEstudianteById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    await deleteEstudiante(id);
    res.json({ message: 'Estudiante eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Buscar estudiantes por nombre o email
export const searchEstudiantesHandler = async (req, res) => {
  try {
    const { nombre, email } = req.query;

    if (!nombre && !email) return res.status(400).json({ message: 'Debe proporcionar nombre o email para filtrar.' });

    const estudiantes = await searchEstudiantes({ nombre, email });

    if (estudiantes.length === 0) return res.status(404).json({ message: 'No se encontraron estudiantes con los criterios proporcionados.' });

    res.json(estudiantes);
  } catch (error) {
    console.error('Error al filtrar estudiantes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener XP promedio de un estudiante
export const getXpPromedioHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const xpPromedio = await getXpPromedio(parseInt(id));
    res.json({ estudianteId: id, xpPromedio });
  } catch (error) {
    console.error('Error al calcular XP promedio:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

import { getTotalEstudiantes } from '../services/estudianteService.js';

// Obtener total de estudiantes
export const getTotalEstudiantesHandler = async (req, res) => {
  try {
    const total = await getTotalEstudiantes();
    res.json({ totalEstudiantes: total });
  } catch (error) {
    console.error('Error al calcular total de estudiantes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
