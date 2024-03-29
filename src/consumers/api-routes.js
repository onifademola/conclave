export const ApiRoutes = {
  login: "auth/login",
  changePassword: "auth/changepassword",
  forgotPassword: "auth/forgotpassword",
  createMeeting: "meeting/new",
  createAttendance: "meeting/attendance/new",
  updateMeeting: "meeting/update", // "/id" + Body
  deleteMeeting: "meeting/delete", // "/id"
  checkIn: "attendance/new", //meetingId + Body
  getMeetingAttendance: "meeting/attendance", // {siteId}"
  getMyAttendances: "meeting/attendance/me", // {email}
  getDepartments: "getdepartments",
  getMeetings: "meeting/all/", // {siteId}"
  getFutureMeetings: "meeting/future/", // {siteId}"
  getPastMeetings: "meeting/past/", // {siteId}"
  getCancelledMeetings: "meeting/cancelled/", // {siteId}"
  imageUriPrefix: "https://abimealy.azurewebsites.net/aworan",
};
