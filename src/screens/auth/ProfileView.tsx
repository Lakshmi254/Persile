import * as React from 'react';
import { View, TouchableOpacity, SafeAreaView, Image, BackHandler, Alert, Platform, PermissionsAndroid, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../components/Header';
import { backArrow, PERSILE_FOLDER, userImage } from '../../constants/iconConstants';
import { styles } from '../auth/styles';
import AppTextInput from '../../components/AppTextInput';
import { CONTENT } from '../../constants/content';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/Button';
import { getItem } from '../../utils/asyncStorage';
import Spinner from 'react-native-loading-spinner-overlay';
import ActionSheet from 'react-native-action-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Config } from 'react-native-config';
import axios from 'axios';
import { AuthContext } from '../../navigations/context';
import HomeNavigator from '../../navigations/HomeNavigator';
import { useIsFocused } from '@react-navigation/native';

const ProfileView = ({ navigation , route }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastNmae, setLastName] = useState('');
  const [phoneNumber, setPhneNumber] = useState('');
  const [emailID, setEmailID] = useState('');
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(null as any);
  const [lastNameErrorMsg, setULastNameErrorMsg] = useState(null as any);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null as any);
  const [phoneErrorMsg, setPhoneErrorMsg] = useState(null as any);
  const [btnDisable, setSaveBtn] = useState(false);
  const [userInfo, setUserInfo] = useState('');
  const [filePath, setFilePath] = useState({});
  const [spinner, showspinner] = React.useState(false);
  const [activeUserId, setActiveUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const { signIn } = React.useContext(AuthContext);
  const isFocused = useIsFocused();
  const [visible, setVisible] = useState(false);
  const { signOut } = React.useContext(AuthContext);

  var options = [
    'Camera',
    'Gallery',
    'Cancel'
  ];
  var DESTRUCTIVE_INDEX = 2;
  var CANCEL_INDEX = 4;

  const actionCall = () => {
    signIn(userToken); 
    //navigation.navigate(HomeNavigator); 
  }

  //Show Alert
  const alert = (message: string | undefined , Action : boolean) => {
    Alert.alert(
      "",
      message,
      [
        { text: "OK", onPress: () => Action === true && actionCall()  }
      ]
    );
  }
  /* permissions */
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert(err,false);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);
        if (response.didCancel) {
          alert('User cancelled camera picker',false);
          return;
        } else if (response.errorCode == 'camera_unavailable',false) {
          alert('Camera not available on device',false);
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied',false);
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage,false);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        if (Platform.OS === 'ios') {
          const assets = response.assets[0]
          setFilePath(assets.uri)
        }else{
          setFilePath(response.uri);
        }      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        alert('User cancelled camera picker',false);
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device',false);
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied',false);
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage,false);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      if (Platform.OS === 'ios') {
        const assets = response.assets[0]
        setFilePath(assets.uri)
      }else{
        setFilePath(response.uri);
      }
    });
  };

  const firstNameChange = (text: string) => {
    if (text) {
      setFirstName(text);
      setFirstNameErrorMsg(null)
    } else {
      setFirstName('')
    }
  };

  const lastNameChange = (text: string) => {
    if (text) {
      setLastName(text);
      setULastNameErrorMsg(null)
    } else {
      setLastName('')
    }
  };

  const phoneNumberChange = (text: string) => {
    if (text) {
      setPhneNumber(text);
      setPhoneErrorMsg(null)
    } else {
      setPhneNumber('')
    }
  };

  const emaiIdChange = (text: string) => {
    if (text) {
      setEmailID(text);
      setEmailErrorMsg(null)
    } else {
      setEmailID('')
    }
  };

  const updateUserProfileDetails = () => {
    showspinner(true)
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_CREATEPROFILE}`,
      {
        "id" : activeUserId,
	      "firstName" : firstName,
	      "lastName": lastNmae,
	      "email" : emailID,
	      "phoneNumber":phoneNumber,
	      "image": filePath
      }).then(function (response) {
        showspinner(false)
        console.log("response object", response);
        console.log("response data", response.data);
        const result = response.data;
        if (response.status === 200) {
          if (result.status === false) {
            alert(result.message,false);
          } else {
            alert("Profile Updated Successfully",true);
            //getuserDetailsByPhone(phoneNumber)
          }
        } else {
          showspinner(false)
          alert(result.message,false);
        }
      })
      .catch(function (error) {
        showspinner(false)
        console.log("response error", error);
        alert("Please try again after sometime.",false);
      });
  }

  const showActionSheet = () => {
    ActionSheet.showActionSheetWithOptions({
      options: options,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: '#24a0ed'
    },
      (buttonIndex) => {
        console.log('button clicked :', buttonIndex);
        if (buttonIndex === 0) {
          captureImage('photo')
        } else if (buttonIndex === 1) {
          chooseFile('photo')
        }
      });
  }
  const onsaveDeatils = () => {
    if (firstName.length <= 0) {
      setFirstNameErrorMsg('Please enter First name.');
    } else if (lastNmae.length <= 0) {
      setULastNameErrorMsg('Please enter Last name.');
    } else if (phoneNumber.length <= 0) {
      setPhoneErrorMsg('Please enter valid Phone number.');
    } else if (emailID.length <= 0) {
      setEmailErrorMsg('Please enter valid Email address.');
    } else {
      //call Api to update profile details
     updateUserProfileDetails()

    }

  };

  const getuserDetailsByPhone = (phone: any) => {
    showspinner(true)
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_GETUSERBYPHONE}`,
      {
        "phoneNumber": phone
      }).then(function (response) {
        showspinner(false)
        console.log("response object", response);
        console.log("response data", response.data);
        const result = response.data;
        if (response.status === 200) {
          if (result.status === false) {
            alert(result.message,false);
          } else {
            console.log("result", result);
            const firstname = result.value[0].firstName
            const lastname = result.value[0].lastName
            const email = result.value[0].email
            const phoneNumber = result.value[0].phoneNumber
            setFirstName(firstname)
            setLastName(lastname)
            setPhneNumber(phoneNumber)
            setEmailID(email)
            if (result.value[0].image !== '') {
              setFilePath(result.value[0].image)
            }
          }
        } else {
          showspinner(false)
          alert(result.message,false);
        }
      })
      .catch(function (error) {
        showspinner(false)
        console.log("response error", error);
        alert("Please try again after sometime.",false);
      });
  }


  const handleBackButton = () => {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  const setUserDataOnFromLocal = (gmail_details : any , phone_Number : any) => {
    setFirstName(gmail_details.user.givenName)
    setLastName(gmail_details.user.familyName)
    setEmailID(gmail_details.user.email)
    setPhneNumber(phone_Number)
  }
  const showMoreoptions = () => {
    setVisible(true);
  };

  useEffect(() => {
    async function fetchuserInfo() {
      if(isFocused){ 

      const userInfo = await getItem("Active_User");
      const phone_Number = await getItem("Phone_Number");
      setUserInfo(userInfo)
      const userDetails = JSON.parse(userInfo)
      const active_user = userDetails.activeUser
      const gmail_details = userDetails.gmail
      setFilePath(gmail_details.user.photo)
      setActiveUserId(active_user.id)
      setUserToken(active_user.id)
      setUserDataOnFromLocal(gmail_details , phone_Number)
      /* API Call to fetch Active user Data*/
      getuserDetailsByPhone(phone_Number);
      }
      }

    fetchuserInfo()
    // Update the document title using the browser API
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => null
  }, [isFocused]);
  const logout = () => {
    console.log('userfiles;isttttttt');
    signOut();
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <Header
      title="Profile" 
      more
      shoeMoreoptions={showMoreoptions}
       />
      {visible && (
        <View style={Platform.OS === 'ios' ? styles.morecontainerIOS : styles.morecontainer} ref={menuRef}>
          <Text style={styles.moreListText}>Settings</Text>
          <View style={styles.verticalLine} />
          <TouchableOpacity style={{ marginTop: 10 }} onPress={logout}>
            <Text style={styles.moreListText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.Profilecontainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: Object.keys(filePath).length == 0 ? 'https://bootdey.com/img/Content/avatar/avatar6.png' : filePath  }}
            style={{
              width: 150, height: 150, borderRadius: 75
            }}
          />
          <TouchableOpacity style={{ marginTop: 0, marginLeft: "15%" }} onPress={showActionSheet}>
            <Icon name={'camera'} size={30} style={styles.pencilicon} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContent}>
          <AppTextInput
            value={firstName}
            label={CONTENT.FIRST_NAME.toUpperCase()}
            onChange={(text: any) => firstNameChange(text)}
            ErrorMsg={firstNameErrorMsg}
            keyboardType="default"
            maxLength={14}
          />
          <AppTextInput
            value={lastNmae}
            label={CONTENT.LAST_NAME.toUpperCase()}
            onChange={(text: any) => lastNameChange(text)}
            ErrorMsg={lastNameErrorMsg}
            keyboardType="default"
            maxLength={14}
          />
          <AppTextInput
            value={phoneNumber}
            label={CONTENT.PHONE_NUMBER.toUpperCase()}
            onChange={(text: any) => phoneNumberChange(text)}
            ErrorMsg={phoneErrorMsg}
            keyboardType="number-pad"
            maxLength={14}
            disable={true}
          />
          <AppTextInput
            value={emailID}
            label={CONTENT.EMAIL.toUpperCase()}
            onChange={(text: any) => emaiIdChange(text)}
            ErrorMsg={emailErrorMsg}
            keyboardType="email-address"
            maxLength={14}
            disable={true}
          />
          <PrimaryButton
            onPress={() => onsaveDeatils()}
            title="Save"
            disable={btnDisable}
          />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileView;
