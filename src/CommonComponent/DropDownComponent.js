import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = (props) => {
  //console.log("data",props)
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
   
      return (
        <Text style={[styles.label]}>
          {props.label}
        </Text>
      );
    
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, props.isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.data}
        //search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!props.isFocus ? props.placeholder : '...'}
        searchPlaceholder={props.searchPlaceholder}
        value={props.value}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onChange={props.onChange}
      //   renderLeftIcon={() => (
      //     <AntDesign
      //       style={styles.icon}
      //       color={isFocus ? 'blue' : 'black'}
      //       name="Safety"
      //       size={20}
      //     />
      //   )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    //padding: 16,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
    paddingLeft: 15,
    padding: 8, height: 47
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    fontSize: 14,
    top: -8,
    left: 12,
    zIndex: 100,
    paddingHorizontal: 2,
    fontWeight: 'normal',
    color: '#000000',
    fontFamily:'Roboto'
    //marginTop: 10
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray'
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});