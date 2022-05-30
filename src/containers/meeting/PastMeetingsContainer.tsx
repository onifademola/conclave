import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import PastMeetings from "./PastMeetings";

import commonStyles from "../../styles/common";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";

const PastMeetingsContainer = () => {
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <PastMeetings />
    </LinearGradient>
  );
};

export default PastMeetingsContainer;
