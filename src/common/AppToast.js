// import React from 'react';
// import { useToast } from "react-native-styled-toast";
// import { ACCENT, PRY_COLOR, SEC_COLOR, TEXT_COLOR, WHITE_FADED } from "../styles/colors";

// const { toast } = useToast();

// export const ToastTypes = {
//   success: "success",
//   error: "error"
// }

// const ToastColor = {
//   success: {
//     color: TEXT_COLOR,
//     iconColor: TEXT_COLOR,
//     toastStyleBg: SEC_COLOR,
//     btnStyleBg: PRY_COLOR,
//     closeIconColor: TEXT_COLOR,
//   },
//   error: {
//     color: WHITE_FADED,
//     iconColor: WHITE_FADED,
//     toastStyleBg: PRY_COLOR,
//     btnStyleBg: SEC_COLOR,
//     closeIconColor: WHITE_FADED,
//   },
// };

// const AppToast = (type, message) => {
//   return toast({
//     message: message,
//     toastStyles: {
//       bg: ToastColor[type]["toastStyleBg"],
//       borderRadius: 16,
//     },
//     color: ToastColor[type]["color"],
//     iconColor: ToastColor[type]["iconColor"],
//     iconFamily: "RobotoCondensed_300Light",
//     iconName: "info",
//     closeButtonStyles: {
//       px: 4,
//       bg: ToastColor[type]["btnStyleBg"],
//       borderRadius: 16,
//     },
//     closeIconColor: ToastColor[type]["closeIconColor"],
//     hideAccent: true,
//   });
// }

// export default AppToast;