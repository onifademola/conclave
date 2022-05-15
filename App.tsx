import { StatusBar } from "expo-status-bar";
import { AppDefaultTheme, AppDarkTheme } from './src/styles/theme';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";

import Main from "./Main";

export default function App() {
  return (
    <PaperProvider theme={AppDefaultTheme}>
      <NavigationContainer theme={AppDefaultTheme}>
        <Main />
      </NavigationContainer>
    </PaperProvider>
  );
}
