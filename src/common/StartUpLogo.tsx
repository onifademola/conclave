import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import abi from "../../assets/abi.jpg";
import { DEVICE_WIDTH } from '../constants/device-dimensions';

const StartUpLogo = () => (
  <View style={styles.mainContainer}>
    <View style={styles.subContainer}>
      <Image style={{ maxWidth: 80, maxHeight: 60 }} source={abi} />
      <Text
        style={{
          color: "white",
          fontSize: DEVICE_WIDTH * 0.15,
        }}
      >
        Conclave
      </Text>
    </View>
    <View
      style={{
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <Text style={{ color: "white", textAlign: "right" }}>
        ANHEUSER-BUSCH INBEV (NG)
      </Text>
      <Text
        style={{ color: "white", fontSize: 10 }}
      >{`© ${new Date().getFullYear()} Eaglesbyte Inn. || SETUP Ltd.`}</Text>
    </View>
  </View>
);

export default StartUpLogo;

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    //paddingRight: 30,
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
});
