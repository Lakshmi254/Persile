import * as React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';

import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import {CONTENT} from '../../constants/content';
import {PERSILE_FOLDER} from '../../constants/iconConstants';

import {styles} from './styles';

const NewFolder = ({navigation}: any) => {
  const [searchText, setSearchText] = React.useState('');

  const onChangeSearch = (text: any) => {
    setSearchText(text);
  };
  const folderList = [
    {
      name: 'Priorities',
      icon: PERSILE_FOLDER,
    },
    {
      name: '#breakfast',
      icon: PERSILE_FOLDER,
    },
  ];

  const renderItem = ({item}: any) => {
    return (
      <View style={{width: '25%', paddingVertical: 20}}>
        <Image source={PERSILE_FOLDER} style={{width: '100%', height: 50}} />
        <Text style={[styles.subText, {textAlign: 'center'}]}>
          {item?.name}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={CONTENT.BREAK_FAST} />

      <View style={{paddingHorizontal: '5%', marginTop: 20}}>
        <SearchInput
          placeholder="Search"
          value={searchText}
          isFilter
          onChange={(text: any) => onChangeSearch(text)}
        />
        <Text style={styles.subText}>{CONTENT.NEW_FOLDER_CONTENT}</Text>
      </View>
    </SafeAreaView>
  );
};

export default NewFolder;
