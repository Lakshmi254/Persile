import axios from "axios";
import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  BackHandler,
} from "react-native";
import CheckBox from '@react-native-community/checkbox';
import Config from "react-native-config";
import Header from "../../components/Header";
import {
  backArrow
} from "../../constants/iconConstants";
import { styles } from "./styles";
import { SCREENS } from "../../constants/navigationConstants";
import Spinner from 'react-native-loading-spinner-overlay';
import { getItem } from "../../utils/asyncStorage";
import SearchInput from "../../components/SearchInput";
import Icon from 'react-native-vector-icons/FontAwesome';

const MessageList = ({ navigation, route }: any) => {
  const [spinner, showspinner] = useState(false);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const { paramKey } = route.params;
  const [isConfirm, setisConfirm] = React.useState(false);
  const [taskData, setTaskData] = React.useState([]) as any;
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CheckBoxValue, setToggleCheckBox] = useState(false)
  const [searchText, setSearchText] = useState("");


  const onChangeSearch = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.message
          ? item.message.toUpperCase()
          : "".toUpperCase();
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
    Alert.alert("", message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const fetchAllMessagesAPI = (phone: String) => {
    showspinner(true);
    axios
      .post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_GETALLMESSAGES}`, {
        from: phone,
        folder_name: paramKey.folder_name,
      })
      .then(function (response) {
        showspinner(false);
        console.log("response object", response);
        console.log("response messages from folder", response.data);
        const result = response.data;
        if (response.status === 200) {
          // var aquaticCreatures = result.value.filter(function (creature) {
          //   return creature.messageType == "unassigned";
          // });
          setMasterDataSource(result.value);
          setFilteredDataSource(result.value)
          if (result.value == undefined) {
            alert('Your folder has no messages.');
          }
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

  const handleBackButton = () => {
    //ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return false;
  };

  React.useEffect(() => {
    console.log("navigation values ", paramKey);

    async function fetchMyPhoneNumber() {
      const phonenumber = await getItem("Phone_Number");
      setPhoneNumber(phonenumber)
      fetchAllMessagesAPI(phonenumber);

    }
    fetchMyPhoneNumber()
    // Update the document title using the browser API
    const unsubscribe = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );
    return () => null;
  }, []);

  const onCloseModel = () => {
    setisConfirm(false);
  };
  const onPressAction = () => {
    setisConfirm(true);
    setTaskData();
  };
  const onCreateTask = (task: string) => {
    setisConfirm(false);
    const reqData = {
      id: paramKey.folder_id,
      type: task,
    };
    addTaskNote(reqData);
  };

  const onNotesTaskTap = () => {
    navigation.navigate(SCREENS.NOTES_LIST, { dataObject: paramKey });
  };

  const addTaskNote = (reqData: any) => {
    showspinner(true);
    axios
      .post(
        `${Config.API_BASE_URL}${Config.API_ENDPOINT_ASSIGNFOLDERTYPE}`,
        reqData
      )
      .then(function (response) {
        showspinner(false);
        console.log("response object", response);
        console.log("response", response.data);
        const result = response.data;
        if (response.status === 200) {
          alert(result.message);
          fetchAllMessagesAPI(phoneNumber);
        } else {
          showspinner(false);
          alert(result.message);
        }
      })
      .catch(function (error) {
        showspinner(false);
        console.log("response error", error);
        alert("Please try again after sometime.");
      });
  };

  const setASPriority = (item: any, value: boolean) => {
    showspinner(true);
    axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_PRIORITY}`, {
      id: item.id,
      priorityStatus: value
    })
      .then(function (response) {
        showspinner(false);
        console.log("response object", response);
        console.log("response messages from folder", response.data);
        const result = response.data;
        if (response.status === 200) {
          fetchAllMessagesAPI(phoneNumber)
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

  const oncheckBoxSelected = (value: boolean, item: any) => {
    //call api to set selected
    setASPriority(item, value);
  }

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 10,
        }}
      >
        {item.messageType === "task" ? <View style={{ justifyContent: 'flex-start' , flexDirection : 'row' }}>
          <CheckBox
          disabled={false}
          value={false}
          boxType='square'
          //onValueChange={(newValue) => oncheckBoxSelected(newValue, item)}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
                  <View style={{ paddingLeft : 5, width: "80%", justifyContent: 'center' }}>
          <Text style={[styles.subText]}>{item?.message}</Text>
          </View>
        </View> : <View style={{ justifyContent: 'flex-start' , flexDirection : 'row' }}>
          <Icon name="circle" size={15} color="black" />
          <View style={{ paddingLeft : 5, width: "80%", justifyContent: 'center' }}>
          <Text style={[styles.subText]}>{item?.message}</Text>
          </View>
        </View>}
        {/* 
        <View style={{ width: "60%", justifyContent: 'center' }}>
          <Text style={[styles.subText]}>{item?.message}</Text>
        </View> */}
        <View style={{ alignSelf: "center", alignItems: "center", height: 30 }}>
          <CheckBox
            disabled={false}
            value={item.priority}
            boxType='square'
            onValueChange={(newValue) => oncheckBoxSelected(newValue, item)}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={paramKey.folder_name} icon={backArrow} />
      <Spinner
        visible={spinner}
        textContent={''}
        textStyle={styles.spinnerTextStyle}
      />
      <View style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <View style={{ paddingTop: "5%", paddingBottom: "5%" }}>
          <SearchInput
            placeholder="Search"
            value={searchText}
            isFilter
            onChange={(text: any) => onChangeSearch(text)}
            onClear={(text: any) => onChangeSearch("")}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: "2%" }}>
          {filteredDataSource ?
            <Text>Showing {filteredDataSource.length} {filteredDataSource[0]?.messageType === "task" ? "Task" : "Note"} </Text>
            : <Text>Showing 0 items</Text>}
          <Text>Mark as priority</Text>
        </View>
        <FlatList
          data={filteredDataSource}
          renderItem={renderItem}
          keyExtractor={(item: any) => item.id}
          ItemSeparatorComponent={() => (
            <View
              style={{ backgroundColor: "grey", height: 1, marginVertical: 5 }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MessageList;
