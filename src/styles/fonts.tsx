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
  },
  largeHeaderText: {
    fontSize: 16,
  },
  largeNormalText: {
    fontSize: 16,
  },
  mediumButtonText: {
    fontSize: 14,
    color: "blue",
    fontWeight: "bold",
  },
  mediumHeaderText: {
    fontSize: 14,
    color: "blue",
  },
  mediumNormalText: {
    fontSize: 14,
    color: "blue",
  },
  smallButtonText: {
    fontSize: 12,
    color: "blue",
    fontWeight: "bold",
  },
  smallHeaderText: {
    fontSize: 12,
    color: "blue",
  },
  smallNormalText: {
    fontSize: 12,
    color: "blue",
  },
};

export { fontConfig, fontSize };

// export default function configureFonts(config?: {
//   [platform in PlatformOSType | 'default']?: Fonts;
// }): Fonts {
//   const fonts = Platform.select({ ...fontConfig, ...config }) as Fonts;
//   return fonts;
// }