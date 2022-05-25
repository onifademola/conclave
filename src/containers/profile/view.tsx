import * as React from 'react';
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from 'react-redux';
import ProfileHeader from "./ProfileHeader";
import ProfileContent from './ProfileContent';
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import commonStyles from '../../styles/common';
import { View } from 'react-native';

const ProfileView = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  if (!loggedInUser) return <View></View>;
  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      {/* <ScreenHeader title="Profile" /> */}
      <ProfileHeader user={loggedInUser} />
      <ProfileContent user={loggedInUser} />
    </LinearGradient>
  );
};

export default ProfileView;
