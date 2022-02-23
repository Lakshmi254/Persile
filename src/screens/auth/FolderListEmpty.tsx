import * as React from 'react';
import {View, ScrollView ,Text, SafeAreaView, Image, BackHandler, Platform, PermissionsAndroid} from 'react-native';

import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';
import {HASH_TAG, PERSILE_FOLDER, PHONE} from '../../constants/iconConstants';
import {styles} from './styles';
import SmsAndroid from 'react-native-get-sms-android'; 
import { useState } from 'react';
import { SCREENS } from '../../constants/navigationConstants';

const FolderListEmpty = ({navigation}: any) => {

  const [ folderCount , setfolderCount] = useState(0);


  const checkPermissions = async () => {
    console.log("checking SMS permissions");
    let hasPermissions = false;
    try {
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS
      );
      if (!hasPermissions) return false;
      hasPermissions = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.SEND_SMS
      );
      if (!hasPermissions) return false;
    } catch (e) {
      console.error(e);
    }
    return hasPermissions;
  }

  const requestPermissions = async () => {
    let granted = {};
    try {
      console.log("requesting SMS permissions");
      granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.SEND_SMS
        ],
        {
          title: "Example App SMS Features",
          message: "Example SMS App needs access to demonstrate SMS features"
          //buttonNeutral: "Ask Me Later",
          //buttonNegative: "Cancel",
         // buttonPositive: "OK"
        }
      );
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use SMS features");
      } else {
        console.log("SMS permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }


  React.useEffect(() => {
    /*
    async function fetchMyAPI() {
    if (Platform.OS === "android") {
      try {
        if (!(await checkPermissions())) {
          await requestPermissions();
        }

        if (await checkPermissions()) {
          Readsms_list();
        }
      } catch (e) {
        console.error(e);
      }
    }else{

      if (folderCount === 0) {
        navigation.navigate(SCREENS.FOLDER_LIST)
      } 
    }
  }
  fetchMyAPI()
  */
    // Update the document title using the browser API
    const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => null
  }, []);

const handleBackButton = () => {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
}

const Readsms_list = async () => {
  var filter = {
    box: 'inbox',
  };
  SmsAndroid.list(
    JSON.stringify(filter),
    (fail) => {
      console.log('Failed with this error: ' + fail);
    },
    (count, smsList) => {
      console.log('Count: ', count);
      console.log('List: ', smsList);
      var arr = JSON.parse(smsList);

      arr.forEach(function (object) {
    // 'Object: ' +
    console.log(object);
    // console.log('-->' + object.date);
    // console.log('-->' + object.body);
  });
},);};

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={CONTENT.PERSILE} />
      <ScrollView>
      <View style={styles.containerFolder}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={HASH_TAG} />
        </View>
        <Text style={[styles.subText, styles.nothingText]}>
          {/* { {CONTENT.NOTHING_HERE} } */}
        </Text>
        <Text style={styles.subText}>{CONTENT.NOTHING_HERE_CONTENT}</Text>
      </View>
      <View style={styles.folderBottom}>
        <View>
          <View style={styles.folderBottomLeft}>
            <Image style={styles.image} source={PHONE} />
          </View>
          <Text style={styles.subText}>#{CONTENT.PHOTO_OUR_VACATION}</Text>
        </View>
        <View>
          <View style={styles.folderBottomRight}>
            <Image style={styles.image} source={PERSILE_FOLDER} />
          </View>
          <Text style={styles.subText}>#{CONTENT.PHOTO}</Text>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FolderListEmpty;
