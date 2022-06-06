import React from "react";
import { View, StyleSheet } from "react-native";
import StartUpLogo from "./StartUpLogo";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <StartUpLogo />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
