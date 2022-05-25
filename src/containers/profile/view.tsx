import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import commonStyles from "../../styles/common";
import { View } from "react-native";

const ProfileView = () => {
  const appUser = useSelector((state) => state.user.loggedInUser);

  const [loggedInUser, setLoggedInUser] = useState(appUser);

  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <ProfileHeader user={loggedInUser || null} />
      <ProfileContent user={loggedInUser || null} />
    </LinearGradient>
  );
};

export default ProfileView;
