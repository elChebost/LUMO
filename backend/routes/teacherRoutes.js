import express from 'express';
import {
  createTeacherHandler,
  getTeachersHandler,
  getTeacherByIdHandler,
  updateTeacherHandler,
  deleteTeacherHandler,
} from '../controllers/teacherController.js';

const router = express.Router();

router.post('/', createTeacherHandler);      // POST /teachers
router.get('/', getTeachersHandler);         // GET /teachers
router.get('/:id', getTeacherByIdHandler);   // GET /teachers/:id
router.put('/:id', updateTeacherHandler);    // PUT /teachers/:id
router.delete('/:id', deleteTeacherHandler); // DELETE /teachers/:id

export default router;
