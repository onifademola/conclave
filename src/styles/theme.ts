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
  BLUE_PURPLE,
  MARINE,
  MARINE_FADED,
  AQUA_MARINE,
  WHITE_FADED,
  NODE_GRAPH_FILL,
  ORANGE_PINK
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
  // fonts: {
  //   regular: '',
  //   medium: '',
  //   light: '',
  //   thin: ''
  // }
};

const AppDefaultTheme = {
  ...CombinedDefaultTheme,
  ...commonTheme,
  colors: {
    ...CombinedDefaultTheme.colors,
    primary: WHITE_FADED,
    accent: MARINE_FADED,
    background: WHITE_FADED,
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