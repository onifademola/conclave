import * as React from "react";
import { Button } from "react-native-paper";

interface buttonProps {
  name: string,
  icon: string,
  onPressAction: any,
  content: string
}

const AppButton = (props: buttonProps) => {
  const { name, icon, onPressAction, content } = props;
  return (
    <Button icon="camera" mode="contained" onPress={() => console.log("Pressed")}>
      Press me
    </Button>
  );
};

export default AppButton;
