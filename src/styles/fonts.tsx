import { Platform, PlatformOSType } from 'react-native';
import type { Fonts } from './types';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "400" as "400",
    },
    medium: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "500" as "500",
    },
    light: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "300" as "300",
    },
    thin: {
      fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: "100" as "100",
    },
  },
  ios: {
    regular: {
      fontFamily: "System",
      fontWeight: "400" as "400",
    },
    medium: {
      fontFamily: "System",
      fontWeight: "500" as "500",
    },
    light: {
      fontFamily: "System",
      fontWeight: "300" as "300",
    },
    thin: {
      fontFamily: "System",
      fontWeight: "100" as "100",
    },
  },
  android: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal" as "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal" as "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal" as "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal" as "normal",
    },
  },
};

const fontSize = {
  largeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "RobotoCondensed_300Light",
  },
  largeHeaderText: {
    fontSize: 16,
    fontFamily: "RobotoCondensed_400Regular",
  },
  largeNormalText: {
    fontSize: 16,
    fontFamily: "RobotoCondensed_400Regular",
  },
  mediumButtonText: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
    fontFamily: "RobotoCondensed_300Light",
  },
  mediumHeaderText: {
    fontSize: 14,
    color: "blue",
    fontFamily: "RobotoCondensed_300Light",
  },
  mediumNormalText: {
    fontSize: 14,
    color: "blue",
    fontFamily: "RobotoCondensed_300Light",
  },
  smallButtonText: {
    fontSize: 12,
    color: "blue",
    fontWeight: "bold",
    fontFamily: "RobotoCondensed_300Light",
  },
  smallHeaderText: {
    fontSize: 12,
    color: "blue",
    fontFamily: "RobotoCondensed_300Light",
  },
  smallNormalText: {
    fontSize: 12,
    color: "blue",
    fontFamily: "RobotoCondensed_300Light",
  },
};

export { fontConfig, fontSize };

// export default function configureFonts(config?: {
//   [platform in PlatformOSType | 'default']?: Fonts;
// }): Fonts {
//   const fonts = Platform.select({ ...fontConfig, ...config }) as Fonts;
//   return fonts;
// }