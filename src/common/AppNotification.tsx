import React from 'react';
import { View, StyleSheet } from "react-native";
import { Button, Snackbar } from "react-native-paper";

const AppNotification = (message) => {
  const [visible, setVisible] = React.useState(true);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      {/* <Button onPress={onToggleSnackBar}>{visible ? "Hide" : "Show"}</Button> */}
      <Snackbar
        duration={4000}
        visible={true}
        //onDismiss={onDismissSnackBar}
        // action={{
        //   label: "Undo",
        //   onPress: () => {
        //     // Do something
        //   },
        // }}
      >
        {message}
      </Snackbar>
    </View>
  );
}

export default AppNotification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});