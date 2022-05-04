import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../constants/navigationConstants';
import FolderList from '../screens/auth/FolderList';
import FolderListEmpty from '../screens/auth/FolderListEmpty';
import NewFolder from '../screens/auth/NewFolder';
import MessageList from '../screens/auth/MessageList';
import NotesList from '../screens/auth/NotesList';
import NotesDetail from '../screens/auth/Notesdetail';

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={SCREENS.FOLDER_LIST} component={FolderList}  />
    <Stack.Screen
      name={SCREENS.FOLDER_LIST_EMPTY}
      component={FolderListEmpty}
    />
    <Stack.Screen name={SCREENS.NEW_FOLDER} component={NewFolder} />
    <Stack.Screen name={SCREENS.NOTES_LIST} component={NotesList} />
    <Stack.Screen name={SCREENS.NOTES_DETAIL} component={NotesDetail} />
    <Stack.Screen name={SCREENS.MESSAGE_LIST} component={MessageList} />
  </Stack.Navigator>
);

export default HomeNavigator;
