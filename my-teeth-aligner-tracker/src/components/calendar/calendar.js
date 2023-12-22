import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const AlignerCalendar = ({ aligners, startDate }) => {
  // Function to calculate start and end dates for each aligner
  const getAlignerDates = () => {
    const dates = [];
    let currentDate = new Date(startDate);

    for (const aligner of aligners) {
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + aligner.duration_weeks * 7);
      dates.push({ startDate: new Date(currentDate), endDate });
      currentDate = new Date(endDate);
    }

    return dates;
  };

  const alignerDates = getAlignerDates();
  const today = new Date();

  // Function to determine tile content based on aligner dates
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      for (const aligner of alignerDates) {
        if (date >= aligner.startDate && date <= aligner.endDate) {
          if (date < today) {
            return <div className="calendar-tile aligner-completed"></div>;
          } else if (date.toDateString() === today.toDateString()) {
            return <div className="calendar-tile aligner-current"></div>;
          } else {
            return <div className="calendar-tile aligner-upcoming"></div>;
          }
        }
      }
    }
  };

  return <Calendar tileContent={tileContent} />;
};

export default AlignerCalendar;
