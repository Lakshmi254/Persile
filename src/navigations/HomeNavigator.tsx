import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../constants/navigationConstants';
import FolderList from '../screens/auth/FolderList';
import FolderListEmpty from '../screens/auth/FolderListEmpty';
import NewFolder from '../screens/auth/NewFolder';
import MessageList from '../screens/auth/MessageList';


const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={SCREENS.FOLDER_LIST} component={FolderList} options={{gestureEnabled: false}} />
    <Stack.Screen
      name={SCREENS.FOLDER_LIST_EMPTY}
      component={FolderListEmpty}
      options={{gestureEnabled: false}} 
    />
    <Stack.Screen name={SCREENS.MESSAGE_LIST} component={MessageList} />
    <Stack.Screen name={SCREENS.NEW_FOLDER} component={NewFolder} />
  </Stack.Navigator>
);

export default HomeNavigator;
