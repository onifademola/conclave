import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { clearLoggedInUser } from "../../consumers/storage";
import { reset } from "../../redux/user/userSlice";
import { LINEAR_GRADIENT_COLORS } from "../../styles/colors";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ProfileView = () => {
  const dispatch = useDispatch();
  const appUser = useSelector((state) => state.user.loggedInUser);

  const [loggedInUser, setLoggedInUser] = useState(appUser);

  if (!loggedInUser) return <View></View>;

  return (
    <LinearGradient
      colors={LINEAR_GRADIENT_COLORS}
      style={styles.viewContainer}
    >
      <TouchableOpacity
        style={{
          paddingRight: "5%",
        }}
        onPress={() => {
          dispatch(reset());
          clearLoggedInUser();
        }}
      >
        <Text
          style={{
            textAlign: "right",
            fontFamily: "RobotoCondensed_300Light",
            color: "white",
            fontSize: 25,
          }}
        >
          Signout
        </Text>
      </TouchableOpacity>
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
    fontFamily: "RobotoCondensed_400Regular",
  },
});
