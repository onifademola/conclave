export const ApiRoutes = {
  login: "/auth/login",
  changePassword: "/auth/changepassword",
  forgotPassword: "/auth/forgotpassword",
  createMeeting: "meeting/new",
  updateMeeting: "meeting/update", // "/id" + Body
  deleteMeeting: "meeting/delete", // "/id"
  checkIn: "attendance/new", //meetingId + Body
  
};
