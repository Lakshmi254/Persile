import * as React from 'react';
import {View, Text, SafeAreaView, Image, FlatList} from 'react-native';

import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import {CONTENT} from '../../constants/content';
import {PERSILE_FOLDER, PHONE} from '../../constants/iconConstants';
import {Colors} from '../../styles';

import {styles} from './styles';

const FolderList = ({navigation}: any) => {
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
    <SafeAreaView
      style={{
        flexGrow: 1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
      }}>
      <Header icon={PERSILE_FOLDER} title={CONTENT.PERSILE.toUpperCase()} />

      <View style={styles.container1}>
        <SearchInput
          placeholder="Search"
          value={searchText}
          isFilter
          onChange={(text: any) => onChangeSearch(text)}
        />
        <FlatList
          style={{marginTop: 50}}
          data={folderList}
          renderItem={renderItem}
          keyExtractor={item => item.name}
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
