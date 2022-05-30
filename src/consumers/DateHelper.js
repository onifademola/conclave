import moment from "moment";

export const convertedDateCombinationToISO = (
  meetingDateTimestamp,
  otherDateTimestamp
) => {
  const validMeetingDate = moment(meetingDateTimestamp);
  const validOtherDate = moment(otherDateTimestamp);
  if (!validMeetingDate.isValid()) return null;
  if (!validOtherDate.isValid()) return null;
  const _meetingDate = new Date(meetingDateTimestamp);
  const _otherDate = new Date(otherDateTimestamp);
  const mom = moment({
    y: _meetingDate.getFullYear(),
    M: _meetingDate.getUTCMonth(),
    d: _meetingDate.getDate(),
    h: _otherDate.getHours(),
    m: _otherDate.getMinutes(),
  }).toString();
  return new Date(mom).toISOString();
};

export const convertToHourMinute = (isoDate) => {
  const validDate = moment(isoDate);
  if (!validDate.isValid()) return null;
  return moment(isoDate).format("LT");
};

export const calculatePunctuality = (
  meetingStartDateTime,
  attendeeArrivalTime,
  meetingLatenessThreshold) => {
    const latenessThreshold = moment(meetingStartDateTime).add(meetingLatenessThreshold, 'minutes');
    const isLate = moment(attendeeArrivalTime).diff(latenessThreshold);
    if (parseInt(isLate, 10) > 0) { //then attendee is late
      const timeDiffinMins = moment
        .utc(
          moment(attendeeArrivalTime, "DD/MM/YYYY HH:mm:ss").diff(
            moment(latenessThreshold, "DD/MM/YYYY HH:mm:ss")
          )
        );
      const hrTime = timeDiffinMins.format("HH");
      const minTime = timeDiffinMins.format("mm");
      const hrTimeInt = parseInt(hrTime, 10);
      const minTimeInt = parseInt(minTime, 10);
      return `Late by ${hrTimeInt > 0 ? `${hrTimeInt}hr ${minTimeInt}min(s)` : `${minTimeInt}min(s)`}`;
    } else {
      return "Punctual";
    }
}

export const isMeetingValidForAttendance = (
  meetingEndDateTime,
  attendeeArrivalTime) => {
    const isPast = moment(attendeeArrivalTime).diff(meetingEndDateTime);
    if (parseInt(isPast, 10) > 0) return false;
    return true;
}

export const getRecurringDatesForEveryDay = (
  meetingDate,
  startDate,
  endDate,
  recurringFor
) => {
  if (recurringFor < 1) return null;
  if (!moment(meetingDate).isValid) return null;
  const recurringResult = [];
  for (let i = 0; i < recurringFor; i++) {
    const currentDate = moment(meetingDate).add(i, "day");
    const currentStartDate = convertedDateCombinationToISO(
      currentDate,
      startDate
    );
    const currentEndDate = convertedDateCombinationToISO(currentDate, endDate);
    recurringResult.push({
      startDate: currentStartDate,
      endDate: currentEndDate,
    });
  }
  return recurringResult;
};

export const getRecurringDatesForWeekDays = (
  meetingDate,
  startDate,
  endDate,
  recurringFor
) => {
  if (recurringFor < 1) return null;
  if (!moment(meetingDate).isValid) return null;
  const recurringResult = [];
  for (let i = 0; i < recurringFor; i++) {
    const currentDate = moment(meetingDate).add(i, "day");
    const currentDateWeekDay = moment(meetingDate).format("ddd");
    const isCurrentDateWeekDay =
      currentDateWeekDay !== "Sat" && currentDateWeekDay !== "Sun";
    if (!isCurrentDateWeekDay) return;
    const currentStartDate = convertedDateCombinationToISO(
      currentDate,
      startDate
    );
    const currentEndDate = convertedDateCombinationToISO(currentDate, endDate);
    recurringResult.push({
      startDate: currentStartDate,
      endDate: currentEndDate,
    });
  }
  return recurringResult;
};

const getRecurringDatesForSpecificDays = (day) => {
  if (recurringFor < 1) return null;
  if (!moment(meetingDate).isValid) return null;
  const recurringResult = [];
  for (let i = 0; i < recurringFor; i++) {
    const currentDate = moment(meetingDate).add(i, "day");
    const currentDateWeekDay = moment(meetingDate).format("ddd");
    if (currentDateWeekDay !== day) return;
    const currentStartDate = convertedDateCombinationToISO(
      currentDate,
      startDate
    );
    const currentEndDate = convertedDateCombinationToISO(currentDate, endDate);
    recurringResult.push({
      startDate: currentStartDate,
      endDate: currentEndDate,
    });
  }
  return recurringResult;
};
