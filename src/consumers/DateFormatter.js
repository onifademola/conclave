import moment from "moment";

export const convertedDateCombinationToISO = (meetingDateTimestamp, otherDateTimestamp) => {
  const _meetingDate = new Date(meetingDateTimestamp);
  const _otherDate = new Date(otherDateTimestamp);
  const mom = moment({
    y: _meetingDate.getFullYear(),
    M: _meetingDate.getUTCMonth(),
    d: _meetingDate.getUTCDate(),
    h: _otherDate.getHours(),
    m: _otherDate.getMinutes(),
  }).toString();
  return new Date(mom).toISOString();
};

export const convertToHourMinute = isoDate => moment(isoDate).format("LT");
