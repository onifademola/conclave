import React from "react";
import { View, StyleSheet } from "react-native";
import { Title, Avatar } from "react-native-paper";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { DEVICE_HEIGHT } from "../../constants/device-dimensions";

const onBtnPressed = () => {
  console.log("BTN pressed");
};

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          // content={userData != null ? userData.Username : "NA"}
          content={"user@email.com"}
          color="black"
          size={DEVICE_HEIGHT * 0.45}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT * 0.38,
    justifyContent: "flex-end",
    padding: 15,
  },
  qrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProfileHeader;
