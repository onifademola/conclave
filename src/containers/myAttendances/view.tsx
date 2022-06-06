import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import commonStyles from "../../styles/common";
import Attendances from "./Attendances";

const MyAttendancesView = () => {
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <Attendances />
    </LinearGradient>
  );
};

export default MyAttendancesView;
