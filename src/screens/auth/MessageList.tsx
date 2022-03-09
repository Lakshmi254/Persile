import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import {View, Text, SafeAreaView, Image, FlatList, Alert, BackHandler} from 'react-native';
import Config from 'react-native-config';
import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';

import {styles} from './styles';

const MessageList = ({navigation}: any) => {
    const [spinner, showspinner] = useState(false);
    const [masterDataSource, setMasterDataSource] = useState([]);


    //Show Alert
 const alert = (message: string | undefined) =>
 Alert.alert(
   "",
   message,
   [
     { text: "OK", onPress: () => console.log("OK Pressed") }
   ]
 );

  const fetchAllMessagesAPI = () => {
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_GETALLMESSAGES}`,
    {
      "from": '+16467410822',
      "folder_name" :"#breakfast"
    }).then(function (response) {
      showspinner(false)
      console.log("response object", response );
      console.log("response data", response.data );
      const result = response.data;
      if (response.status === 200) {
          setMasterDataSource(result.value);
      } else {
        alert(result.message);
      }
    })
    .catch(function (error) {
      showspinner(false)
      console.log("response error", error);
    });
  }


    const handleBackButton = () => {
        //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
      }
      
        React.useEffect(() => {
          fetchAllMessagesAPI()
            // Update the document title using the browser API
            const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () => null
          }, []);

  const renderItem = ({item}: any) => {
    return (
      <View>
        <Text style={[styles.subText, {textAlign: 'center'}]}>
          {item?.name}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={CONTENT.BREAK_FAST} />
      <FlatList
        data={masterDataSource}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default MessageList;
