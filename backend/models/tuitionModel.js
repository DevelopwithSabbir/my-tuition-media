import mongoose from 'mongoose';

const tuitionSchema = new mongoose.Schema({
  tuitionCode: {
    type: String,
    required: true,
    unique: true
  },
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  studentGender: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  daysPerWeek: {
    type: Number,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  tutorRequirements: {
    institution: String,
    gender: String,
    experience: String,
    other: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  applications: [{
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Tuition = mongoose.model('Tuition', tuitionSchema);
export default Tuition;