import express from 'express';
import {
  createDocenteHandler,
  getDocentesHandler,
  getDocenteByIdHandler,
  updateDocenteHandler,
  deleteDocenteHandler,
} from '../controllers/docenteController.js';

const router = express.Router();

router.post('/', createDocenteHandler);      // POST /docentes
router.get('/', getDocentesHandler);         // GET /docentes
router.get('/:id', getDocenteByIdHandler);   // GET /docentes/:id
router.put('/:id', updateDocenteHandler);    // PUT /docentes/:id
router.delete('/:id', deleteDocenteHandler); // DELETE /docentes/:id

export default router;
