import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import Header from '../../components/Header';
import { backArrow } from '../../constants/iconConstants';
import { styles } from './styles';
import CheckBox from '@react-native-community/checkbox';
import Config from 'react-native-config';
import Spinner from 'react-native-loading-spinner-overlay';

const NotesDetail = ({ navigation, route }: any) => {
    const [spinner, showspinner] = useState(false);
    const [disableCheckbox, setDisabled] = useState(false);
    const { dataObject } = route.params;
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    //Show Alert
    const alert = (message: string | undefined) =>
        Alert.alert(
            "",
            message,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    const setTaskAsCompleted = () => {
        showspinner(true);
        axios.post(`${Config.API_BASE_URL}${Config.API_ENDPOINT_MARKCOMPLETE}`, {
            id: dataObject.id,
        })
            .then(function (response) {
                showspinner(false);
                console.log("response object", response);
                console.log("response messages from folder", response.data);
                const result = response.data;
                if (response.status === 200) {
                    alert(result.message);
                    setDisabled(true)
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
        setToggleCheckBox(dataObject.completed)
        if (dataObject.completed === true) {
            setDisabled(true)
        }
    }, []);

    const _onChange = (event) => {
        setToggleCheckBox(event);
        console.log("event is", event);
        if (event === true) {
            //call api to mark complete
            setTaskAsCompleted()
        }
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header title={dataObject.messageType === "task" ? "Task" : "Note"} icon={backArrow} menuRef={true} />
            <Spinner
                visible={spinner}
                textContent={''}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ justifyContent: 'flex-start', padding: "5%" }}>
                    <Text style={styles.messageText}>{dataObject.message}</Text>
                </View>
                <View style={{flexDirection : 'row' , padding : "5%"}}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            disabled={disableCheckbox}
                            value={toggleCheckBox}
                            onValueChange={(val) => _onChange(val)}
                            boxType='square'
                            tintColors={{ true: '#000000', false: '#000000' }}
                            style={{ width : 25 , height : 25}}
                        />
                    </View>
                    <Text style={styles.markLabel}>Mark as Completed</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default NotesDetail;
