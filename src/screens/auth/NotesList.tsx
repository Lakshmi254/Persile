import axios from 'axios';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Alert, BackHandler, Image } from 'react-native';
import Config from 'react-native-config';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header';
import { backArrow, RIGHT_ARROW } from '../../constants/iconConstants';
import { styles } from './styles';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { Typography } from '../../styles';
import { SCREENS } from '../../constants/navigationConstants';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from "@react-navigation/native";
import { getItem } from '../../utils/asyncStorage';
import { AuthContext } from '../../navigations/context';

const NotesList = ({ navigation , route}: any) => {
  const [spinner, showspinner] = useState(false);
 const [taskData , setTaskDataSource] = useState([]);
 const [notesData , setNotesDataSource] = useState([]);
 const [selectedIndex, setSelectedIndex] = useState(0);
 const isFocused = useIsFocused();
 const [phoneNumber, setPhoneNumber] = useState("");

 const { dataObject } = route.params;

 
  //Show Alert
  const alert = (message: string | undefined) =>
    Alert.alert(
      "",
      message,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    const onPressAction = (item: any) => {
        navigation.navigate(SCREENS.NOTES_DETAIL, { dataObject: item });
      };

      const _onChange = (event) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
      };

    const fetchtasksMessagesAPI = (phone : String) => {
        showspinner(true);
        axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_GETALLMESSAGES}`, {
            from: phone,
            folder_name: dataObject.folder_name
          })
          .then(function (response) {
            showspinner(false);
            console.log("response object", response);
            console.log("response messages from folder", response.data);
            const result = response.data;
            if (response.status === 200) {
              var taskCreatures =  result.value.filter(function(creature) {
                return creature.messageType == "task";
              });
              setTaskDataSource(taskCreatures);

              var notesCreatures =  result.value.filter(function(creature) {
                return creature.messageType == "notes";
              });
              setNotesDataSource(notesCreatures);

            } else {
              alert(result.message);
            }
          })
          .catch(function (error) {
            showspinner(false);
            console.log("response error", error);
            alert("Please try again after sometime.");
          });
      };

  useEffect(() => {
   
    async function fetchMyPhoneNumber() {
        const phonenumber = await getItem("Phone_Number");
        setPhoneNumber(phonenumber)
        if(isFocused){ 
          fetchtasksMessagesAPI(phonenumber);
      }
      }
      fetchMyPhoneNumber()
  }, [isFocused]);




  const renderItem = ({ item }: any) => {
    return (
        <TouchableOpacity
        onPress={() => onPressAction(item)}
        //style={{ alignSelf: "center", alignItems: "center" }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 15,
          }}
        >
            
          <View style={{ width: "80%" }}>
            <Text style={[styles.subText]}>{item?.message}</Text>
          </View>
         
            <Image source={RIGHT_ARROW} style={{ height: 20, width: 20 }} />
        </View>
        </TouchableOpacity>

            );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="Tasks/Notes" icon={backArrow}  menuRef={true}/>
      <Spinner
          visible={spinner}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />
      <View style={{padding : "5%"}}>
      <SegmentedControl
    backgroundColor="#000000"
    fontStyle={{color: 'white', fontFamily: Typography.FONT_FAMILY_MEDIUM}}
    activeFontStyle={{color: 'black'}}      
    values={['Task', 'Notes']}
    selectedIndex={selectedIndex}
    onChange={_onChange}
    />
  </View>
      <FlatList
        data={ selectedIndex === 0 ? taskData : notesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
            <View style={{ backgroundColor: "black", height: 1 }} />
          )}
      />
    </SafeAreaView>
  );
};

export default NotesList;
