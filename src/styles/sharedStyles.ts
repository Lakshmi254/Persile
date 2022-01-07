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
  },
  sharedButtonTitle: {
    fontSize: Spacing.SCALE_14,
    textAlign: 'center',
    fontWeight: '500',
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});
