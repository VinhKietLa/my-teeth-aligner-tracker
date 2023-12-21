// treatmentCalculations.js takes the aligners from the rails api tp calculate total duration weeks.
export const calculateTotalTreatmentDuration = (aligners) => {
  return aligners.reduce((total, aligner) => total + aligner.duration_weeks, 0);
};

// treatmentCalculations.js takes the startDate from the rails api to calculate the difference from the start date to todays date.
export const calculateWeeksElapsed = (startDate) => {
  const start = new Date(startDate);
  const today = new Date();
  return Math.floor((today - start) / (1000 * 60 * 60 * 24 * 7));
};
export const calculateTreatmentTimeRemaining = (startDate, aligners) => {
  const totalDuration = calculateTotalTreatmentDuration(aligners);
  const weeksElapsed = calculateWeeksElapsed(startDate);
  return Math.max(totalDuration - weeksElapsed, 0); // To avoid negative values
};
