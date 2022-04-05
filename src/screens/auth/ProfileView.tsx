import * as React from 'react';
import { View, Text, SafeAreaView, Alert, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import Header from '../../components/Header';
import { backArrow } from '../../constants/iconConstants';
import { styles } from '../auth/styles';

const ProfileView = ({ navigation }: any) => {
  

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header title="Profile" icon={backArrow} menuRef={true} />
          
            <View style={styles.container}>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <Icon name={'edit'} containerStyle={styles.editicon} onPress={console.log('I was clicked')}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
             
            </View>
        </View>
      </View>
        </SafeAreaView>
    );
};

export default ProfileView;
