import * as React from 'react';
import {TextInput, HelperText} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {Colors, Mixins, Typography} from '../styles';

const styles = StyleSheet.create({
  normalTextField: {
    height: 45,
    backgroundColor: 'white',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});

const AppTextInput = (props: any) => {
  const inputData = props;
  return (
    <View style={{width: '100%'}}>
      <TextInput
        theme={{
          colors: {
            placeholder: Colors.TERTIARY,
            text: Colors.SECONDARY,
            primary: '#1ED760',
            error: Colors.RED,
          },
        }}
        style={styles.normalTextField}
        mode="outlined"
        error={inputData.ErrorMsg}
       secureTextEntry={inputData.secureTextEntry}
       label={inputData.label}
        value={inputData.value}
       onChangeText={text => inputData.onChange(text)}
       maxLength={inputData.maxLength}
        right={inputData.right}
        returnKeyType={inputData.returnKeyType}
        keyboardType={inputData.keyboardType}
      />
      <HelperText
        style={{color: Colors.RED}}
        type="error"
        padding="none"
        visible={inputData.ErrorMsg}>
        {inputData.ErrorMsg}
      </HelperText>
    </View>
  );
};

export default AppTextInput;
