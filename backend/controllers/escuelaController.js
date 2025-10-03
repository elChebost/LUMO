import {createEscuela, getEscuelas, getEscuelaById, updateEscuela, deleteEscuela} from '../services/escuelaService.js';

// Crear
export const createEscuelaHandler = async (req, res) => {
  try {
    const { nombre, direccion, turno } = req.body;
    const escuela = await escuelaService.createEscuela({ nombre, direccion, turno });
    res.status(201).json(escuela);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todas
export const getEscuelasHandler = async (req, res) => {
  try {
    const escuelas = await escuelaService.getEscuelas();
    res.json(escuelas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener por ID
export const getEscuelaByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const escuela = await escuelaService.getEscuelaById(id);
    if (!escuela) return res.status(404).json({ message: 'Escuela no encontrada' });
    res.json(escuela);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar
export const updateEscuelaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const escuela = await escuelaService.updateEscuela(id, req.body);
    res.json(escuela);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar
export const deleteEscuelaHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await escuelaService.deleteEscuela(id);
    res.json({ message: 'Escuela eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
