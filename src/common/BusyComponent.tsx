import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { fontSize } from '../styles/fonts';
import * as Animatable from "react-native-animatable";
import { ACCENT } from "../styles/colors";

const activities = [
  "...we are sorting that, please wait.",
  "...work in progress, please hold a sec.",
  "...we are almost there, be patient.",
  "...patience is a virtue, we'll be done soon",
  "...we'll be set in a jiffy",
];

const baseColor = "black";

const getIndex = () => Math.floor(Math.random() * activities.length-1);

const BusyComponent = () => {
  const [indexState, setIndexState] = useState(0);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if(mounted) setIndexState(getIndex());
    }, 4000);

    return () => {
      mounted = false;
    }
  }, [indexState]);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <ActivityIndicator animating={true} size="large" color={baseColor} />
      </View>
      <Animatable.Text
        animation="swing"
        easing="ease-out"
        iterationCount="infinite"
        style={styles.title}
      >
        {activities[indexState]}
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignitems: "center",
    backgroundColor: ACCENT,
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