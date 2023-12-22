import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TextInputComponent from '../../CommonComponent/TextInputComponent'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Feather from 'react-native-vector-icons/Feather'
import moment from 'moment';
import { useSelector } from 'react-redux'
import { actions } from '../../Redux/Action/ActionIndex'
import DropdownComponent from '../../CommonComponent/DropDownComponent';
import { useIsFocused } from '@react-navigation/native';

const DataEnterForm = ({ navigation }) => {

    const [labName, setLabName] = useState('')
    const [ownerName, setOwnername] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [emailId, setEmailId] = useState('')
    const [address, setAddress] = useState('')
    const [date, setDate] = useState('')
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false)
    const [dropDownSOLList, setDropDownSOLList] = useState([
        { label: 'Quotation', value: 'Quotation' },
        { label: 'Sales', value: 'Sales' },
        { label: 'Demo', value: 'Demo' },
        { label: 'New Lead', value: 'NewLead' },
        { label: 'Close Lead', value: 'CloseLead' }
    ]);
    const [openSOLDropDown, setOpenSOLDropDown] = useState(false);
    const [dropDownSOLValue, setDropDownSOLValue] = useState(null);
    const [dropDownSPNList, setDropDownSPNList] = useState([
        { label: 'ABC', value: 'gefhghgfg' },
        { label: 'ADCB', value: 'fhhfhvbfhbvh' },
        { label: 'YYYY', value: 'hfbvhjbvhbv' },
        { label: 'KDSKJS', value: 'bchbfv' },
        { label: 'OOOOOO', value: 'fvhbvfbhv' }
    ]);
    const [openSPNDropDown, setOpenSPNDropDown] = useState(false);
    const [dropDownSPNValue, setDropDownSPNValue] = useState(null);
    const [dropDownVersionList, setDropDownVersionList] = useState([
        { label: 'version 1', value: '1.1' },
        { label: 'version 2', value: '2.2' },
        { label: 'verion 3', value: '3.3' },
        { label: 'version 4', value: '4.4' },
        { label: 'version 5', value: '5.5' }
    ]);
    const [openVersionDropDown, setOpenVersionDropDown] = useState(false);
    const [dropDownVersionValue, setDropDownVersionValue] = useState(null);
    const [amount, setAmount] = useState('')
    const [dropDownSalesPersonList, setDropDownSalesPersonList] = useState([
        { label: 'ABG GSG', value: '11' },
        { label: 'hgfhjd gvhgdh', value: '22' },
        { label: 'wyeuy ewgywegy', value: '33' },
        { label: 'ejwhjhghjd dchdvhc', value: '44' },
        { label: 'cdhjdbhbhv', value: '55' }
    ]);
    const [openSalesPersonDropDown, setOpenSalesPersonDropDown] = useState(false);
    const [dropDownSalesPersonValue, setDropDownSalesPersonValue] = useState(null);
    const [detailOrComment, setDetailOrComment] = useState('')
    const [followUpDate, setFollowUpDate] = useState('')
    const [isTimePickerVisibleFollowUp, setIsTimePickerVisibleFollowUp] = useState(false)
    const focus = useIsFocused()
    const infoData = useSelector((state) => state.infoReducer.infoArray)

    useEffect(() => {
        setLabName("");
        setOwnername("");
        setMobileNo("");
        setEmailId("");
        setAddress("");
        setDate("");
        setDropDownSOLValue(null);
        setDropDownSPNValue(null);
        setDropDownVersionValue(null);
        setAmount("");
        setDropDownSalesPersonValue(null);
        setDetailOrComment("");
        setFollowUpDate("");
    }, [focus])
    

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        const d = moment(date).format('DD-MM-YYYY')
        setDate(d);
        setIsTimePickerVisible(false);
    };

    const hideTimePicker = () => {
        setIsTimePickerVisible(false);
    }

    const handleConfirmForFollowup = (date) => {
        console.log("A date has been picked: ", date);
        const setDate = moment(date).format('DD-MM-YYYY')
        setFollowUpDate(setDate);
        setIsTimePickerVisibleFollowUp(false);
    };

    const hideTimePickerForFollowup = () => {
        setIsTimePickerVisibleFollowUp(false);
    }

    const onVersionSlection = (value) => {
        console.log("dropDownVersionValue", value)
        if (value == '1.1') {
            setAmount('111111')
        } else {
            if (value == '2.2') {
                setAmount('222222')
            } else {
                if (value == '3.3') {
                    setAmount('33333')
                } else {
                    if (value == '4.4') {
                        setAmount('44444')
                    } else {
                        setAmount("55555")
                    }
                }
            }
        }
    }

    const onSaveButtonPress = () => {
        console.log("onSaveButtonPress")
        // const vali = validation()

        // if (vali) {
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
        //}
    }

    const onSave = () => {
        actions.addnewInfo({
            //   firstName: firstName,
            //   lastName: lastName,
            //   dateOfBirth: Dob,
            //   photoUrl: photo,
            //   id: 1 + infoData.length,
            //   dropDownValue:dropDownValue
            labName: labName,
            ownerName: ownerName,
            mobileNo: mobileNo,
            emailId: emailId,
            address: address,
            date: date,
            dropDownSOLValue: dropDownSOLValue,
            dropDownSPNValue: dropDownSPNValue,
            dropDownVersionValue: dropDownVersionValue,
            amount: amount,
            detailOrComment: detailOrComment,
            followUpDate: followUpDate,
            id: 1 + infoData.length,
        })
        navigation.goBack()
    }

    const handlePhoneNumberChange = (text) => {
        // Block the '.' character from being entered
        const filteredText = text.replace(/[^0-9]/g, '')
        setMobileNo(filteredText);
      };

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView style={{ marginBottom: 20 }}>
                <View style={{ margin: 10, padding: 10,marginTop:-10 }}>
                    <TextInputComponent
                        text={'Lab Name'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={labName}
                        onChangeText={(text) => setLabName(text)}
                        mandatory={true}
                        placeholder='Enter Lab Name'
                    />
                    <TextInputComponent
                        text={'Owner Name'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={ownerName}
                        onChangeText={(text) => setOwnername(text)}
                        mandatory={true}
                        placeholder={'Enter Owner Name'}
                    />
                    <TextInputComponent
                        text={'Mobile No'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={mobileNo}
                        onChangeText={(text) => handlePhoneNumberChange(text)}
                        mandatory={true}
                        placeholder={'Enter Mobile No'}
                        maxLength={10}
                        keyboardType={'phone-pad'}
                    />
                    <TextInputComponent
                        text={'Email Id'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={emailId}
                        onChangeText={(text)=>setEmailId(text)}
                        mandatory={true}
                        placeholder={'Enter Email Id'}
                    />
                    <TextInputComponent
                        text={'Address'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        mandatory={true}
                        placeholder={'Enter Address'}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:20}}>
                        <Text style={[styles.textStyle, {
                            position: 'absolute',
                            top: -14,
                            left: 10,
                            zIndex: 100,
                            backgroundColor: 'white',
                            paddingHorizontal: 2
                        }]}>Date</Text>
                        <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, height: 47 }]}>
                            <View style={{ width: '85%' }}>
                                <TextInput
                                    style={[styles.textStyle, { fontWeight: 'normal' }]}
                                    value={date}
                                    placeholder='DD-MM-YYYY'
                                    editable={false}
                                />
                            </View>
                            <View style={{ width: '10%', marginLeft: 20, justifyContent: 'center' }}>
                                <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-ends' }}
                                    onPress={() => [setIsTimePickerVisible(true)]}
                                >
                                    <View style={{ justifyContent: 'flex-end' }}>
                                        <Feather name="calendar" size={20} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="date"
                                onConfirm={(d) => {
                                    console.log("on Time confirm");
                                    handleConfirm(d)
                                }}
                                maximumDate={new Date()}
                                onCancel={() => hideTimePicker()}
                            />
                        </View>
                    </View>
                    {/* <Text style={styles.textStyle}>Source of Lead List</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dropDownSOLList}
                            isFocus={openSOLDropDown}
                            onChange={item => {
                                setDropDownSOLValue(item.value);
                                setOpenSOLDropDown(false);
                            }}
                            onBlur={() => setOpenSOLDropDown(false)}
                            value={dropDownSOLValue}
                            onFocus={() => setOpenSOLDropDown(false)}
                            searchPlaceholder={'Search Source of Lead'}
                            placeholder={'Select Source of Lead'}
                            label={'Source of Lead List'}
                        />
                    </View>
                    {/* <Text style={styles.textStyle}>Source Person Name List</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dropDownSPNList}
                            isFocus={openSPNDropDown}
                            onChange={item => {
                                setDropDownSPNValue(item.value);
                                setOpenSPNDropDown(false);
                            }}
                            onBlur={() => setOpenSPNDropDown(false)}
                            value={dropDownSPNValue}
                            onFocus={() => setOpenSPNDropDown(false)}
                            searchPlaceholder={'Search Source Person Name'}
                            placeholder={'Select Source Person Name'}
                            label={'Source Person Name List'}
                        />
                    </View>
                    {/* <Text style={styles.textStyle}>Version List</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dropDownVersionList}
                            isFocus={openVersionDropDown}
                            onChange={item => {
                                setDropDownVersionValue(item.value);
                                setOpenVersionDropDown(false);
                                onVersionSlection(item.value)
                            }}
                            onBlur={() => setOpenVersionDropDown(false)}
                            value={dropDownVersionValue}
                            onFocus={() => setOpenVersionDropDown(false)}
                            searchPlaceholder={'Search Version'}
                            placeholder={'Select Version'}
                            label={'Version List'}
                        />
                    </View>
                    <TextInputComponent
                        text={'Amount'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={amount}
                        onChangeText={(text) => setAmount(text)}
                        placeholder={'Enter Amount'}
                    //mandatory={true}
                    />
                    {/* <Text style={styles.textStyle}>Sales Person Name</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dropDownSalesPersonList}
                            isFocus={openSalesPersonDropDown}
                            onChange={item => {
                                setDropDownSalesPersonValue(item.value);
                                setOpenSalesPersonDropDown(false);
                            }}
                            onBlur={() => setOpenSalesPersonDropDown(false)}
                            value={dropDownSalesPersonValue}
                            onFocus={() => setOpenSalesPersonDropDown(false)}
                            searchPlaceholder={'Search Sales Person Name'}
                            placeholder={'Select Sales Person Name'}
                            label={'Sales Person Name'}
                        />
                    </View>
                    <TextInputComponent
                        text={'Detail or Comment Required'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={detailOrComment}
                        onChangeText={(text) => setDetailOrComment(text)}
                        placeholder={'Enter Detail or Comment'}
                    //mandatory={true}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:20}}>
                        <Text style={[styles.textStyle, {
                            position: 'absolute',
                            top: -14,
                            left: 10,
                            zIndex: 100,
                            backgroundColor: 'white',
                            paddingHorizontal: 2
                        }]}>Follow up Date</Text>
                    <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, height: 47 }]}>
                        <View style={{ width: '85%' }}>
                            <TextInput
                                style={[styles.textStyle, { fontWeight: 'normal' }]}
                                value={followUpDate}
                                placeholder='DD-MM-YYYY'
                                editable={false}
                            />
                        </View>
                        <View style={{ width: '10%', marginLeft: 20, justifyContent: 'center' }}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-ends' }}
                                onPress={() => setIsTimePickerVisibleFollowUp(true)}
                            >
                                <View style={{ justifyContent: 'flex-end' }}>
                                    <Feather name="calendar" size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <DateTimePickerModal
                            isVisible={isTimePickerVisibleFollowUp}
                            mode="date"
                            onConfirm={(date) => {
                                console.log("on Time confirm");
                                handleConfirmForFollowup(date)
                            }}
                            minimumDate={new Date()}
                            onCancel={() => hideTimePickerForFollowup()}
                        />
                        </View>
                    </View>
                    <View style={{ marginTop: 40, backgroundColor: '#0096FF', height: 40, borderRadius: 20 }}>
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

export default DataEnterForm

const styles = StyleSheet.create({
    textStyle: {
        fontWeight: 'normal',
        color: '#000000',
        marginTop: 10,
        fontFamily:'Roboto'
    },
    inputBox: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 4,
        paddingLeft: 15,
        padding: 8,
    },
})