import {
  createMision,
  getMisions,
  getMisionById,
  updateMision,
  deleteMision,
} from '../services/misionService.js';

// Crear
export const createMisionHandler = async (req, res) => {
  try {
    const { titulo, descripcion, estado, grado, docenteId } = req.body;

    if (!titulo || !descripcion || !estado || !grado || !docenteId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const mision = await createMision({ titulo, descripcion, estado, grado, docenteId });
    res.status(201).json(mision);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todas
export const getMisionesHandler = async (req, res) => {
  try {
    const misiones = await getMisions();
    res.json(misiones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
export const getMisionByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const mision = await getMisionById(id);

    if (!mision) {
      return res.status(404).json({ message: 'Misión no encontrada' });
    }

    res.json(mision);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
export const updateMisionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const mision = await updateMision(id, req.body);

    if (!mision) {
      return res.status(404).json({ message: 'Misión no encontrada' });
    }

    res.json(mision);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
export const deleteMisionHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteMision(id);
    res.json({ message: 'Misión eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
