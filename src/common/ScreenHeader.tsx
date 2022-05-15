import React from "react";
import { Caption } from "react-native-paper";

const ScreenHeader = ({ title }) => {
  console.log("title recieved: ", title);
  return <Caption>{title}</Caption>;
};

export default ScreenHeader;
