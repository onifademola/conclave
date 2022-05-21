import { createSwitchNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import ForgotPassword from "../screens/ForgotPassword";

const AuthNavigator = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: "Login",
  }
);

export default createAppContainer(AuthNavigator);
