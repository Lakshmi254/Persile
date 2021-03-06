import * as React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';

import Header from '../../components/Header';
import {CONTENT} from '../../constants/content';
import {HASH_TAG, PERSILE_FOLDER, PHONE} from '../../constants/iconConstants';
import {styles} from './styles';

const FolderListEmpty = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title={CONTENT.PERSILE} />
      <View style={styles.containerFolder}>
        <View style={styles.imageView}>
          <Image style={styles.image} source={HASH_TAG} />
        </View>
        <Text style={[styles.subText, styles.nothingText]}>
          {CONTENT.NOTHING_HERE}
        </Text>
        <Text style={styles.subText}>{CONTENT.NOTHING_HERE_CONTENT}</Text>
      </View>
      <View style={styles.folderBottom}>
        <View>
          <View style={styles.folderBottomLeft}>
            <Image style={styles.image} source={PHONE} />
          </View>
          <Text style={styles.subText}>#{CONTENT.PHOTO_OUR_VACATION}</Text>
        </View>
        <View>
          <View style={styles.folderBottomRight}>
            <Image style={styles.image} source={PERSILE_FOLDER} />
          </View>
          <Text style={styles.subText}>#{CONTENT.PHOTO}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FolderListEmpty;
