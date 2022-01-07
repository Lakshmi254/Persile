import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {SEARCH} from '../constants/iconConstants';
import {Colors, Typography} from '../styles';

const styles = StyleSheet.create({
  inputText: {
    color: Colors.WHITE,
    backgroundColor: Colors.WHITE,
    borderRadius: 4,
    borderColor: Colors.PRIMARY,
    height: 48,
    justifyContent: 'center',
  },
});

const SearchInput = (props: any) => {
  const searchInputData = props;
  return (
    <View>
      <TextInput
        selectionColor={Colors.SECONDARY}
        maxLength={50}
        theme={{
          colors: {
            primary: Colors.SUCCESS,
          },
          roundness: 5,
        }}
        style={[styles.inputText]}
        underlineColor="transparent"
        mode="outlined"
        placeholder={searchInputData.placeholder}
        value={searchInputData.value}
        disabled={searchInputData.disabled}
        onChangeText={text => searchInputData.onChange(text)}
        right={
          <TextInput.Icon
            name={SEARCH}
            size={20}
            color={Colors.SECONDARY}
            onPress={() => {}}
          />
        }
      />
    </View>
  );
};

export default SearchInput;
