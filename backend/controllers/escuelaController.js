import {
  createEscuela,
  getEscuelas,
  getEscuelaById,
  updateEscuela,
  deleteEscuela,
} from '../services/escuelaService.js';

// Crear
export const createEscuelaHandler = async (req, res) => {
  try {
    const { nombre, direccion, turno } = req.body;

    if (!nombre || !direccion || !turno) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    const escuela = await createEscuela({ nombre, direccion, turno });
    res.status(201).json(escuela);
  } catch (error) {
    // Ejemplo de conflicto: escuela duplicada
    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'La escuela ya existe.' });
    }

    console.error('Error al crear escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todas
export const getEscuelasHandler = async (req, res) => {
  try {
    const escuelas = await getEscuelas();
    if (escuelas.length === 0) {
      return res.status(404).json({ message: 'No hay escuelas registradas.' });
    }
    res.json(escuelas);
  } catch (error) {
    console.error('Error al obtener escuelas:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener por ID
export const getEscuelaByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const escuela = await getEscuelaById(id);

    if (!escuela) {
      return res.status(404).json({ message: 'Escuela no encontrada.' });
    }

    res.json(escuela);
  } catch (error) {
    console.error('Error al obtener escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar
export const updateEscuelaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, direccion, turno } = req.body;

    if (!nombre && !direccion && !turno) {
      return res.status(400).json({ message: 'Debe enviar al menos un campo para actualizar.' });
    }

    const escuela = await updateEscuela(id, req.body);
    res.json(escuela);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Escuela no encontrada para actualizar.' });
    }

    console.error('Error al actualizar escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar
export const deleteEscuelaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEscuela(id);
    res.json({ message: 'Escuela eliminada correctamente.' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Escuela no encontrada para eliminar.' });
    }

    console.error('Error al eliminar escuela:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
