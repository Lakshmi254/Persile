import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import {SCREENS} from '../constants/navigationConstants';
import Otp from '../screens/auth/Otp';
import FolderList from '../screens/auth/FolderList';
import FolderListEmpty from '../screens/auth/FolderListEmpty';
import NewFolder from '../screens/auth/NewFolder';

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
          <Stack.Screen name={SCREENS.OTP} component={Otp} />
    <Stack.Screen name={SCREENS.WELCOME} component={Welcome}  options={{gestureEnabled: false}} />
    <Stack.Screen name={SCREENS.LOGIN} component={Login} />
    {/* <Stack.Screen name={SCREENS.OTP} component={Otp} /> */}
    <Stack.Screen name={SCREENS.FOLDER_LIST} component={FolderList} />
    <Stack.Screen
      name={SCREENS.FOLDER_LIST_EMPTY}
      component={FolderListEmpty}
      options={{gestureEnabled: false}} 
    />
    <Stack.Screen name={SCREENS.NEW_FOLDER} component={NewFolder} />
  </Stack.Navigator>
);

export default AuthNavigator;
