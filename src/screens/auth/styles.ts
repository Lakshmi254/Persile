import {StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.WHITE
    },
  spinnerTextStyle: {
    color: '#000000'
  },
  activitycontainer: {
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',       
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
    letterSpacing : 0.5,
    textAlign: 'justify'
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
    fontFamily : Typography.FONT_FAMILY_BOLD,
    fontWeight: '600',
    fontSize: Spacing.SCALE_18,
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
    borderWidth: 1
  },
  textInputContainer: {
    marginBottom: 20
  },

  //messages list
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'Black',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color : 'white'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
