import express from 'express';
import {
  createTeacherProfileHandler,
  getTeacherProfilesHandler,
  getTeacherProfileByIdHandler,
  updateTeacherProfileHandler,
  deleteTeacherProfileHandler,
} from '../controllers/teacherProfileController.js';

const router = express.Router();

router.post('/', createTeacherProfileHandler);
router.get('/', getTeacherProfilesHandler);
router.get('/:id', getTeacherProfileByIdHandler);
router.put('/:id', updateTeacherProfileHandler);
router.delete('/:id', deleteTeacherProfileHandler);

export default router;
