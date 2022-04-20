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
  Image,
  TouchableOpacity
} from "react-native";
import Config from "react-native-config";
import Header from "../../components/Header";
import {
  backArrow,
  CANCEL,
  DOWN_ARROW,
} from "../../constants/iconConstants";
import { styles } from "./styles";
import Modal from "react-native-modalbox";
import { Button, FAB } from "react-native-paper";
import { SCREENS } from "../../constants/navigationConstants";
import Spinner from 'react-native-loading-spinner-overlay';
import { getItem } from "../../utils/asyncStorage";
import { PrimaryButton } from "../../components/Button";

const MessageList = ({ navigation, route }: any) => {
  const [spinner, showspinner] = useState(false);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const { paramKey } = route.params;
  const [isConfirm, setisConfirm] = React.useState(false);
  const [taskData, setTaskData] = React.useState([]) as any;
  const [phoneNumber, setPhoneNumber] = useState("");

  //Show Alert
  const alert = (message: string | undefined) =>
    Alert.alert("", message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const fetchAllMessagesAPI = (phone : String) => {
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
      });
  };
  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 15,
        }}
      >
        <View style={{ width: "60%" }}>
          <Text style={[styles.subText]}>{item?.message}</Text>
        </View>
        <View style={{ alignSelf: "center", alignItems: "center" ,height: 30}}>
          <Text style={styles.assignText}>{item?.messageType}</Text>
        </View>
        {/* <TouchableOpacity
          onPress={() => onPressAction(item)}
          style={{ alignSelf: "center", alignItems: "center" ,height: 30, width: 40}}
        >
          <Image source={DOWN_ARROW} style={{ height: 20, width: 20 , marginRight : 5}} />
        </TouchableOpacity> */}
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
      <View style={{padding : "5%" , width : "50%" ,  alignSelf : 'flex-end'}}>
      <PrimaryButton
            onPress={() => onPressAction()}
            title="Assign"
          />
      </View>
      <FlatList
        data={masterDataSource}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => (
          <View
            style={{ backgroundColor: "black", height: 1, marginVertical: 5 }}
          />
        )}
      />
      <Modal
        onClosed={onCloseModel}
        isOpen={isConfirm}
        style={{ height: "25%" }}
        position="bottom"
        entry="bottom"
        swipeArea={20}
        coverScreen
      >
        <View style={{ padding: 15 }}>
          <TouchableOpacity
            onPress={onCloseModel}
            style={{
              alignItems: "flex-end"
            }}
          >
            <Image source={CANCEL} style={{ height: 30, width: 30 }} />
          </TouchableOpacity>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Button
              style={styles.taskButton}
              contentStyle={{ borderRadius: 5, backgroundColor: 'black' }}
              uppercase={false}
              labelStyle={{
                fontSize: 14,
              }}
              mode="contained"
              onPress={() => onCreateTask("task")}
            >
              {"Task List"}
            </Button>
            <Button
              style={styles.taskButton}
              contentStyle={{ borderRadius: 5, backgroundColor: 'black' }}
              uppercase={false}
              labelStyle={{
                fontSize: 14,
              }}
              mode="contained"
              onPress={() => onCreateTask("notes")}
            >
              {"Note List"}
            </Button>
          </View>
        </View>
      </Modal>
      {/* <Button color="black" style={styles.fabButton}
        onPress={() => onNotesTaskTap()} labelStyle={{
          fontSize: 16,
          fontWeight: "600"
        }} 
        uppercase={false}
        >
        Task/Notes
      </Button> */}

    </SafeAreaView>
  );
};

export default MessageList;
