import React from "react";
import { TouchableOpacity, Text, StyleSheet , Image } from "react-native";
import {Colors, SharedStyles} from '../styles';

export const SegmentButton = (props: any) => {
    const SegmentButtonsData = props;
  return (
    <TouchableOpacity onPress={SegmentButtonsData.onPress}
    style={ SegmentButtonsData.disable === true? SharedStyles.InactiveSegmentButton : SharedStyles.ActiveSegmentButton}>
         <Image
        style={styles.tinyLogo}
        source={SegmentButtonsData.image}
        resizeMethod='auto'
      />
      <Text style={styles.text}>{SegmentButtonsData.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    height: 60,
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    borderRadius: 5,
    borderWidth : 2,
    borderColor : Colors.PRIMARY
  },
  text: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
  tinyLogo: {
    width: 32,
    height:30,
    marginRight : 10
  },
});

