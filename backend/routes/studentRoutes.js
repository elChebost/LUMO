import express from 'express';
import {
  createStudentHandler,
  getStudentsHandler,
  getStudentByIdHandler,
  updateStudentHandler,
  deleteStudentHandler,
  searchStudentsHandler,
  getXpAverageHandler,
  getTotalStudentsHandler
} from '../controllers/studentController.js';

const router = express.Router();

router.post('/', createStudentHandler);               // POST /students
router.get('/', getStudentsHandler);                  // GET /students
router.get('/:id', getStudentByIdHandler);            // GET /students/:id
router.put('/:id', updateStudentHandler);             // PUT /students/:id
router.delete('/:id', deleteStudentHandler);          // DELETE /students/:id
router.get('/search', searchStudentsHandler);         // GET /students/search?name=...&email=...
router.get('/:id/xp-average', getXpAverageHandler);   // GET /students/:id/xp-average
router.get('/total', getTotalStudentsHandler);        // GET /students/total

export default router;
