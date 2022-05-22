import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SignIn from "./SignIn";
import { LinearGradient } from "expo-linear-gradient";
import commonStyles from "../../styles/common";
import { LOGIN_GRADIENT_COLORS } from "../../styles/colors";
import StartUpLogo from "../../common/StartUpLogo";

const AuthView = () => {
  return (
    <LinearGradient
      colors={LOGIN_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <View style={styles.container}>
        <StartUpLogo />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "black",
            textAlign: "left",
            paddingRight: 10,
          }}
        >
          ...Meeting Attendance
        </Text>
      </View>
      <SignIn />
    </LinearGradient>
  );
};

export default AuthView;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderBottomEndRadius: 100,
    borderTopStartRadius: 100,
    paddingRight: 30,
  },
});
