import React from 'react';
import { View, StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const Content = () => {
  return (
    <View style={styles.container}>
      <Title>Content</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: "white",
    // justifyContent: "flex-end",
  },
});

export default Content