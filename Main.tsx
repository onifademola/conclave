import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashNavigator from "./src/navigation/SplashNavigator";
import { fetchLoggedInUser, saveLoggedInUser } from "./src/consumers/storage";
import {
  useFonts,
  RobotoCondensed_300Light,
  RobotoCondensed_300Light_Italic,
  RobotoCondensed_400Regular,
  RobotoCondensed_400Regular_Italic,
  RobotoCondensed_700Bold,
  RobotoCondensed_700Bold_Italic,
} from "@expo-google-fonts/roboto-condensed";
import { useSelector, useDispatch } from "react-redux";
import { saveLoginData } from "./src/redux/user/userSlice";

const Main = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  let [fontsLoaded] = useFonts({
    RobotoCondensed_300Light,
    RobotoCondensed_300Light_Italic,
    RobotoCondensed_400Regular,
    RobotoCondensed_400Regular_Italic,
    RobotoCondensed_700Bold,
    RobotoCondensed_700Bold_Italic,
  });
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const startUp = async () => {
    const user = await fetchLoggedInUser();
    if (user) {
      dispatch(saveLoginData(user));
      setLoggedIn(true);
      setIsLoading(false);
    } else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!loggedInUser) {
      setLoggedIn(false);
      setIsLoading(false);
      return;
    }
    startUp();
  }, [loggedInUser]);

  if (isLoading) {
    return <SplashNavigator />;
  }

  if (!fontsLoaded) {
    return <SplashNavigator />;
  }

  return (
    <View style={styles.container}>
      {loggedIn ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
