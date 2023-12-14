import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Alert, Dimensions } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import DropDownPicker from 'react-native-dropdown-picker';
import { galleryClickImage, isNullOrEmpty } from '../../CommonFunctions/CommonFunction'
import TextInputComponent from '../../CommonComponent/TextInputComponent'
import { useSelector } from 'react-redux'
import { actions } from '../../Redux/Action/ActionIndex'

const height = Dimensions.get('window').height;

export default function DataEnterForm({ navigation }) {
  const [photo, setPhoto] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [Dob, setDob] = useState('')
  const [isTimePickerVisible, setIsTimePickerVisible] = useState()
  const infoData = useSelector((state) => state.infoReducer.infoArray)
  const [dropDownList, setDropDownList] = useState([
    { label: 'Quotation', value: 'Quotation' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Demo', value: 'Demo' },
    { label: 'New Lead', value: 'NewLead' },
    { label: 'Close Lead', value: 'CloseLead' }
  ]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownValue, setDropDownValue] = useState(null);
  

  const photoUpload = async () => {
    const result = await galleryClickImage()
    //console.log("result galleryClickImage----", JSON.stringify(result))
    setPhoto(result.uri)
  }

  const onSaveButtonPress = () => {
    console.log("onSaveButtonPress")
    const vali = validation()

    if (vali) {
      Alert.alert(
        'Save!',
        'Do you want to Add this Info',
        [
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => onSave(),
            style: 'cancel',
          },
        ],
      );
    }
  }

  const validation = () => {
    console.log("validation")
    let isValid = false;
    if (isNullOrEmpty(firstName) && isNullOrEmpty(lastName)) {
      Alert.alert('Please Enter All required fields')
    } else {
      if (isNullOrEmpty(firstName)) {
        Alert.alert('Please Enter First Name')
      } else {
        if (isNullOrEmpty(lastName)) {
          Alert.alert('Please Enter Last Name')
        } else {
          console.log("Validation done")
          isValid = true
        }
      }
    }
    console.log("isvalid", isValid)
    return isValid;
  }

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);
    const setDate = moment(date).format('YYYY-MM-DD')
    setDob(setDate);
    setIsTimePickerVisible(false);
  };

  const hideTimePicker = () => {
    setIsTimePickerVisible(false);
  }

  const onSave = () => {
    console.log("dropDownListdropDownList",dropDownValue)
    actions.addnewInfo({
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: Dob,
      photoUrl: photo,
      id: 1 + infoData.length,
      dropDownValue:dropDownValue
    })
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView>
        <View style={{ margin: 10, padding: 10 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={styles.profileImg}>
              {
                photo &&
                <Image source={{ uri: photo }}
                  style={styles.profileImg} />
              }
            </View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => photoUpload()}>
              <Text style={[styles.textStyle, { padding: 10, textAlign: 'center', backgroundColor: '#0096FF', width: '40%', margin: 10, borderRadius: 10 }]}>Uplaod Image</Text>
            </TouchableOpacity>
          </View>
          <TextInputComponent
            text={'First Name'}
            textStyle={styles.textStyle}
            textInputStyle={styles.inputBox}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            mandatory={true}
          />
          <TextInputComponent
            text={'Last Name'}
            textStyle={styles.textStyle}
            textInputStyle={styles.inputBox}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            mandatory={true}
          />
          <Text style={styles.textStyle}>Date of Birth</Text>
          <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, }]}>
            <View style={{ width: '85%' }}>
              <TextInput
                style={[styles.textStyle, { fontWeight: 'normal' }]}
                value={Dob}
                placeholder='YYYY-MM-DD'
                editable={false}
              />
            </View>
            <View style={{ width: '10%', justifyContent: 'center' }}>
              <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-ends' }}
                onPress={() => [setIsTimePickerVisible(true), console.log("time picker click")]}
              >
                <View style={{ justifyContent: 'flex-end' }}>
                  <Feather name="calendar" size={25} />
                </View>
              </TouchableOpacity>
            </View>
            <DateTimePickerModal
              isVisible={isTimePickerVisible}
              mode="date"
              onConfirm={(date) => {
                console.log("on Time confirm");
                handleConfirm(date)
              }}
              maximumDate={new Date()}
              onCancel={() => hideTimePicker()}
            />
          </View>
          <Text style={styles.textStyle}>DropDown List</Text>
          <View style={{marginTop:10}}>
          <DropDownPicker
            open={openDropDown}
            value={dropDownValue}
            items={dropDownList}
            setOpen={setOpenDropDown}
            setValue={setDropDownValue}
            setItems={setDropDownList}
            placeholder='Select from dropdown'
          />
          </View>

          <View style={{ marginTop: 150, backgroundColor: '#0096FF', height: 40, borderRadius: 20 }}>
            <TouchableOpacity style={{ alignItems: 'center', alignContent: 'center' }}
              onPress={() => onSaveButtonPress()}
            >
              <Text style={[styles.textStyle, { marginTop: 8, fontSize: 20 }]}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderColor: '#000000',
    borderWidth: 2,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10
  },
  inputBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
    paddingLeft: 15,
    padding: 12,
  },
})