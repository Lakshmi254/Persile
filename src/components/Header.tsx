import React from 'react';
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, Spacing, Typography} from '../styles';

const styles = StyleSheet.create({
  title: {
    fontSize: Spacing.SCALE_20,
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.BLACK,
    fontWeight: '600',
    paddingHorizontal: '5%',
    letterSpacing : 1
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.PRIMARY,
  },
  iconStyle: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
});

function Header({icon, title}: any) {
  const navigation = useNavigation();

  const back = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {icon && <Image style={styles.iconStyle} source={icon} />}
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

export default Header;
