import * as React from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  SafeAreaView,
  Alert,
  BackHandler,
} from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import {PrimaryButton} from '../../components/Button';
import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';
import {SCREENS} from '../../constants/navigationConstants';
import {styles} from './styles';
import Config from "react-native-config";
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { useEffect, useState } from 'react';

const Login = ({navigation , route}: any) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [userIdErrorMsg, setUserIdErrorMsg] = React.useState(null as any);
  const [text, setText] = React.useState('');
  const [spinner, showspinner] = React.useState(false);
  const [id, setId] = useState('');

  const userIdChange = (text: string) => {
    if (text) {
      let formatedNo = formatMobileNumber(text);
      setPhoneNumber(formatedNo);
      setUserIdErrorMsg(null)
    }else{
      setPhoneNumber('')
    }
  };

   //Show Alert
   const alert = (message: string | undefined) =>
   Alert.alert(
     "",
     message,
     [
       { text: "OK", onPress: () => console.log("OK Pressed") }
     ]
   );

  const apiCallToSendOTP = () => {
    showspinner(true)
    console.log("mobile number",phoneNumber);
    console.log(`${Config.API_BASE_URL}${Config.API_ENDPOINT_SENDOTP}`)
    const numertoPaa = phoneNumber.replace(/[( -)]/g,'');
    const numertoPaa1 = numertoPaa.replace(/[-)]/g,'');
    var phoneNumberCode = ""
    if (Config.COUNTRY_CODE === "US") {
       phoneNumberCode = "+1"+numertoPaa1
    } else {
       phoneNumberCode = "+91"+numertoPaa1
    }
    console.log("code and phone", phoneNumberCode );

    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_SENDOTP}`,
      {
        "mobile_number": phoneNumberCode
      }).then(function (response) {
        showspinner(false)
        console.log("response object", response);
        console.log("response data", response.data);
        const result = response.data;
        if (response.status === 200) {
          if (result.status === false) {
            alert(result.message);
          }else{
            navigation.navigate(SCREENS.OTP,{phone: phoneNumber , id : id})
            
          }
        } else {
          showspinner(false)
          alert(result.message);
        }
      })
      .catch(function (error) {
        showspinner(false)
        console.log("response error", error);
      });
  }
  const handleBackButton = () => {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
 }
 
  useEffect(() => {
    // Update the document title using the browser API
    setId(route.params)
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => null
  }, []);

  const onSubmitPhone = () => {
    if (phoneNumber.length <= 0) {
      setUserIdErrorMsg('Please enter Phone Number.');
    }else if(phoneNumber.length < 14){
      setUserIdErrorMsg('Please enter valid Phone Number.');
    }else{
      //Call API to send otp
      apiCallToSendOTP()
    }
  }

  const formatMobileNumber=(text:string)=> {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  }
 
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.mainContainer}>
    <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <Header title={CONTENT.PHONE_NUMBER} />
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.subText}>{CONTENT.PHONE_NUMBER1}</Text>
        </View>
       <AppTextInput
          value={phoneNumber}
          label={CONTENT.PHONE_NUMBER.toUpperCase()}
          onChange={(text: any) => userIdChange(text)}
          ErrorMsg={userIdErrorMsg}
          keyboardType="number-pad"
          maxLength={14}
        />
        <View style={{marginTop: 60}}>
          <PrimaryButton
            onPress={() => onSubmitPhone()}
            title={CONTENT.SUBMIT}
          />
        </View>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
  
};

export default Login;
