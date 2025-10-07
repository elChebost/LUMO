import express from 'express';
import {
  createAsignaturaHandler,
  getAsignaturasHandler,
  getAsignaturaByIdHandler,
  updateAsignaturaHandler,
  deleteAsignaturaHandler,
} from '../controllers/asignaturaController.js';

const router = express.Router();

router.post('/', createAsignaturaHandler);      // POST /asignaturas
router.get('/', getAsignaturasHandler);         // GET /asignaturas
router.get('/:id', getAsignaturaByIdHandler);   // GET /asignaturas/:id
router.put('/:id', updateAsignaturaHandler);    // PUT /asignaturas/:id
router.delete('/:id', deleteAsignaturaHandler); // DELETE /asignaturas/:id

export default router;
