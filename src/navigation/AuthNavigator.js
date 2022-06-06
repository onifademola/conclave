import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthContainer from "../containers/auth";

const StartupStack = createStackNavigator();

const StartupStackScreen = () => {
  return (
    <StartupStack.Navigator
      screenOptions={() => ({
        headerShown: false
      })}
    >
      <StartupStack.Screen name="AuthBase" component={AuthContainer} />
    </StartupStack.Navigator>
  );
};

const AuthNavigator = () => {
  return <StartupStackScreen />;
};

export default AuthNavigator;
