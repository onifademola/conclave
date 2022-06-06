import React from "react";
import { View, StyleSheet, Text, Modal, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Prop {
  visible?: Boolean;
  message?: string;
  type: ModalType;
}

export enum ModalType {
  success,
  error
}

const getIconType = (icon: ModalType ) => {
  switch (icon) {
    case ModalType.success:
      return "ios-checkmark-circle-sharp";

    case ModalType.error:
      return "ios-close-circle-sharp";

    default:
      break;
  }
}

const getAlertTitle = (title: ModalType) => {
  switch (title) {
    case ModalType.success:      
      return "SUCCESS";
    
    case ModalType.error:
      return "ERROR";
  
    default:
      break;
  }
};

const baseColor = "black";

const ModalAlertComponent = (prop: Prop) => {
  const {
    visible = true, 
    type, 
    message = 
      type === ModalType.success 
        ? "Task was successfully completed." 
        : "Sorry, an error occured. Task failed!"
  } = prop;
  
  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View
        style={{
          flex: 0.5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
          margin: 25,
          paddingTop: 30,
        }}
      >
        <Ionicons name={getIconType(type)} size={80} color={baseColor} />
      </View>
      <View
        style={{
          flex: 0.5,
          flexDirection: "column",
          padding: 10,
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{getAlertTitle(type)}</Text>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
});

export default ModalAlertComponent;
