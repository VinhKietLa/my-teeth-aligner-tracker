import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const AlignerCalendar = ({ aligners, startDate, nextSwitchDate }) => {
  const nextSwitch = new Date(nextSwitchDate);

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

  // Function to find the current week range
  const getCurrentWeekRange = () => {
    for (const aligner of alignerDates) {
      if (today >= aligner.startDate && today <= aligner.endDate) {
        const start = new Date(aligner.startDate);
        const end = new Date(aligner.endDate);

        // Adjust start and end to the current week
        while (start <= today) {
          start.setDate(start.getDate() + 7);
        }
        start.setDate(start.getDate() - 7);

        while (end < start) {
          end.setDate(end.getDate() + 7);
        }

        return { start, end };
      }
    }
    return null;
  };

  const currentWeek = getCurrentWeekRange();

  // Function to determine tile content based on aligner dates
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const dateString = date.toDateString();
      const nextSwitchDateString = new Date(nextSwitchDate).toDateString();

      for (let i = 0; i < alignerDates.length; i++) {
        const aligner = alignerDates[i];
        const alignerStartDateString = new Date(
          aligner.startDate
        ).toDateString();

        if (dateString === nextSwitchDateString) {
          // Mark the immediate next switch date
          return <div className="calendar-tile aligner-next-switch"></div>;
        } else if (i > 0 && dateString === alignerStartDateString) {
          // Mark future switch dates (start dates of aligners, excluding the first one)
          return <div className="calendar-tile aligner-next-switch"></div>;
        }

        if (
          date < today &&
          date >= aligner.startDate &&
          date < aligner.endDate
        ) {
          return <div className="calendar-tile aligner-completed"></div>;
        } else if (
          currentWeek &&
          date >= currentWeek.start &&
          date <= currentWeek.end
        ) {
          return <div className="calendar-tile aligner-current"></div>;
        } else if (date >= aligner.startDate && date < aligner.endDate) {
          return <div className="calendar-tile aligner-upcoming"></div>;
        }
      }
    }
  };

  return <Calendar tileContent={tileContent} />;
};

export default AlignerCalendar;
