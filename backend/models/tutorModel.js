import mongoose from 'mongoose';

const tutorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  education: {
    ssc: {
      institute: String,
      curriculum: String,
      group: String,
      passingYear: String,
      result: String
    },
    hsc: {
      institute: String,
      curriculum: String,
      group: String,
      passingYear: String,
      result: String
    },
    graduation: {
      instituteType: String,
      institute: String,
      department: String,
      year: String,
      cgpa: String
    }
  },
  tutoring: {
    livingLocation: String,
    preferredLocations: [String],
    preferredSubjects: [String],
    preferredClasses: [String],
    availableDays: [String],
    availableFrom: String,
    availableTo: String,
    experience: String,
    expectedSalary: String
  },
  documents: {
    studentId: String,
    nidCard: String,
    lastCertificate: String
  },
  stats: {
    ratings: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    profileViews: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

const Tutor = mongoose.model('Tutor', tutorSchema);
export default Tutor;