import React, { useState, useEffect, useRef } from 'react';
import {View, Text, SafeAreaView, TouchableOpacity , Alert ,TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator} from 'react-native';
import {PrimaryButton} from '../../components/Button';
import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';
import {SCREENS} from '../../constants/navigationConstants';
import {styles} from './styles';
import OTPTextView from 'react-native-otp-textinput';
import Config from "react-native-config";
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';


const Otp = ({navigation , route}: any) => {
  const [Code, setCode] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [spinner, showspinner] = React.useState(false);
  const [id, setId] = useState('');


  const onInputChangeText = (text: string) => {
    setCode(text);
    if (text.length === 6) {
      setBtnDisable(false);
      //apiCallToVerifyOtp()
    } else {
      setBtnDisable(true);
    }
  };

  useEffect(() => {
    // Update the document title using the browser API
    console.log("route.params",route.params);
   // setPhoneNumber(route.params.phone)
   // setId(route.params.id)
  });

   //Show Alert
   const alert = (message: string | undefined) =>
   Alert.alert(
     "",
     message,
     [
       { text: "OK", onPress: () => console.log("OK Pressed") }
     ]
   );

  const apiCallToVerifyOtp = () => {
    showspinner(true)
    console.log("mobile number",phoneNumber);
    console.log(`${Config.API_BASE_URL}${Config.API_ENDPOINT_VERIFYOTP}`)
    //const phoneNumberIST = "+1"+phoneNumber
    const numertoPaa = phoneNumber.replace(/[( -)]/g,'');
    const numertoPaa1 = numertoPaa.replace(/[-)]/g,'');
    const phoneNumberIST = "+91"+numertoPaa1
   //const phoneNumberIST = "+1"+numertoPaa1
    console.log("code and phone", phoneNumberIST , Code , id);
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_VERIFYOTP}`,
      {
        "mobile_number": phoneNumberIST,
        "otp":Code,
        "id":id
      }).then(function (response) {
        showspinner(false)
        console.log("response object", response);
        console.log("response data", response.data);
        const result = response.data;
        if (response.status === 200) {
          showspinner(false)
          if (result.status === false) {
            alert(result.message);
          }else{
            navigation.navigate(SCREENS.FOLDER_LIST_EMPTY)
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

  const apiCallToReSendOTP = () => {
    showspinner(true)
    console.log(`${Config.API_BASE_URL}${Config.API_ENDPOINT_SENDOTP}`)
    const numertoPaa = phoneNumber.replace(/[( -)]/g,'');
    //const phoneNumberCode = "+1"+numertoPaa
    const phoneNumberCode = "+91"+numertoPaa
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_SENDOTP}`,
      {
        "mobile_number": phoneNumberCode
      }).then(function (response) {
        showspinner(false)
        console.log("response object", response);
        console.log("response data", response.data);
        const result = response.data;
        if (response.status === 200) {
          alert(result.message);
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

  const resendOtp = () => {
    apiCallToReSendOTP()
  };

  const onsubmitOtp = () => {
    apiCallToVerifyOtp();
  };
  // if (spinner) {
  //   return (
  //     <View style={styles.activitycontainer}>
  //       <ActivityIndicator size="large" color="#000000" />
  //     </View>
  //   );
  // } else {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <SafeAreaView style={styles.mainContainer}>
      <Header title={CONTENT.ENTER_CODE} />
      <View style={[styles.container, {paddingHorizontal: '5%'}]}>
      <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        <View style={[styles.subContainer, {paddingHorizontal: '10%'}]}>
          <Text style={styles.subText}>{CONTENT.ENTER_CODE1}{phoneNumber}</Text>
        </View>

      <View style={{alignItems:'center' , width:"100%"}}>
        <OTPTextView
          handleTextChange={(e: any) => {
            onInputChangeText(e)
          }}
          //ref={e => (otpInput = e)}
          tintColor="#000000"
          offTintColor="#000000"
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
        />
        </View>
        <View style={{marginTop: 50, paddingHorizontal: '10%'}}>
          <PrimaryButton
            onPress={() => onsubmitOtp()}
            title={CONTENT.SUBMIT}
            disable={btnDisable}
          />
        </View>
        <TouchableOpacity onPress={() => resendOtp()}>
          <Text style={styles.resendCode}>{CONTENT.RESEND_CODE}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
  //}
};

export default Otp;
