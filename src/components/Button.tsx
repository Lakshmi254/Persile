import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors, SharedStyles} from '../styles';


export const PrimaryButton = (props: any) => {
  const primaryButtonData = props;
  return (
    <TouchableOpacity
      onPress={primaryButtonData.onPress}
      disabled={primaryButtonData.disable}
      style={ primaryButtonData.disable === true? SharedStyles.disabledButton : SharedStyles.sharedButton}>
      <Text style={SharedStyles.sharedButtonTitle}>
        {primaryButtonData.title}
      </Text>
    </TouchableOpacity>
  );
};
