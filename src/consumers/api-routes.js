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
  getMyAttendances: "meeting/attendance/me", // {userId}
  getDepartments: "getdepartments",
  getMeetings: "meeting/all/",
  imageUriPrefix: "https://abimealy.azurewebsites.net/aworan",
};
