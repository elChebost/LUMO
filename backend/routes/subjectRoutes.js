import express from 'express';
import {
  createSubjectHandler,
  getSubjectsHandler,
  getSubjectByIdHandler,
  updateSubjectHandler,
  deleteSubjectHandler,
} from '../controllers/subjectController.js';

const router = express.Router();

router.post('/', createSubjectHandler);      // POST /subjects
router.get('/', getSubjectsHandler);         // GET /subjects
router.get('/:id', getSubjectByIdHandler);   // GET /subjects/:id
router.put('/:id', updateSubjectHandler);    // PUT /subjects/:id
router.delete('/:id', deleteSubjectHandler); // DELETE /subjects/:id

export default router;
