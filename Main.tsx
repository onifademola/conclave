import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import SplashNavigator from "./src/navigation/SplashNavigator";
import { fetchLoggedInUser, clearLoggedInUser } from "./src/consumers/storage";
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
import { isMeetingValidForAttendance } from "./src/consumers/DateHelper";

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
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  const startUp = async () => {
    const user = await fetchLoggedInUser();
    if (user) {
      setIsUserAdmin(user.Roles.includes("MeetingAdmin"));
      const isTokenDateValid = isMeetingValidForAttendance(user.ValidTo, new Date());
      if (isTokenDateValid) {
        dispatch(saveLoginData(user));
        setLoggedIn(true);
        setIsLoading(false);
      } else {
        clearLoggedInUser();
        setLoggedIn(false);
        setIsLoading(false);
      }
    } else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (loggedInUser === null) {
      startUp();
    }
    if (loggedInUser != null) {
      const isTokenDateValid = isMeetingValidForAttendance(
        loggedInUser.ValidTo,
        new Date()
      );
      if (isTokenDateValid) {
        setIsUserAdmin(loggedInUser.Roles.includes("MeetingAdmin"));
        setLoggedIn(true);
        return;
      } else {
        clearLoggedInUser();
        return;
      }      
    }
  }, [loggedInUser]);

  if (isLoading) {
    return <SplashNavigator />;
  }

  if (!fontsLoaded) {
    return <SplashNavigator />;
  }

  if (!loggedIn) {
    return <AuthNavigator />;
  }

  return (
    <View style={styles.container}>
      <AppNavigator isUserAdmin={isUserAdmin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
