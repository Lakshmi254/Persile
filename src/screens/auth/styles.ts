import {StyleSheet} from 'react-native';
import {Colors, Spacing, Typography} from '../../styles';

export const styles = StyleSheet.create({
  //modal view styles
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  input: {
    height: 40,
  },
  modalView: {
    //margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
   // padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: Colors.PRIMARY,
  },
  textStyle: {
    color: Colors.WHITE,
    fontFamily : Typography.FONT_FAMILY_BOLD,
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily : Typography.FONT_FAMILY_REGULAR,
    fontSize : 16
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    color : Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_BOLD
  },
  primaryButton:{
    width: "80",
    fontSize : 16
  },
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
    padding : "5%"
  },
  container1: {
    flex: 1,
    paddingHorizontal: '5%',
    marginTop: 20,
  },
  subText: {
    fontSize: Spacing.SCALE_16,
    fontWeight: '400',
    color: Colors.BLACK,
    //letterSpacing : 0.5,
    textAlign: 'justify',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  assignText:{
    fontSize: Spacing.SCALE_14,
    color: Colors.BLACK,
    //letterSpacing : 0.5,
    textAlign: 'justify',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
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
  pencilicon: {
    //backgroundColor: 'black',
    //marginLeft:"30%",
    position: 'absolute',
    color: 'black',
    bottom: 0,
    left: 0
   },

  label: {
    alignSelf: 'flex-start',
    margin: 8,
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Typography.FONT_FAMILY_REGULAR,

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

  moreListText: {
    textAlign: "center",
    color: "black",
    padding: 5,
    fontSize: 16,
  },
  morecontainer: {
    position: "absolute",
    zIndex: 999,
    right: 8,
    padding: 10,
    top: 30,
    backgroundColor: "#B0EBE7",
    elevation: 10,
    borderRadius: 7,
    shadowColor: Colors.TERTIARY,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  morecontainerIOS : {
    position: "absolute",
    zIndex: 999,
    right: 8,
    padding: 10,
    top: 40,
    backgroundColor: "#B0EBE7",
    elevation: 10,
    borderRadius: 7,
    shadowColor: Colors.TERTIARY,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  verticalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  //notesDeatails
  checkboxContainer: {
    height : 30,
    width: 30,
    flexDirection: "row",
    marginBottom: 10,
    marginLeft : 10
  },
  checkbox: {
    alignSelf: "center",
    color : '#97CAC7'
  },
  markLabel:{
    fontFamily : Typography.FONT_FAMILY_REGULAR,
    fontSize : 14,
    color : 'black',
    padding: 5,
    marginLeft : 10

  },
  fabButton : {
    width: 200,  
    height: 60,   
    borderRadius: 30,            
    backgroundColor: '#97CAC7',                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10,
    color:'black',
    textAlign:'center',
    alignItems: 'center',
    paddingTop : 10
  },

  //notesDeatail screen 
  messageText:{
    color:'black',
    fontSize : 14,
    fontFamily : Typography.FONT_FAMILY_MEDIUM
  },

  /* profile view */
  Profilecontainer:{
    flex : 1,
    justifyContent : 'center'
  },
 
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:40
  },
  editicon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0
   },

  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  imageContainerView:{
    justifyContent : 'center',
    alignItems : 'center',
    marginTop : 40
  },
  bodyContent: {
    padding:30,
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});
