import * as React from "react";
import { Button } from "react-native-paper";

interface buttonProps {
  name: string,
  icon: string,
  onPressAction: Function,
  content: string
}

const AppButton = (props: buttonProps) => {
  const { name, icon, onPressAction, content } = props;
  return (
    <Button name={name} icon={icon} mode="contained" onPress={() => onPressAction()}>
      {content}
    </Button>
  );
};

export default AppButton;
