import asyncHandler from 'express-async-handler';
import Tutor from '../models/tutorModel.js';
import User from '../models/userModel.js';

// @desc    Get tutor profile
// @route   GET /api/tutors/:id
// @access  Public
const getTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findOne({ user: req.params.id }).populate('user', 'name email mobile status');

  if (tutor) {
    res.json(tutor);
  } else {
    res.status(404);
    throw new Error('Tutor not found');
  }
});

// @desc    Update tutor profile
// @route   PUT /api/tutors/profile
// @access  Private
const updateTutorProfile = asyncHandler(async (req, res) => {
  const tutor = await Tutor.findOne({ user: req.user._id });

  if (tutor) {
    tutor.education = req.body.education || tutor.education;
    tutor.tutoring = req.body.tutoring || tutor.tutoring;
    tutor.documents = req.body.documents || tutor.documents;

    const updatedTutor = await tutor.save();

    // Calculate profile completion
    const completionPercentage = calculateProfileCompletion(updatedTutor);
    await User.findByIdAndUpdate(req.user._id, { profileComplete: completionPercentage });

    res.json(updatedTutor);
  } else {
    res.status(404);
    throw new Error('Tutor not found');
  }
});

// @desc    Get all tutors
// @route   GET /api/tutors
// @access  Public
const getTutors = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { 'tutoring.preferredSubjects': { $regex: req.query.keyword, $options: 'i' } },
          { 'tutoring.livingLocation': { $regex: req.query.keyword, $options: 'i' } }
        ]
      }
    : {};

  const count = await Tutor.countDocuments({ ...keyword });
  const tutors = await Tutor.find({ ...keyword })
    .populate('user', 'name email status')
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    tutors,
    page,
    pages: Math.ceil(count / pageSize)
  });
});

// Helper function to calculate profile completion percentage
const calculateProfileCompletion = (tutor) => {
  let score = 0;
  const totalFields = 10;

  if (tutor.education?.ssc) score++;
  if (tutor.education?.hsc) score++;
  if (tutor.education?.graduation) score++;
  if (tutor.tutoring?.livingLocation) score++;
  if (tutor.tutoring?.preferredSubjects?.length > 0) score++;
  if (tutor.tutoring?.preferredClasses?.length > 0) score++;
  if (tutor.tutoring?.availableDays?.length > 0) score++;
  if (tutor.tutoring?.experience) score++;
  if (tutor.documents?.studentId) score++;
  if (tutor.documents?.nidCard) score++;

  return Math.round((score / totalFields) * 100);
};

export { getTutorProfile, updateTutorProfile, getTutors };