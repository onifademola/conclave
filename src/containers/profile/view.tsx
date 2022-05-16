import * as React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from './ProfileContent';
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import commonStyles from '../../styles/common';
import ScreenHeader from '../../common/ScreenHeader';

const ProfileView = () => {
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      {/* <ScreenHeader title="Profile" /> */}
      <ProfileHeader />
      <ProfileContent />
    </LinearGradient>
  );
};

export default ProfileView;
