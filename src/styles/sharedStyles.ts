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
    fontSize: Spacing.SCALE_16,
    textAlign: 'center',
    letterSpacing : 1,
    fontWeight: '500',
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_MEDIUM,
  },
  InactiveSegmentButton:{
    backgroundColor: 'white',
    padding: 18,
    height: 60,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 5,
    borderWidth : 2,
    borderColor : Colors.PRIMARY
  },
  ActiveSegmentButton:{
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    height: 60,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 5,
    borderWidth : 2,
    borderColor : Colors.PRIMARY
  }
});
