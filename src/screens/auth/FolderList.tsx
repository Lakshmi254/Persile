
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
} from "react-native";
import { Config } from "react-native-config";
import Header from "../../components/Header";
import SearchInput from "../../components/SearchInput";
import { CONTENT } from "../../constants/content";
import { PERSILE_FOLDER, PHONE } from "../../constants/iconConstants";
import { SCREENS } from "../../constants/navigationConstants";
import { Colors } from "../../styles";
import { styles } from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../navigations/context";
import { getItem } from "../../utils/asyncStorage";

const FolderList = ({ navigation }: any) => {
  const [searchText, setSearchText] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [spinner, showspinner] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [visible, setVisible] = useState(false);
  const menuRef = React.useRef(null);
  const { signOut } = React.useContext(AuthContext);

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

  //Show Alert
  const alert = (message: string | undefined) =>
    Alert.alert("", message, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const fetchAllFoldersAPI = (phone : String) => {
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
            setMasterDataSource(result.value);
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
      });
  };

  const onfolderTap = (folder_name: string) => {
    const dataObject = {'folder_name' : folder_name , "phone_number" : phoneNumber}
    navigation.navigate(SCREENS.MESSAGE_LIST, { paramKey: dataObject });
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
        <TouchableOpacity style={{margin : 5}} onPress={() => onfolderTap(item?.folderName)}>
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
        <View style={Platform.OS === 'ios' ?styles.morecontainerIOS : styles.morecontainer} ref={menuRef}>
          <Text style={styles.moreListText}>Settings</Text>
          <View style={styles.verticalLine} />
          <TouchableOpacity style={{ marginTop: 10 }} onPress={logout}>
            <Text style={styles.moreListText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

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

      <View
        style={{
          flex: 1,
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
      </View>
    </SafeAreaView>
  );
};

export default FolderList;
