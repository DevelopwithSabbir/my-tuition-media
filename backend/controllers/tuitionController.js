import asyncHandler from 'express-async-handler';
import Tuition from '../models/tuitionModel.js';

// @desc    Create new tuition post
// @route   POST /api/tuitions
// @access  Private
const createTuition = asyncHandler(async (req, res) => {
  const {
    studentGender,
    class: studentClass,
    subject,
    version,
    daysPerWeek,
    salary,
    location,
    tutorRequirements
  } = req.body;

  const tuition = new Tuition({
    guardian: req.user._id,
    tuitionCode: 'T' + Date.now(),
    studentGender,
    class: studentClass,
    subject,
    version,
    daysPerWeek,
    salary,
    location,
    tutorRequirements
  });

  const createdTuition = await tuition.save();
  res.status(201).json(createdTuition);
});

// @desc    Get all tuitions
// @route   GET /api/tuitions
// @access  Public
const getTuitions = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        $or: [
          { subject: { $regex: req.query.keyword, $options: 'i' } },
          { location: { $regex: req.query.keyword, $options: 'i' } }
        ]
      }
    : {};

  const count = await Tuition.countDocuments({ ...keyword });
  const tuitions = await Tuition.find({ ...keyword })
    .populate('guardian', 'name')
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({
    tuitions,
    page,
    pages: Math.ceil(count / pageSize)
  });
});

// @desc    Apply for tuition
// @route   POST /api/tuitions/:id/apply
// @access  Private
const applyForTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);

  if (tuition) {
    const alreadyApplied = tuition.applications.find(
      (app) => app.tutor.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      res.status(400);
      throw new Error('Already applied for this tuition');
    }

    tuition.applications.push({
      tutor: req.user._id,
      status: 'pending'
    });

    await tuition.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } else {
    res.status(404);
    throw new Error('Tuition not found');
  }
});

// @desc    Update application status
// @route   PUT /api/tuitions/:id/applications/:applicationId
// @access  Private
const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const tuition = await Tuition.findById(req.params.id);

  if (tuition) {
    const application = tuition.applications.id(req.params.applicationId);
    if (application) {
      application.status = status;
      await tuition.save();
      res.json({ message: 'Application status updated' });
    } else {
      res.status(404);
      throw new Error('Application not found');
    }
  } else {
    res.status(404);
    throw new Error('Tuition not found');
  }
});

export { createTuition, getTuitions, applyForTuition, updateApplicationStatus };