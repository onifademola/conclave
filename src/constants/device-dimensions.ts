import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;
export const SMALLER_IOS_DEVICE = height <= 572;
export const SMALL_DEVICE = height > 572 && height <= 667;
export const MEDIUM_DEVICE = height > 667 && height <= 736; //width: 65%, height: 37%
export const LARGE_DEVICE = height > 736 && height <= 930; //width: 72%, 33%
export const LARGER_DEVICE = height > 930;
export const SMALL_DEVICES = SMALLER_IOS_DEVICE || SMALL_DEVICE;
export const MEDIUM_LARGE_DEVICES = MEDIUM_DEVICE || LARGE_DEVICE;
export const iPHONE_12_PRO =
  (width == 390 || width == 428) && (height == 844 || height == 926);

//SE - 568, 320 -> Working
//6s - 667, 375 -> Working
//6s plus - 736, 414 -> Working
//iphone 7 - 667 375 -> Working
//iPhone 7plus - 736, 414 -> Working
//iPhone 8 - 667, 375 -> Working
//iPhone 8plus - 736, 414 -> Working
//iPhone X - 812, 375 -> Working
//iPhone 11 Pro Max - 896, 414 -> Working
//iPhone Pro - 844 390
//iPhone 12 Pro Max - 926, 428 (height) -> Working
//iPad - 1024 -> Working

//Android
//Android 2.7 - 426.667 320 // Design Not Working
//Android 3.2 - 480, 320 // Design Not Working
//Android 4 - 534, 320
//Android 3.7 - 570, 320 // -> Working
//Android 4.65 (Galaxy) -> 592, 360 // -> Working
//Nexus 6 - 684, 412 -> Working
//Nexus 6P - 684, 412 -> Working
//Pixel XL - 775, 412 -> Working

/**
 * Decreases font size for small devices using 0.85 as a scaling factor
 * 12px is the minimum threshold that a font size can be reduced i.e. normalized font size cannot be < 12
 * @param fontSize
 */
export const fontSizeNormalizer = fontSize => {
  const smallerFontSize = Math.ceil(fontSize * 0.85);

  if (SMALL_DEVICES && smallerFontSize >= 12) return smallerFontSize;
  if (SMALL_DEVICES && smallerFontSize < 12) return 12;
  return fontSize;
};

export const ICON_SIZE = SMALL_DEVICES ? 80 : MEDIUM_LARGE_DEVICES ? 100 : 150;

export const GET_BG_IMAGE_WIDTH = () => {
  if (Platform.OS === 'android') {
    return SMALLER_IOS_DEVICE
      ? '61%'
      : SMALL_DEVICE
      ? '64%'
      : MEDIUM_DEVICE
      ? '64%'
      : LARGE_DEVICE
      ? '70%'
      : '70%';
  } else {
    return SMALLER_IOS_DEVICE
      ? '62%'
      : SMALL_DEVICE
      ? '62%'
      : MEDIUM_DEVICE
      ? '60%'
      : LARGE_DEVICE
      ? '71%'
      : '57%';
  }
};

export const GET_BG_IMAGE_HEIGHT = () => {
  if (Platform.OS === 'android') {
    return SMALLER_IOS_DEVICE
      ? '38%'
      : SMALL_DEVICE
      ? '40%'
      : MEDIUM_DEVICE
      ? '39%'
      : LARGE_DEVICE
      ? '38%'
      : '40%';
  } else {
    return SMALLER_IOS_DEVICE
      ? '35%'
      : SMALL_DEVICE
      ? '35%'
      : MEDIUM_DEVICE
      ? '34%'
      : LARGE_DEVICE
      ? '33%'
      : '43%';
  }
};

export const GET_GASTROGRAPH_HEIGHT = () => {
  if (Platform.OS === 'ios') {
    if (SMALLER_IOS_DEVICE) {
      return Dimensions.get('window').height / 2.4;
    } else if (SMALL_DEVICE) {
      return Dimensions.get('window').height / 2.2;
    } else if (MEDIUM_DEVICE) {
      return Dimensions.get('window').height / 2;
    } else if (LARGE_DEVICE) {
      return Dimensions.get('window').height / 2.2;
    } else if (LARGER_DEVICE) {
      return Dimensions.get('window').height / 1.8;
    } else {
      return Dimensions.get('window').height / 2;
    }
  } else if (Platform.OS === 'android') {
    if (DEVICE_HEIGHT < 545) {
      return Dimensions.get('window').height / 2.4;
    }
    if (SMALLER_IOS_DEVICE || SMALL_DEVICE) {
      return Dimensions.get('window').height / 2.2;
    } else if (MEDIUM_DEVICE) {
      return Dimensions.get('window').height / 2;
    } else if (LARGE_DEVICE) {
      return Dimensions.get('window').height / 2.1;
    } else if (LARGER_DEVICE) {
      return Dimensions.get('window').height / 1.8;
    } else {
      return Dimensions.get('window').height / 2;
    }
  }
};
