import express from 'express';
import {
  createTuition,
  getTuitions,
  applyForTuition,
  updateApplicationStatus
} from '../controllers/tuitionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getTuitions)
  .post(protect, createTuition);

router.route('/:id/apply')
  .post(protect, applyForTuition);

router.route('/:id/applications/:applicationId')
  .put(protect, updateApplicationStatus);

export default router;