import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";

import commonStyles from "../../styles/common";
import { MARINE, AQUA_MARINE } from "../../styles/colors";

const MeetingView = () => {
  return (
    <LinearGradient
      colors={[MARINE, AQUA_MARINE]}
      style={commonStyles.viewContainer}
    ></LinearGradient>
  );
};

export default MeetingView;
