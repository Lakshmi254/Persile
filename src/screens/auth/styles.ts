import {StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  container: {
    flex: 1,
    paddingHorizontal: '10%',
  },
  container1: {
    flex: 1,
    paddingHorizontal: '5%',
    marginTop: 20,
  },
  subText: {
    fontSize: Spacing.SCALE_14,
    fontWeight: '400',
    color: Colors.BLACK,
  },
  subContainer: {
    marginTop: '35%',
    marginBottom: 50,
  },
  resendCode: {
    fontSize: Spacing.SCALE_14,
    fontWeight: '400',
    textAlign: 'center',
    color: Colors.BLACK,
    marginTop: 50,
  },
  otpContainer: {
    marginHorizontal: 0,
  },
  otpText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    color: Colors.SECONDARY,
    fontSize: Spacing.SCALE_18,
  },
  lableText: {
    fontSize: Spacing.SCALE_16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  //Folder Styles
  containerFolder: {
    alignItems: 'center',
    paddingHorizontal: '10%',
    marginTop: 20,
  },
  imageView: {
    width: '20%',
    alignSelf: 'center',
    height: 100,
  },
  nothingText: {
    marginBottom: 30,
    textAlign: 'center',
  },
  folderBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  folderBottomLeft: {
    width: '20%',
    alignSelf: 'center',
    height: 100,
  },
  folderBottomRight: {
    width: '20%',
    marginTop: 20,
    height: 50,
  },

  //otp

  roundedTextInput: {
    borderRadius: 10,
    borderWidth: 2,
  },
  textInputContainer: {
    marginBottom: 20,
  },
});
