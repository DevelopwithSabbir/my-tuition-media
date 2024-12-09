export const calculateProfileCompletion = (profile: any): number => {
  let totalScore = 0;
  let maxScore = 0;

  // Education section (30%)
  if (profile?.education) {
    maxScore += 30;
    const eduFields = ['institute', 'curriculum', 'group', 'passingYear', 'result'];
    let eduScore = 0;
    eduFields.forEach(field => {
      if (profile.education[field]) eduScore++;
    });
    totalScore += (eduScore / eduFields.length) * 30;
  }

  // Personal Info section (30%)
  if (profile?.personalInfo) {
    maxScore += 30;
    const personalFields = ['fullName', 'email', 'phone', 'currentCity', 'about'];
    let personalScore = 0;
    personalFields.forEach(field => {
      if (profile.personalInfo[field]) personalScore++;
    });
    totalScore += (personalScore / personalFields.length) * 30;
  }

  // Tuition Preferences (20%)
  if (profile?.tuitionPreferences) {
    maxScore += 20;
    const prefFields = ['subjects', 'locations', 'classes', 'salary'];
    let prefScore = 0;
    prefFields.forEach(field => {
      if (profile.tuitionPreferences[field]) prefScore++;
    });
    totalScore += (prefScore / prefFields.length) * 20;
  }

  // Documents (20%)
  if (profile?.documents) {
    maxScore += 20;
    const docFields = ['studentId', 'nidCard', 'lastCertificate'];
    let docScore = 0;
    docFields.forEach(field => {
      if (profile.documents[field]) docScore++;
    });
    totalScore += (docScore / docFields.length) * 20;
  }

  return maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
};

export const canApplyForTuition = (profile: any): boolean => {
  return calculateProfileCompletion(profile) >= 80;
};