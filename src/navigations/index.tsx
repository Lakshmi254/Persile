import React, {useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from '../styles';
import AuthNavigator from './AuthNavigator';
import {
  userSessionActionTypes,
  userSessionSelectors,
} from '../store/userSession';
import {getItem, removeItem, setItem} from '../utils/asyncStorage';
import {AUTH_TOKEN} from '../constants/appConstants';
import {AuthContext} from './context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
  },
});

function MainStackNavigator() {
  const dispatch = useDispatch();

  const loginState = useSelector(userSessionSelectors.getUserLoginStatusState);
  console.log(loginState.isLoading);

  const authContext = useMemo(
    () => ({
      signIn: async (foundUser: any) => {
        const userToken = String(foundUser);
        try {
          await setItem(AUTH_TOKEN, userToken);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: userSessionActionTypes.LOGIN_STATUS,
          payload: {
            isLoading: false,
            userToken,
          },
        });
      },
      profileCompleteMethod: async (profileComplete: any, userType: string) => {
        const onboardingStatus = String(profileComplete);
        let userToken;
        userToken = null;
        try {
          userToken = await getItem(AUTH_TOKEN);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: userSessionActionTypes.LOGIN_STATUS,
          payload: {
            isLoading: false,
            userToken,
          },
        });
      },
      signOut: async () => {
        try {
          await removeItem(AUTH_TOKEN);
        } catch (e) {
          console.log(e);
        }
        dispatch({
          type: userSessionActionTypes.LOGIN_STATUS,
          payload: {
            isLoading: false,
            userToken: null,
          },
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const loadApp = async () => {
    let userToken;
    userToken = null;
    try {
      userToken = await getItem(AUTH_TOKEN);
    } catch (e) {
      console.log(e);
    }
    dispatch({
      type: userSessionActionTypes.LOGIN_STATUS,
      payload: {
        isLoading: false,
        userToken,
      },
    });
  };
  useEffect(() => {
    loadApp();
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
export default MainStackNavigator;
