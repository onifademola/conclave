import { StyleSheet, View } from "react-native";
import HomeContainer from './src/containers/home/index';

const Main = () => {
  return (
    <View style={styles.container}>
      <HomeContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
