
import axios from "axios";
import * as React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import Modal from "react-native-modalbox";
import { Button, FAB } from "react-native-paper";
import { Config } from "react-native-config";
import Header from "../../components/Header";
import SearchInput from "../../components/SearchInput";
import { CONTENT } from "../../constants/content";
import { CANCEL, PERSILE_FOLDER, PHONE } from "../../constants/iconConstants";
import { SCREENS } from "../../constants/navigationConstants";
import { Colors } from "../../styles";
import { styles } from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../navigations/context";
import { getItem } from "../../utils/asyncStorage";
import AppTextInput from "../../components/AppTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { IconButton } from 'react-native-paper';

const FolderList = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [spinner, showspinner] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const menuRef = React.useRef(null);
  const { signOut } = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = React.useState("");
  const [newFolderName, setNewFolder] = React.useState("");
  const [ErrorMsg, folderErrorMsg] = useState(null as any);
  const [isConfirm, setisConfirm] = React.useState(false);
  const [taskData, setTaskData] = React.useState([]) as any;

  const onChangeSearch = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item: any) {
        const itemData = item.folderName
          ? item.folderName.toUpperCase()
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
  const addFoldersAPI = () => {
    setModalVisible(!modalVisible)
    showspinner(true);
    axios
      .post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_CREATEFOLDER}`, {
        folder_name: newFolderName,
        number_from: phoneNumber
      })
      .then(function (response) {
        console.log("response object", response);
        console.log("response data", response.data);
        const result = response.data;
        if (response.status === 200) {
          fetchAllFoldersAPI(phoneNumber);
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

  // add folder action
  const onAddFolderAction = () => {
    setNewFolder("");
    setModalVisible(!modalVisible)
  }

  //Show Alert
  const alert = (message: string | undefined) =>
    Alert.alert("", message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const fetchAllFoldersAPI = (phone: String) => {
    showspinner(true);
    axios
      .post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_GETALLFOLDERS}`, {
        from: phone,
      })
      .then(function (response) {
        showspinner(false);
        console.log("response object", response);
        console.log("response data", response.data);
        const result = response.data;
        if (response.status === 200) {
          if (result.status === false) {
            navigation.navigate(SCREENS.FOLDER_LIST_EMPTY);
          } else {
            // var aquaticCreatures = result.value.filter(function (creature) {
            //   return creature.folderType == "unassigned";
            // });
            setMasterDataSource(result.value);
            // setMasterDataSource(result.value);
            setFilteredDataSource(result.value);
          }
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

  // called if folder is already assigned
  const onfolderTap = (folder_name: string, folder_id: string) => {
    const dataObject = { 'folder_name': folder_name, "phone_number": phoneNumber, "folder_id": folder_id }
    navigation.navigate(SCREENS.MESSAGE_LIST, { paramKey: dataObject });
  };

  const onCloseModel = () => {
    setisConfirm(false);
  };
  const onPressAction = (item: any) => {
    if (item.folderType === "unassigned") {
      setisConfirm(true);
      setTaskData(item);
    } else {
      onfolderTap(item.folderName, item.id)
    }
  };
  const onCreateTask = (task: string) => {
    setisConfirm(false);
    const reqData = {
      id: taskData.id,
      type: task,
    };
    addTaskNote(reqData);
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
          fetchAllFoldersAPI(phoneNumber)
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

  useEffect(() => {
    async function fetchMyPhoneNumber() {
      const phonenumber = await getItem("Phone_Number");
      setPhoneNumber(phonenumber)
      fetchAllFoldersAPI(phonenumber);
    }
    fetchMyPhoneNumber();
  }, [])

  const renderItem = ({ item }: any) => {
    return (
      <View style={{ width: "25%" }}>
        <TouchableOpacity style={{ margin: 5 }} onPress={() => onPressAction(item) /*onfolderTap(item?.folderName, item?.id)*/}>
          <Image
            source={PERSILE_FOLDER}
            style={{ width: "100%", height: 50 }}
          />
          <Text adjustsFontSizeToFit numberOfLines={1} style={[styles.subText, { textAlign: "center" }]}>
            {item?.folderName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const folderNameChange = (text: string) => {
    if (text) {
      setNewFolder(text);
      folderErrorMsg(null)
    } else {
      setNewFolder('')
    }
  };
  const onSaveFolderName = () => {
    if (newFolderName.length <= 0) {
      folderErrorMsg('Please enter valid Folder Name.');
    } else {
      //call api to save folder name
      addFoldersAPI();
    }
  }
  const showMoreoptions = () => {
    setVisible(true);
  };
  const logout = () => {
    console.log('userfiles;isttttttt');
    signOut();
  };
  const handleOutsideTouch = (e: any) => {
    if (visible) {
      if (e.target !== menuRef.current) {
        setVisible(false);
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: Colors.WHITE,
      }}
    >
      <Spinner
        visible={spinner}
        textContent={""}
        textStyle={styles.spinnerTextStyle}
      />
      <Header
        icon={PERSILE_FOLDER}
        more
        title={CONTENT.PERSILE.toUpperCase()}
        shoeMoreoptions={showMoreoptions}
      />
      {visible && (
        <View style={Platform.OS === 'ios' ? styles.morecontainerIOS : styles.morecontainer} ref={menuRef}>
          <Text style={styles.moreListText}>Settings</Text>
          <View style={styles.verticalLine} />
          <TouchableOpacity style={{ marginTop: 10 }} onPress={logout}>
            <Text style={styles.moreListText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ backgroundColor: '#808080aa', flex: 1, justifyContent: 'center' }}>
          <View style={{ backgroundColor: "white", padding: 60, borderRadius: 9, alignSelf: 'center', justifyContent: 'center' }}>
          <IconButton 
    icon="close"
    size={30}
    onPress={() => setModalVisible(!modalVisible)}
       style={{
           position: 'absolute',
           //left: 0,
           right: 0,
           top: 0,
           bottom: 0,
        }}/>
            <Text style={styles.modalText}>Please Enter folder name.</Text>
           <View>
            <AppTextInput
              value={newFolderName}
              //label={CONTENT.FOLDER_Name.toUpperCase()}
              onChange={(text: any) => folderNameChange(text)}
              ErrorMsg={ErrorMsg}
              keyboardType="default"
            />
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => onSaveFolderName()}
            >
              <Text style={styles.textStyle}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
      <TouchableWithoutFeedback onPress={handleOutsideTouch}>
        <View style={styles.container1}>
          <SearchInput
            placeholder="Search"
            value={searchText}
            isFilter
            onChange={(text: any) => onChangeSearch(text)}
            onClear={(text: any) => onChangeSearch("")}
          />
          <FlatList
            style={{ marginTop: 50 }}
            data={filteredDataSource}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
          />
        </View>
      </TouchableWithoutFeedback>

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
          <Text>Do you want to Assign this folder as Task Folder / Note Folder?</Text>

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
              {"Task folder"}
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
              {"Note folder"}
            </Button>
          </View>
        </View>
      </Modal>

      {/* <View
        style={{
          justifyContent: "flex-end",
          marginBottom: 30,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              width: "15%",
              height: 80,
            }}
          >
            <Image style={styles.image} source={PHONE} />
          </View>
          <Text style={[styles.subText, { marginTop: 10 }]}>
            {CONTENT.FOLDER_CONTENT}
          </Text>
        </View>
      </View> */}
      {/* <View >
        <PrimaryButton
          onPress={() => onAddFolderAction()}
          title="Add Folder +"
        />
      </View> */}
    </SafeAreaView>
  );
};

export default FolderList;
