import * as Typography from './typography';
import * as Colors from './colors';
import * as Spacing from './spacing';
import * as Mixins from './mixins';
import {StyleSheet} from 'react-native';

export const SharedStyles = StyleSheet.create({
  sharedButton: {
    height: Mixins.BUTTON_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    letterSpacing : 1
  },
  disabledButton: {
    height: Mixins.BUTTON_HEIGHT,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: Colors.GRAY_MEDIUM,
    letterSpacing : 1
  },
  sharedButtonTitle: {
    fontSize: Spacing.SCALE_14,
    textAlign: 'center',
    letterSpacing : 1,
    fontWeight: '500',
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
});
