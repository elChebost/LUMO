import express from 'express';
import {
  createEscuelaHandler,
  getEscuelasHandler,
  getEscuelaByIdHandler,
  updateEscuelaHandler,
  deleteEscuelaHandler,
} from '../controllers/escuelaController.js';

const router = express.Router();

router.post('/', createEscuelaHandler);      // POST /escuelas
router.get('/', getEscuelasHandler);         // GET /escuelas
router.get('/:id', getEscuelaByIdHandler);   // GET /escuelas/:id
router.put('/:id', updateEscuelaHandler);    // PUT /escuelas/:id
router.delete('/:id', deleteEscuelaHandler); // DELETE /escuelas/:id

export default router;
