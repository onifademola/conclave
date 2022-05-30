import React from "react";
import { View, StyleSheet } from "react-native";
import { QRCode } from "react-native-custom-qr-codes-expo";
import { DEVICE_HEIGHT } from "../../constants/device-dimensions";

const ProfileHeader = ({ user }) => {
  if (!user) return null;
  
  const { Username } = user;

  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          content={Username}
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
    justifyContent: "flex-start",
  },
  qrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ProfileHeader;
