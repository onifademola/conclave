import * as React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from 'react-redux';
import ProfileHeader from "./ProfileHeader";
import ProfileContent from './ProfileContent';
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import commonStyles from '../../styles/common';

const ProfileView = () => {
  const user = useSelector(state => state.user.loggedInUser);
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      {/* <ScreenHeader title="Profile" /> */}
      <ProfileHeader user={user} />
      <ProfileContent user={user} />
    </LinearGradient>
  );
};

export default ProfileView;
