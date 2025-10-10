import {
  createAula,
  getAulas,
  getAulaById,
  updateAula,
  deleteAula
} from '../services/aulaService.js';

// Crear aula
export const createAulaHandler = async (req, res) => {
  try {
    const { nombre, grado } = req.body;

    // Validaciones básicas
    if (!nombre || !grado) {
      return res.status(400).json({ message: 'Faltan datos obligatorios: nombre o grado.' });
    }

    const aula = await createAula({ nombre, grado });
    res.status(201).json(aula);
  } catch (error) {
    console.error('Error al crear aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todas las aulas
export const getAulasHandler = async (req, res) => {
  try {
    const aulas = await getAulas();
    res.json(aulas);
  } catch (error) {
    console.error('Error al obtener aulas:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener aula por ID
export const getAulaByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const aula = await getAulaById(id);

    if (!aula) {
      return res.status(404).json({ message: 'Aula no encontrada.' });
    }

    res.json(aula);
  } catch (error) {
    console.error('Error al obtener aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar aula
export const updateAulaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await getAulaById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Aula no encontrada.' });
    }

    const aula = await updateAula(id, data);
    res.json(aula);
  } catch (error) {
    console.error('Error al actualizar aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar aula
export const deleteAulaHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getAulaById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Aula no encontrada.' });
    }

    await deleteAula(id);
    res.json({ message: 'Aula eliminada correctamente.' });
  } catch (error) {
    console.error('Error al eliminar aula:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
