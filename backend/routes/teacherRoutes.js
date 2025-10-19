import express from 'express';
import {
  createTeacherHandler,
  getTeachersHandler,
  getTeacherByIdHandler,
  updateTeacherHandler,
  deleteTeacherHandler,
  uploadAvatarHandler
} from '../controllers/teacherController.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.post('/', createTeacherHandler);                          // POST /teachers
router.get('/', getTeachersHandler);                             // GET /teachers
router.get('/:id', getTeacherByIdHandler);                       // GET /teachers/:id
router.put('/:id', updateTeacherHandler);                        // PUT /teachers/:id
router.delete('/:id', deleteTeacherHandler);                     // DELETE /teachers/:id
router.post('/:id/avatar', upload.single('avatar'), uploadAvatarHandler); // POST /teachers/:id/avatar

export default router;
