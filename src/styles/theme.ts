import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  configureFonts,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import { 
  BACKGROUND_GRADIENT_COLORS,
  PRY_COLOR,
  ACCENT,
  SEC_COLOR,
  WHITE_FADED,
  TEXT_COLOR
} from './colors';
import { fontConfig } from "./fonts";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const commonTheme = {
  roundness: 15,
  animation: {
    scale: 1.0,
  },
  fonts: configureFonts(fontConfig),
};

const AppDefaultTheme = {
  ...CombinedDefaultTheme,
  ...commonTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: WHITE_FADED,
    accent: ACCENT,
    background: ACCENT,
    backdrop: BACKGROUND_GRADIENT_COLORS,
    text: TEXT_COLOR,
  },
};

const AppDarkTheme = {
  ...CombinedDarkTheme,
  ...commonTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export { AppDefaultTheme, AppDarkTheme };