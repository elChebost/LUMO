import express from 'express';
import {
  createStudentHandler,
  getStudentsHandler,
  getStudentByIdHandler,
  updateStudentHandler,
  deleteStudentHandler,
  searchStudentsHandler,
  getTotalStudentsHandler,
  getStudentsByLevelHandler,
  getStudentsByLevelRangeHandler
} from '../controllers/studentController.js';

const router = express.Router();

router.post('/', createStudentHandler);                          // POST /students
router.get('/', getStudentsHandler);                             // GET /students
router.get('/search', searchStudentsHandler);                    // GET /students/search?name=...&email=...
router.get('/level/:level', getStudentsByLevelHandler);          // GET /students/level/1
router.get('/level-range', getStudentsByLevelRangeHandler);      // GET /students/level-range?min=1&max=3
router.get('/total', getTotalStudentsHandler);                   // GET /students/total
router.get('/:id', getStudentByIdHandler);                       // GET /students/:id
router.put('/:id', updateStudentHandler);                        // PUT /students/:id
router.delete('/:id', deleteStudentHandler);                     // DELETE /students/:id

export default router;
