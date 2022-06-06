import * as React from "react";
import { Button } from "react-native-paper";
import { IconButton } from "react-native-paper";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

interface buttonProps {
  name: string,
  title: string,
  icon: string,
  onPressAction: Function,
}

export const AppButton = (props: buttonProps) => {
  const { name, icon = "content-save-check", onPressAction, title = name } = props;
  return (
    <TouchableOpacity onPress={() => onPressAction()}>
      <Button
        name={name}
        icon={icon}
        mode="contained"
        style={styles.button}
        labelStyle={styles.text}
      >
        {title.toLocaleUpperCase()}
      </Button>
    </TouchableOpacity>
  );
};

export const AppButtonSmall = (props: buttonProps) => {
  const { name, icon = "content-save-check", onPressAction, title = name } = props;
  return (
    <TouchableOpacity onPress={() => onPressAction()}>
      <Button
        name={name}
        mode="contained"
        style={styles.smallButton}
        labelStyle={styles.smallText}
      >
        {title.toLocaleUpperCase()}
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    elevation: 3,
  },
  smallButton: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 5,
    //elevation: 3,
  },
  text: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  smallText: {
    fontSize: 14,
    // fontWeight: "bold",
  },
});