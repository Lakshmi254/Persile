
import axios from "axios";
import * as React from "react";
import {
    View,
    Text,
    SafeAreaView,
    Image,
    FlatList,
    Alert,
    Dimensions,
    Platform,
} from "react-native";
import { Config } from "react-native-config";
import Header from "../../components/Header";
import { CONTENT } from "../../constants/content";
import { PERSILE_FOLDER, TASK_ICON, NOTE_ICON } from "../../constants/iconConstants";
import { SCREENS } from "../../constants/navigationConstants";
import { Colors, Typography } from "../../styles";
import { styles } from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../navigations/context";
import { getItem } from "../../utils/asyncStorage";
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { SegmentButton } from "../../components/SegmentButtons";

const TasksorNotes = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState(null as any);
    const [spinner, showspinner] = useState(false);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [NoteDataSource, setNotesDataSource] = useState([]);
    const [visible, setVisible] = useState(false);
    const menuRef = React.useRef(null);
    const { signOut } = React.useContext(AuthContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

    //Show Alert
    const alert = (message: string | undefined) =>
        Alert.alert("", message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);

    const fetchAllFoldersAPI = (phone: any) => {
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
                        var taskCreatures = result.value.filter(function (creature: { folderType: string; }) {
                            return creature.folderType == "task";
                        });
                        setMasterDataSource(taskCreatures);

                        var noteCreature = result.value.filter(function (creature: { folderType: string; }) {
                            return creature.folderType == "notes";
                        });
                        setNotesDataSource(noteCreature);
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

    const _onChange = (event: { nativeEvent: { selectedSegmentIndex: React.SetStateAction<number>; }; }) => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
    };

    useEffect(() => {
        async function fetchMyPhoneNumber() {
            const phonenumber = await getItem("Phone_Number");
            setPhoneNumber(phonenumber)
            fetchAllFoldersAPI(phonenumber);
        }
        fetchMyPhoneNumber();
    }, [])

    const onPressAction = (item: any) => {
        const dataObject = { 'folder_name': item.folderName, "phone_number": item.phoneNumber, "folder_id": item.id }
        navigation.navigate(SCREENS.MESSAGE_LIST, { paramKey: dataObject });
    }

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

    const noItemDisplay = ({ item }: any) => {
        return (
            <View style={{ width: Dimensions.get('window').width - 40, height: Dimensions.get('window').height - 250, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: Typography.FONT_FAMILY_REGULAR, textAlign: "center" }}>
                    You have no items.
                </Text>
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
                title={CONTENT.TASKORNOTE.toUpperCase()}
                more
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
            <View style={styles.container1}>
                {/* <SegmentedControl
                    backgroundColor="#000000"
                    fontStyle={{ color: 'white', fontFamily: Typography.FONT_FAMILY_MEDIUM }}
                    activeFontStyle={{ color: 'black' }}
                    values={['task', 'Notes']}
                    selectedIndex={selectedIndex}
                    onChange={_onChange}
                    style={styles.tabsContainerStyle}
                /> */}
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    <SegmentButton disable={selectedIndex === 0 ? false : true} onPress={() => setSelectedIndex(0)} title="TASKS" image={TASK_ICON} />
                    <SegmentButton disable={selectedIndex === 1 ? false : true} onPress={() => setSelectedIndex(1)} title="NOTES" image={NOTE_ICON} />
                </View>
                <FlatList
                    style={{ marginTop: 20 }}
                    data={selectedIndex == 0 ? masterDataSource : NoteDataSource}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={4}
                    ListEmptyComponent={noItemDisplay}
                />
            </View>
        </SafeAreaView>
    );
};

export default TasksorNotes;
