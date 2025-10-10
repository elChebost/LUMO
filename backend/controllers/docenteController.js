import {
  createDocente,
  getDocentes,
  getDocenteById,
  updateDocente,
  deleteDocente
} from '../services/docenteService.js';

// Crear docente
export const createDocenteHandler = async (req, res) => {
  try {
    const { nombre, email, clases, grados, horario, rol } = req.body;

    // Validaciones básicas
    if (!nombre || !email || !rol) {
      return res.status(400).json({ message: 'Faltan datos obligatorios: nombre, email o rol.' });
    }

    const docente = await createDocente({ nombre, email, clases, grados, horario, rol });
    res.status(201).json(docente);
  } catch (error) {
    console.error('Error al crear docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Listar todos los docentes
export const getDocentesHandler = async (req, res) => {
  try {
    const docentes = await getDocentes();
    res.json(docentes);
  } catch (error) {
    console.error('Error al obtener docentes:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener docente por ID
export const getDocenteByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const docente = await getDocenteById(id);

    if (!docente) {
      return res.status(404).json({ message: 'Docente no encontrado.' });
    }

    res.json(docente);
  } catch (error) {
    console.error('Error al obtener docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Actualizar docente
export const updateDocenteHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const existing = await getDocenteById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Docente no encontrado.' });
    }

    const docente = await updateDocente(id, data);
    res.json(docente);
  } catch (error) {
    console.error('Error al actualizar docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Eliminar docente
export const deleteDocenteHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await getDocenteById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Docente no encontrado.' });
    }

    await deleteDocente(id);
    res.json({ message: 'Docente eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar docente:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};
