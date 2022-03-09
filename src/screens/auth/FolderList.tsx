import axios from 'axios';
import * as React from 'react';
import {View, Text, SafeAreaView, Image, FlatList, BackHandler, Alert} from 'react-native';
import { Config } from 'react-native-config';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import {CONTENT} from '../../constants/content';
import {PERSILE_FOLDER, PHONE} from '../../constants/iconConstants';
import { SCREENS } from '../../constants/navigationConstants';
import {Colors} from '../../styles';
import {styles} from './styles';
import Spinner from 'react-native-loading-spinner-overlay';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FolderList = ({navigation}: any) => {
  const [searchText, setSearchText] = useState('');
  const [spinner, showspinner] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const onChangeSearch = (text) => {
     // Check if searched text is not blank
     if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.folderName
          ? item.folderName.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchText(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearchText(text);
    }
  };

 //Show Alert
 const alert = (message: string | undefined) =>
 Alert.alert(
   "",
   message,
   [
     { text: "OK", onPress: () => console.log("OK Pressed") }
   ]
 );

  const fetchAllFoldersAPI = () => {
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_GETALLFOLDERS}`,
    {
      "from": '+16467410822'
    }).then(function (response) {
      showspinner(false)
      console.log("response object", response );
      console.log("response data", response.data );
      const result = response.data;
      if (response.status === 200) {
        if (result.status === false) {
          navigation.navigate(SCREENS.FOLDER_LIST_EMPTY)
        }else{
          setMasterDataSource(result.value);
          setFilteredDataSource(result.value);

        }
      } else {
        showspinner(false)
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
    fetchAllFoldersAPI()
      // Update the document title using the browser API
      const unsubscribe = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
      return () => null
    }, []);


  const renderItem = ({item}: any) => {
    return (
      <View style={{width: '25%'}}>
        <TouchableOpacity>
        <Image source={PERSILE_FOLDER} style={{width: '100%', height: 50}} />
        <Text style={[styles.subText, {textAlign: 'center'}]}>
          {item?.folderName}
        </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
      }}>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
      <Header icon={PERSILE_FOLDER} title={CONTENT.PERSILE.toUpperCase()} />

      <View style={styles.container1}>
        <SearchInput
          placeholder="Search"
          value={searchText}
          isFilter
          onChange={(text: any) => onChangeSearch(text)}
          onClear={(text: any) => onChangeSearch('')}
        />
        <FlatList
          style={{marginTop: 50}}
          data={filteredDataSource}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',

          marginBottom: 30,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              width: '15%',
              height: 80,
            }}>
            <Image style={styles.image} source={PHONE} />
          </View>
          <Text style={[styles.subText, {marginTop: 10}]}>
            {CONTENT.FOLDER_CONTENT}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FolderList;


