import express from 'express';
import {
  createStudentProfileHandler,
  getStudentProfilesHandler,
  getStudentProfileByIdHandler,
  updateStudentProfileHandler,
  deleteStudentProfileHandler,
} from '../controllers/studentProfileController.js';

const router = express.Router();

router.post('/', createStudentProfileHandler);
router.get('/', getStudentProfilesHandler);
router.get('/:id', getStudentProfileByIdHandler);
router.put('/:id', updateStudentProfileHandler);
router.delete('/:id', deleteStudentProfileHandler);

export default router;
