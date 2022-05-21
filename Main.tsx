import { StyleSheet, View } from "react-native";
import HomeContainer from './src/containers/home/index';
import AuthContainer from "./src/containers/auth";

const Main = () => {
  return (
    <View style={styles.container}>
      <AuthContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
