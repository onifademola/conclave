import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, Title } from "react-native-paper";
import { fontSize } from '../styles/fonts';

const baseColor = "black";

const EmptyList = ({ touched }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <IconButton color={baseColor} icon="pail-off" size={80} onPress={touched} />
      </TouchableOpacity>
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