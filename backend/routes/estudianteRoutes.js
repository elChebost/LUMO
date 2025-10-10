import express from 'express';
import {
  createEstudianteHandler,
  getEstudiantesHandler,
  getEstudianteByIdHandler,
  updateEstudianteHandler,
  deleteEstudianteHandler,
  searchEstudiantesHandler,
  getXpPromedioHandler,
  getTotalEstudiantesHandler
} from '../controllers/estudianteController.js';

const router = express.Router();

router.post('/', createEstudianteHandler);            // POST /estudiantes
router.get('/', getEstudiantesHandler);               // GET /estudiantes
router.get('/:id', getEstudianteByIdHandler);         // GET /estudiantes/:id
router.put('/:id', updateEstudianteHandler);          // PUT /estudiantes/:id
router.delete('/:id', deleteEstudianteHandler);       // DELETE /estudiantes/:id
router.get('/search', searchEstudiantesHandler);      // GET /estudiantes/search?nombre=...&email=...
router.get('/:id/xp-promedio', getXpPromedioHandler); // GET /estudiantes/:id/xp-promedio
router.get('/total', getTotalEstudiantesHandler);     // GET /estudiantes/total

export default router;
