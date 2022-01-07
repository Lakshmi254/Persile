import {Dimensions, PixelRatio, Platform} from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';
const guidelineBaseWidth = 375;

export const scaleSize = (size: any) =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const BUTTON_HEIGHT = 50;

export const scaleFont = (size: any) => size * PixelRatio.getFontScale();
