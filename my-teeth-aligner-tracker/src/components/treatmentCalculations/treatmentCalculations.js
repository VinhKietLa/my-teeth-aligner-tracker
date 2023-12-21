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

//Function for calculating when the next aligner switch is//
/**
 * Calculate the date for the next aligner switch.
 * @param {Array} aligners - Array of aligner objects with duration_weeks property.
 * @param {string} startDate - Start date of the treatment in a format that can be parsed by Date constructor.
 * @returns {string} - Date of the next aligner switch in YYYY-MM-DD format.
 */
export const calculateNextAlignerSwitch = (aligners, startDate) => {
  const start = new Date(startDate);
  let totalWeeks = 0;

  for (const aligner of aligners) {
    totalWeeks += aligner.duration_weeks;

    // Calculate the end date of the current aligner
    const alignerEndDate = new Date(start);
    alignerEndDate.setDate(alignerEndDate.getDate() + totalWeeks * 7);

    // If the end date of the current aligner is in the future, this is our next switch date
    if (alignerEndDate > new Date()) {
      return alignerEndDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
    }
  }

  // If all aligners are in the past, return null or an appropriate message
  return null;
};

//Function for calculating when the aligner treatmend end date is//
// Calculate the end date of the treatment plan
export const calculateEndOfTreatment = (aligners, startDate) => {
  const totalDuration = aligners.reduce(
    (total, aligner) => total + aligner.duration_weeks,
    0
  );
  const start = new Date(startDate);
  const endDate = new Date(start);
  endDate.setDate(endDate.getDate() + totalDuration * 7); // Add total duration in days
  return endDate.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
};
