import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import {SCREENS} from '../constants/navigationConstants';
import Otp from '../screens/auth/Otp';
import ProfileView from '../screens/auth/ProfileView';
const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={SCREENS.WELCOME} component={Welcome}  options={{gestureEnabled: false}} />
    <Stack.Screen name={SCREENS.LOGIN} component={Login} options={{gestureEnabled: false}} />
    <Stack.Screen name={SCREENS.OTP} component={Otp} options={{gestureEnabled: true}}/>
    <Stack.Screen name={SCREENS.PROFILE_VIEW} component={ProfileView} />
  </Stack.Navigator>
);

export default AuthNavigator;
