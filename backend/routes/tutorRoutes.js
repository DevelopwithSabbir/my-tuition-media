import express from 'express';
import { getTutorProfile, updateTutorProfile, getTutors } from '../controllers/tutorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTutors);
router.get('/:id', getTutorProfile);
router.put('/profile', protect, updateTutorProfile);

export default router;