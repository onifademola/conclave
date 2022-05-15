import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Meeting from "./Meeting";

import commonStyles from "../../styles/common";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";

const MeetingView = () => {
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <Meeting />
    </LinearGradient>
  );
};

export default MeetingView;
