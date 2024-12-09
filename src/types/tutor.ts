interface TutorProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  education: {
    ssc: {
      institute: string;
      curriculum: string;
      group: string;
      passingYear: string;
      result: string;
    };
    hsc: {
      institute: string;
      curriculum: string;
      group: string;
      passingYear: string;
      result: string;
    };
    graduation: {
      instituteType: string;
      institute: string;
      department: string;
      year: string;
      cgpa: string;
    };
  };
  tuitionPreferences: {
    districts: string[];
    preferredAreas: string[];
    preferredMedium: string[];
    preferredClasses: string[];
    preferredSubjects: string[];
    daysPerWeek: string;
    timingShift: string;
    expectedSalary: string;
    tutoringStyle: string;
    experience: string;
  };
  personalInfo: {
    currentCity: string;
    currentArea: string;
    permanentLocation: string;
    fatherName: string;
    fatherPhone: string;
    motherName: string;
    motherPhone: string;
    guardianNumber: string;
    guardianRelation: string;
    about: string;
  };
  documents: {
    studentId?: string;
    nidCard?: string;
    lastCertificate?: string;
  };
  stats: {
    appliedJobs: number;
    shortlisted: number;
    appointed: number;
    confirmed: number;
    payments: number;
    cancelled: number;
  };
  profileComplete: number;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export type { TutorProfile };