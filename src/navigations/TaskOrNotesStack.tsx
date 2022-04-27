import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../constants/navigationConstants';
import MessageList from '../screens/auth/MessageList';
import TasksorNotes from '../screens/auth/TasksorNotes';
const Stack = createStackNavigator();


const TaskNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    
    <Stack.Screen name={SCREENS.TASKS_OR_NOTES} component={TasksorNotes} />
    <Stack.Screen name={SCREENS.MESSAGE_LIST} component={MessageList} />
  </Stack.Navigator>
);

export default TaskNavigator;
