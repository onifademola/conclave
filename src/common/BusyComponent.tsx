import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from "react-native-paper";
import { ActivityIndicator } from 'react-native-paper';
import { fontSize } from '../styles/fonts';

const activities = [
  "...we are sorting that, please wait.",
  "...work in progress, please hold a sec.",
  "...we are almost there, be patient.",

];

const baseColor = "black";

const getIndex = () => Math.floor(Math.random() * activities.length);

const BusyComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <ActivityIndicator animating={true} size="large" color={baseColor} />
      </View>
      <Title style={styles.title}>{activities[getIndex()]}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignitems: "center",
  },
  title: {
    textAlign: "center",
    color: baseColor,
    fontSize: fontSize.largeNormalText.fontSize,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    alignitems: "center",
  },
});

export default BusyComponent;