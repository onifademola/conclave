import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import SignIn from "./SignIn";
import { LinearGradient } from "expo-linear-gradient";
import commonStyles from "../../styles/common";
import { SEC_COLOR, LOGIN_GRADIENT_COLORS } from "../../styles/colors";
import { DEVICE_WIDTH } from "../../constants/device-dimensions";
import abi from "../../../assets/abi.jpg";

const AuthView = () => {
  return (
    <LinearGradient
      colors={LOGIN_GRADIENT_COLORS}
      style={commonStyles.viewContainer}
    >
      <View style={styles.container}>
        <Image style={{ maxWidth: 80, maxHeight: 60 }} source={abi} />
        <Text
          style={{
            color: "white",
            // fontStyle: "italic",
            fontSize: DEVICE_WIDTH * 0.15,
            fontWeight: "900",
          }}
        >
          Conclave
        </Text>
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
            fontWeight: "900",
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    borderBottomEndRadius: 100,
    borderTopStartRadius: 100
  },
});
