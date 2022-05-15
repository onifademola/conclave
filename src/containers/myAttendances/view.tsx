import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MARINE, AQUA_MARINE } from "../../styles/colors";
import commonStyles from "../../styles/common";
import Attendances from "./Attendances";

const MyAttendancesView = () => {
  return (
    <LinearGradient
      colors={[MARINE, AQUA_MARINE]}
      style={commonStyles.viewContainer}
    >
      <Attendances />
    </LinearGradient>
  );
};

export default MyAttendancesView;
