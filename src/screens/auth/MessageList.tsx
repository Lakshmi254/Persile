import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import {View, Text, SafeAreaView, Image, FlatList, Alert, BackHandler} from 'react-native';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';
import { backArrow } from '../../constants/iconConstants';

import {styles} from './styles';

const MessageList = ({navigation , route}: any) => {
    const [spinner, showspinner] = useState(false);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const { paramKey } = route.params;
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const data = [
        { label: 'Task', value: '1' },
        { label: 'Notes', value: '2' },
      ];

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
      "folder_name" :paramKey
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
  const assignMessageAPI = () => {
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_ASSIGNMESSAGETYPE}`,
    {
      "id": 'id',
      "type" :paramKey
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

            console.log("navigation values ",paramKey)

          fetchAllMessagesAPI()
            // Update the document title using the browser API
            const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            return () => null
          }, []);

  const renderItem = ({item}: any) => {
    return (
      <View style={{flex:1 , height : 60 , justifyContent : 'space-around' , flexDirection : 'row'}}>
        <View style={{alignSelf : 'center' , width : "60%"}}>
        <Text style={[styles.subText, {textAlign: 'justify'}]}>
          {item?.message}
        </Text>
        </View>
        <View style={{alignSelf : 'center' , alignItems : 'center'}}>
            <TouchableOpacity onPress={() => assignMessageAPI(item.id)} style={{padding : 5 , backgroundColor : 'black' , borderRadius : 5}}>
                <Text style={{color : 'white'}}>Assign</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={paramKey} icon={backArrow} />
      <FlatList
        data={masterDataSource}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "black", height: 1 }} />
          )}
      />
    </SafeAreaView>
  );
};

export default MessageList;
