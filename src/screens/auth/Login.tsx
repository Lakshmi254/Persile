import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import AppTextInput from '../../components/AppTextInput';
import {PrimaryButton} from '../../components/Button';
import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';
import {SCREENS} from '../../constants/navigationConstants';
import {Colors, Spacing} from '../../styles';
import {styles} from './styles';

const Login = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [userIdErrorMsg, setUserIdErrorMsg] = React.useState(null as any);
  const userIdChange = (text: string) => {
    setPhoneNumber(text);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
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
          maxLength={50}
        />
        <View style={{marginTop: 60}}>
          <PrimaryButton
            onPress={() => navigation.navigate(SCREENS.OTP)}
            title={CONTENT.SUBMIT}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
