import { StatusBar } from "expo-status-bar";
import { AppDefaultTheme, AppDarkTheme } from "./src/styles/theme";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import store from "./src/redux/store";
import Main from "./Main";

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={AppDefaultTheme}>
        <NavigationContainer theme={AppDefaultTheme}>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
