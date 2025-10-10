import {
  createAsignatura,
  getAsignaturas,
  getAsignaturaById,
  updateAsignatura,
  deleteAsignatura,
} from '../services/asignaturaService.js';

// Crear
export const createAsignaturaHandler = async (req, res) => {
  try {
    const { nombre, descripcion, estudianteId } = req.body;

    if (!nombre || !descripcion || !estudianteId) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const asignatura = await createAsignatura({ nombre, descripcion, estudianteId });
    res.status(201).json(asignatura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todas
export const getAsignaturasHandler = async (req, res) => {
  try {
    const asignaturas = await getAsignaturas();
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
export const getAsignaturaByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const asignatura = await getAsignaturaById(id);

    if (!asignatura) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    res.json(asignatura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
export const updateAsignaturaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const asignatura = await updateAsignatura(id, req.body);

    if (!asignatura) {
      return res.status(404).json({ message: 'Asignatura no encontrada' });
    }

    res.json(asignatura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
export const deleteAsignaturaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAsignatura(id);
    res.json({ message: 'Asignatura eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
