import * as React from 'react';
import {Text, Image, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Typography, Colors, Spacing} from '../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {HOME, PROFILE} from '../constants/iconConstants';
import FolderList from '../screens/auth/FolderList';
import ProfileView from '../screens/ProfileView';
import HomeNavigator from './HomeNavigator';

const Tab = createBottomTabNavigator();
const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    marginBottom: 20,
  },
});

const tabsData = [
  {
    name: 'Home',
    component: HomeNavigator,
    title: 'Home',
    icon: HOME,
  },
  {
    name: 'Profile',
    component: ProfileView,
    title: 'Profile',
    icon: PROFILE,
  },
];

const TabsText = (props: any) => {
  const tabText = props;
  return (
    <Text
      numberOfLines={1}
      style={{
        fontSize: Spacing.SCALE_9,
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        color: tabText.focused ? Colors.PRIMARY : Colors.SECONDARY,
      }}>
      {tabText.title}
    </Text>
  );
};

const defaultScreen = () => <View style={{height: 0}} />;
/* eslint-disable react/prop-types */
const TabStack: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('');

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        tabStyle: {
          width: 100,
        },
        style: {
          elevation: 5,
          height: 60,
          padding: 13,
          paddingBottom: 7,
        },
      }}>
      {tabsData.map((item: any, i: any) => (
        <Tab.Screen
          name={item.name}
          component={item.component}
          options={{
            tabBarBadgeStyle: {
              backgroundColor: Colors.PRIMARY,
              color: Colors.WHITE,
            },
            tabBarLabel: ({focused}) => (
              <TabsText title={item.title} focused={focused} />
            ),
            // tabBarIcon: ({focused}) => (
            //   <View
            //     style={{
            //       paddingHorizontal: 10,
            //       borderTopColor: focused ? Colors.PRIMARY : Colors.WHITE,
            //       borderTopWidth: focused ? 1.5 : 0,
            //       paddingTop: 10,
            //     }}>
            //     <Image
            //       style={[
            //         styles.image,
            //         focused ? {transform: [{translateY: -5}]} : null,
            //       ]}
            //       source={item.icon}
            //     />
            //   </View>
            // ),
            tabBarIcon: ({color, size}) =>
              item.title === 'Home' ? (
                <FontAwesome5
                  name={'home'}
                  color={'black'}
                  size={size}
                />
              ) : (
                <FontAwesome5 name={'user'} color={'black'} size={size} />
              ),
            unmountOnBlur: true,
          }}
          key={i}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabStack;
