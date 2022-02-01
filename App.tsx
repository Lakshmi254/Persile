import React from 'react';
import {Provider as StoreProvider} from 'react-redux';

import {LogBox, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MainStackNavigator from './src';
import {Colors} from './src/styles';
import store from './src/store/store';
import SplashScreen from  "react-native-splash-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App = () => {

   //Hide Splash screen on app load.
   React.useEffect(() => {
    SplashScreen.hide();
  });
  // Ignore log notification by message
  LogBox.ignoreLogs(['Warning: ...']);
  // Ignore all log notifications
  LogBox.ignoreAllLogs();

  return (
    <StoreProvider store={store}>
      <SafeAreaView
        style={styles.container}
        edges={['right', 'bottom', 'left']}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.PRIMARY} />
        <MainStackNavigator />
      </SafeAreaView>
    </StoreProvider>
  );
};

export default App;
