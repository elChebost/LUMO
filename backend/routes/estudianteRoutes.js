import express from 'express';
import {
  createEstudianteHandler,
  getEstudiantesHandler,
  getEstudianteByIdHandler,
  updateEstudianteHandler,
  deleteEstudianteHandler,
} from '../controllers/estudianteController.js';

const router = express.Router();

router.post('/', createEstudianteHandler);      // POST /estudiantes
router.get('/', getEstudiantesHandler);         // GET /estudiantes
router.get('/:id', getEstudianteByIdHandler);   // GET /estudiantes/:id
router.put('/:id', updateEstudianteHandler);    // PUT /estudiantes/:id
router.delete('/:id', deleteEstudianteHandler); // DELETE /estudiantes/:id

export default router;
