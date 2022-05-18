import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Title } from "react-native-paper";
import { fontSize } from '../styles/fonts';

const baseColor = "black";

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <IconButton color={baseColor} icon="pail-off" size={80} />
      </View>
      <Title style={styles.title}>Sorry, nothing is in this list!</Title>
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

export default EmptyList;