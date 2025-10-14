import express from 'express';
import {
  createProfileHandler,
  getProfilesHandler,
  getProfileByIdHandler,
  updateProfileHandler,
  deleteProfileHandler,
} from '../controllers/profileController.js';

const router = express.Router();

router.post('/', createProfileHandler);      // POST /profiles
router.get('/', getProfilesHandler);         // GET /profiles
router.get('/:id', getProfileByIdHandler);   // GET /profiles/:id
router.put('/:id', updateProfileHandler);    // PUT /profiles/:id
router.delete('/:id', deleteProfileHandler); // DELETE /profiles/:id

export default router;
