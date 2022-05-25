import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import commonStyles from "../../styles/common";
import { View, StyleSheet } from "react-native";

const ProfileView = () => {
  const appUser = useSelector((state) => state.user.loggedInUser);

  const [loggedInUser, setLoggedInUser] = useState(appUser);

  if (!loggedInUser) return <View></View>;

  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={styles.viewContainer}
    >
      <ProfileHeader user={loggedInUser} />
      <ProfileContent user={loggedInUser} />
    </LinearGradient>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 30,
    fontFamily: "RobotoCondensed_400Regular",
  },
});
