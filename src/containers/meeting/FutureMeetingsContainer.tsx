import * as React from "react";
import { LinearGradient } from "expo-linear-gradient";
import FutureMeetings from "./FutureMeetings";

import commonStyles from "../../styles/common";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";

const FutureMeetingsContainer = () => {
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <FutureMeetings />
    </LinearGradient>
  );
};

export default FutureMeetingsContainer;
