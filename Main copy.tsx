import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
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
import { saveLoginData, reset } from "./src/redux/user/userSlice";

const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const SplashStack = createStackNavigator();
const MainStack = createStackNavigator();

const AppStackScreen = () => {
  return (
    <AppStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <AppStack.Screen
        name="App"
        component={AppNavigator}
      />
    </AppStack.Navigator>
  );
}

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <AuthStack.Screen name="Auth" component={AuthNavigator} />
    </AuthStack.Navigator>
  );
}

const SplashStackScreen = () => {
  return (
    <SplashStack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <SplashStack.Screen name="Splash" component={SplashNavigator} />
    </SplashStack.Navigator>
  );
}

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
    console.log(loggedInUser)
    const user = await fetchLoggedInUser();
    if (user) { console.log('user found')
      dispatch(saveLoginData(user));
      setLoggedIn(true);
      setIsLoading(false);
    } else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    setLoggedIn(false);
    setIsLoading(false);
    dispatch(reset());
    clearLoggedInUser();
  }

  useEffect(() => {
    if (loggedInUser === null) {
      startUp();
    }
    if (loggedInUser != null) {
      setLoggedIn(true);
      return;
    }
  }, [loggedInUser]);

  if (isLoading) {
    return <SplashStackScreen />;
  }

  if (!fontsLoaded) {
    return <SplashStackScreen />;
  }

  if (!loggedIn) {
    return <AuthStackScreen />;
  }

  return (
    <View style={styles.container}>
      {/* {loggedIn ? (
        <AppStackScreen />
      ) : (
        <AuthStackScreen />
      )} */}
      <MainStack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <MainStack.Screen name="AppBase" component={AppStackScreen} />
      </MainStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
