import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import {Button} from 'react-native-paper';
import {PrimaryButton} from '../../components/Button';
import {CONTENT} from '../../constants/content';
import {GOOGLE, WELCOME, WELCOME_1} from '../../constants/iconConstants';
import {SCREENS} from '../../constants/navigationConstants';
import {Colors} from '../../styles';
import {styles} from './styles';

// Import Google Signin
import {
  GoogleSignin,
  statusCodes,
} from 'react-native-google-signin';
import { useEffect, useState } from 'react';

const Welcome = ({navigation}: any) => {
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  //Showa Alert
  const alert = (message: string | undefined) =>
  Alert.alert(
    "",
    message,
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
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

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '410231270996-rhuu5an1f7nqsp9d3t6971d64ofd0iuc.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    _isSignedIn();
  }, []);

  

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
  
  if (gettingLoginStatus) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREENS.LOGIN)}
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
          <View style={{width: '15%', height: 100}}>
            <Image style={styles.image} source={WELCOME_1} />
          </View>
          <View style={{width: '60%', marginTop: 10, height: 100}}>
            <Image style={styles.image} source={WELCOME} />
          </View>
        </View>
      </TouchableOpacity>
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
            width: '100%',
          }}
          labelStyle={styles.lableText}
          uppercase={false}
          icon={({size, color, direction}: any) => (
            <Image
              source={GOOGLE}
              style={[
               
                {
                  width: size,
                  height: size,
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
            }
};

export default Welcome;
function alert(message: any) {
  throw new Error('Function not implemented.');
}

