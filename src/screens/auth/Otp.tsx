import * as React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';

import {PrimaryButton} from '../../components/Button';
import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';
import {SCREENS} from '../../constants/navigationConstants';
import {styles} from './styles';
import {useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';

const Otp = ({navigation}: any) => {
  const [Code, setCode] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const onInputChangeText = (text: any) => {
    setCode(text);
    if (text.toString().length === 4) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };
  const resendOtp = () => {};
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={CONTENT.ENTER_CODE} />
      <View style={[styles.container, {paddingHorizontal: '5%'}]}>
        <View style={[styles.subContainer, {paddingHorizontal: '10%'}]}>
          <Text style={styles.subText}>{CONTENT.ENTER_CODE1}</Text>
        </View>

        <OTPTextView
          handleTextChange={(e: any) => {
            onInputChangeText;
          }}
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.roundedTextInput}
          inputCount={6}
        />
        <View style={{marginTop: 50, paddingHorizontal: '10%'}}>
          <PrimaryButton
            onPress={() => navigation.navigate(SCREENS.NEW_FOLDER)}
            title={CONTENT.SUBMIT}
          />
        </View>
        <TouchableOpacity onPress={() => resendOtp}>
          <Text style={styles.resendCode}>{CONTENT.RESEND_CODE}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Otp;
