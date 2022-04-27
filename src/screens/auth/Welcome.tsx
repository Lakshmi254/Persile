import * as React from 'react';
import {View, SafeAreaView,Image,Alert,Platform} from 'react-native';
import { Button } from 'react-native-paper';
import { GOOGLE, WELCOME } from '../../constants/iconConstants';
import { SCREENS } from '../../constants/navigationConstants';
import { Colors } from '../../styles';
import { styles } from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import HomeNavigator  from '../../navigations/HomeNavigator';

// Import Google Signin
import {
  GoogleSignin,
  statusCodes,
} from 'react-native-google-signin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import { AuthContext } from '../../navigations/context';
import { getItem, setItem } from '../../utils/asyncStorage';

const Welcome = ({ navigation }: any) => {
  const IOS_CLIENT = '410231270996-rhuu5an1f7nqsp9d3t6971d64ofd0iuc.apps.googleusercontent.com';
  const ANDROID_CLIENT = '410231270996-c7mrngt4qgcn06vdqp67qf1i5bmn5h0l.apps.googleusercontent.com';
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(false);
  const { signIn } = React.useContext(AuthContext);

  
  //Show Alert
  const alert = (message: string | undefined) =>
    Alert.alert(
      "",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    const setDataToAsyncStorage = async (user_info) => {
     await setItem("Active_User",JSON.stringify(user_info));
    }
   

  //API Call to create user in the backend
  const _userSignupAPI = (info) => {
    setGettingLoginStatus(true)
    console.log("userInfo value", info.user);
    const userDeatils = info.user
    console.log(" config",userDeatils.email);
    if (userDeatils.email !== null) {
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_CREATEUSER}`,
      {
        firstName: userDeatils.givenName,
        lastName: userDeatils.familyName,
        email: userDeatils.email,
        phoneNumber: '',
        isNumberVerified: false,
        hasDriveAccess: true
      }).then(function (response) {
        setGettingLoginStatus(false)
        console.log("response data",response.data);
        const result = response.data;
        if (response.status === 200) {
          const resultData = result?.value
          const user_info = {gmail : info , activeUser : resultData}
          setDataToAsyncStorage(user_info)
          if (result.isNumberVerified === true) {
            const userToken = result?.token;
            signIn(userToken);
            setItem("Phone_Number",resultData?.phoneNumber);
            navigation.navigate(HomeNavigator);
          } else {
            const id = result.value.id
            navigation.navigate(SCREENS.LOGIN, id);
          }
        } else {
          alert(result.message);
        }
      })
      .catch(function (error) {
        console.log("response error", error);
        setGettingLoginStatus(false)
        alert("Please try again after sometime.");
      });
    }

  }

  //Google api to get user details
  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
      _userSignupAPI(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  //Google api to signin
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
      setGettingLoginStatus(false);
    }
    setGettingLoginStatus(false);
  };

  

  //Method called on view appear
  useEffect(() => {
    async function fetchMyPhoneNumber() {
      const phonenumber = await getItem("Phone_Number");
      console.log("phonenumber",phonenumber);
    }

    fetchMyPhoneNumber();

    var cliendId = ''
    if (Platform.OS === 'ios') {
      cliendId = IOS_CLIENT
    }else{
      cliendId = ANDROID_CLIENT

    }
    
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: cliendId,
    });
    // Check if user is already signed in
   // _isSignedIn();
  }, []);


//Google api to login when button clicked
  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
      _userSignupAPI(userInfo)
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

 
    return (
      <SafeAreaView style={styles.mainContainer}>
         <Spinner
          visible={gettingLoginStatus}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: '10%',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <View
            style={{
              marginTop: 100,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {/* <View style={{ width: '15%', height: 100 }}>
              <Image style={styles.image} source={WELCOME_1} />
            </View> */}
            <View style={{flex : 1 ,justifyContent: 'center', marginTop: 10, height: 100 }}>
              <Image style={{flex : 1,resizeMode : 'contain' ,alignSelf : 'center' ,}} source={WELCOME} />
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: '10%',
            marginTop: 30,
            justifyContent: 'center',
          }}>
          <Button onPress={_signIn}
            style={{
              borderColor: Colors.BLACK,
              borderBottomColor: Colors.BLACK,
              borderWidth: 1,
              borderRadius: 10,
              paddingVertical: 3,
              width: '100%'
             }}
            labelStyle={styles.lableText}
            uppercase={false}
            icon={({ size, color, direction }: any) => (
              <Image
                source={GOOGLE}
                style={[

                  {
                    width: 16,
                    height: 16,
                    //tintColor: color,
                  },
                ]}
              />
            )}>
            Continue with Google
          </Button>
        </View>
      </SafeAreaView>
    );
};

export default Welcome;


