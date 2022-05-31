import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import CancelledMeetings from "./CancelledMeetings";

import commonStyles from "../../styles/common";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";

const CancelledMeetingsContainer = () => {
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <CancelledMeetings />
    </LinearGradient>
  );
};

export default CancelledMeetingsContainer;
