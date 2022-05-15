import React from "react";
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";
import { DEVICE_HEIGHT } from "../../constants/device-dimensions";
import AppButton from "../../common/AppButton";

const onBtnPressed = () => {
  console.log('BTN pressed');
}

const Header = () => {
  return (
    <View style={styles.container}>
      <Title style={{ color: "white" }}>Header</Title>
      <AppButton icon="camera" name="checkin" content="Check In" onPressAction={onBtnPressed}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT * 0.38,
    justifyContent: "flex-end",
    padding: 15
  },
});

export default Header;
