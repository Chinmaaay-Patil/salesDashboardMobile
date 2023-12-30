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
import { isNullOrEmpty } from '../../CommonFunctions/CommonFunction';
import { dataEnter } from '../../Services/DataEnterService';
import { DashBoardCardData } from '../../Services/DashBoardService';

const DataEnterForm = ({ navigation }) => {

    const [labName, setLabName] = useState('')
    const [ownerName, setOwnername] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [emailId, setEmailId] = useState('')
    const [address, setAddress] = useState('')
    const d = new Date;
    const dateString = d.toISOString();
    const [date, setDate] = useState(dateString)
    const [isTimePickerVisible, setIsTimePickerVisible] = useState(false)
    const [openSOLDropDown, setOpenSOLDropDown] = useState(false);
    const [dropDownSOLValue, setDropDownSOLValue] = useState(null);
    const [openSPNDropDown, setOpenSPNDropDown] = useState(false);
    const [dropDownSPNValue, setDropDownSPNValue] = useState(null);
    const [openVersionDropDown, setOpenVersionDropDown] = useState(false);
    const [dropDownVersionValue, setDropDownVersionValue] = useState(null);
    const [amount, setAmount] = useState(null)
    const [openSalesPersonDropDown, setOpenSalesPersonDropDown] = useState(false);
    const [dropDownSalesPersonValue, setDropDownSalesPersonValue] = useState(null);
    const [detailOrComment, setDetailOrComment] = useState('')
    const [followUpDate, setFollowUpDate] = useState("")
    const [isTimePickerVisibleFollowUp, setIsTimePickerVisibleFollowUp] = useState(false)
    const focus = useIsFocused()
    const [height, setHeight] = useState(38)
    const [addressHeight, setAddressHeight] = useState(38)
    const dashBoardData = useSelector((state) => state.DashBoardReducer)
    const [comment, setComment] = useState('')
    const [commentHeight, setCommentHeight] = useState(38)
    const [openStateIDropDown, setOpenStateIDDropDown] = useState(false);
    const [dropDownStateIDValue, setDropDownStateIDValue] = useState(null);
    //console.log("dashBoardDatadashBoardData", dashBoardData)

    useEffect(() => {
        setLabName("");
        setOwnername("");
        setMobileNo("");
        setEmailId("");
        setAddress("");
        const d = new Date(date);
        const dateString = d.toISOString();
        setDate(dateString);
        setDropDownSOLValue(null);
        setDropDownSPNValue(null);
        setDropDownVersionValue(null);
        setAmount(null);
        setDropDownSalesPersonValue(null);
        setDetailOrComment("");
        setComment("");
        setFollowUpDate("");
        setHeight(38);
        setAddressHeight(38);
        setDropDownStateIDValue(null)
    }, [focus])

    const fetchDataForDashBoard = async () => {

        const data = {
            fromDate: dashBoardData?.filterDataArray?.fromdate ? dashBoardData.filterDataArray.fromdate + ' 00:00:01' : moment(new Date).format("YYYY-MM-DD") + ' 00:00:01',
            toDate: dashBoardData?.filterDataArray?.todate ? dashBoardData.filterDataArray.todate + ' 23:59:59' : moment(new Date).format("YYYY-MM-DD") + ' 23:59:59',
            salesPersonID: 0
        }

        try {
            //setIsLoading(true)
            const response = await DashBoardCardData(data);
            if (response.isRequestSuccessFull) {
                //setIsLoading(false)
            } else {
                //setIsLoading(false)
                //Alert.alert("Error", response.error.message ? response.error.message : "")
            }
            // Handling the response data here
        } catch (error) {
            // Handling errors here
            console.log("catch", error)
            Alert.alert("Catch Error")
        }
    }

    const handleConfirm = (date) => {
        console.log("A date has been picked: ", typeof date, typeof moment(date));
        const d = new Date(date);
        const dateString = d.toISOString();
        setDate(dateString);
        setIsTimePickerVisible(false);
    };

    const hideTimePicker = () => {
        setIsTimePickerVisible(false);
    }

    const handleConfirmForFollowup = (date) => {
        console.log("A date has been picked: ", date);
        const d = new Date(date);
        const dateString = d.toISOString();
        setFollowUpDate(dateString);
        setIsTimePickerVisibleFollowUp(false);
    };

    const hideTimePickerForFollowup = () => {
        setIsTimePickerVisibleFollowUp(false);
    }

    const onVersionChange = (item) => {
        setAmount(item.estimatedCost)
        setDropDownVersionValue(item)
        setOpenVersionDropDown(false);
    }

    const validation = () => {
        console.log("validation")
        let isValid = false;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (isNullOrEmpty(labName) && isNullOrEmpty(ownerName) && isNullOrEmpty(mobileNo) && isNullOrEmpty(emailId) && isNullOrEmpty(dropDownStateIDValue)) {
            Alert.alert('Please Enter All required fields')
        } else {
            if (isNullOrEmpty(labName)) {
                Alert.alert('Please Enter Lab Name')
            } else {
                if (isNullOrEmpty(ownerName)) {
                    Alert.alert('Please Enter Owner Name')
                } else {
                    if (isNullOrEmpty(mobileNo)) {
                        Alert.alert('Please Enter Mobile No')
                    } else {
                        if (isNullOrEmpty(emailId)) {
                            Alert.alert('Please Enter EmailId')
                        } else {
                            if (reg.test(emailId) === false) {
                                Alert.alert('Please Enter correct EmailId')
                            } else {
                                if (isNullOrEmpty(amount)) {
                                    Alert.alert('Please Enter Amount')
                                } else {
                                    if (isNullOrEmpty(dropDownSalesPersonValue)) {
                                        Alert.alert('Please Select Sales Person Name')
                                    } else {
                                        if (isNullOrEmpty(dropDownStateIDValue)) {
                                            Alert.alert('Please Select State Id')
                                        } else {
                                            console.log('Validation done')
                                            isValid = true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log("isvalid", isValid)
        return isValid;
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

    const onSave = async () => {
        console.log("date:======", typeof date, new Date(date), JSON.stringify(date))
        const data = {
            "labName": labName,
            "ownerName": ownerName,
            "mobile": mobileNo,
            "email": emailId,
            "address": address,
            "createddate": date,
            "sourceId": dropDownSPNValue?.spid ? dropDownSPNValue?.spid : 0,
            "projectedAmount": amount,
            "requirement": detailOrComment,
            "comment": comment,
            "followupdate": followUpDate,
            "salesPersonId": dropDownSalesPersonValue?.sid ? dropDownSalesPersonValue.sid : 0,
            "versionId": dropDownVersionValue?.vid ? dropDownVersionValue.vid : 0,
            "stateId": dropDownStateIDValue?.stid ? dropDownStateIDValue?.stid : 0,
            // "attachments": "",
            // "vesionName": "",
            // "salesPersonName": "",
            // "stateName": ""
        }
        const result = await dataEnter(data)
        console.log("result on save :===", JSON.stringify(result))
        if (result.isRequestSuccessFull) {
            Alert.alert(
                'Save!',
                'Successfull',
                [
                    {
                        text: 'OK',
                        onPress: () => [fetchDataForDashBoard(), navigation.navigate('DashBoardFirst')],
                        style: 'cancel',
                    },
                    {
                        text: 'Done',
                        onPress: () => [fetchDataForDashBoard(), navigation.navigate('DashBoardFirst')],
                        style: 'cancel',
                    },
                ],
            );
        } else {
            Alert.alert(
                'Save!',
                'Unsuccessfull',
                [
                    {
                        text: 'Ok',
                        onPress: () => { navigation.navigate('DashBoardFirst') },
                        style: 'cancel',
                    },
                    {
                        text: 'Done',
                        onPress: () => { },
                        style: 'cancel',
                    },
                ],
            );
        }

    }

    const handlePhoneNumberChange = (text) => {
        // Block the '.' character from being entered
        const filteredText = text.replace(/[^0-9]/g, '')
        setMobileNo(filteredText);
    };

    useEffect(() => {
        //setAmount(dropDownSalesPersonValue?.estimatedCost)
    }, [dropDownVersionValue])


    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <ScrollView style={{ marginBottom: 20 }}>
                <View style={{ margin: 10, padding: 10, marginTop: -10 }}>
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
                        onChangeText={(text) => setEmailId(text)}
                        mandatory={true}
                        placeholder={'Enter Email Id'}
                    />
                    <TextInputComponent
                        text={'Address'}
                        textStyle={styles.textStyle}
                        textInputStyle={[styles.inputBox, { height: addressHeight }]}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        //mandatory={true}
                        placeholder={'Enter Address'}
                        onContentSizeChange={e => setAddressHeight(e.nativeEvent.contentSize.height)}
                    />
                    <View style={styles.datemainViewStyle}>
                        <Text style={[styles.textStyle, styles.dateInputStyle]}>
                            {/* <Text style={{ color: 'red' }}>* </Text> */}
                            Date</Text>
                        <View style={[styles.inputBox, styles.dateViewStyle]}>
                            <View style={{ width: '85%' }}>
                                <TextInput
                                    style={[styles.textStyle, { fontWeight: 'normal', paddingVertical: 6 }]}
                                    value={date ? moment(date).format('DD-MM-YYYY') : date}
                                    placeholder='DD-MM-YYYY'
                                    editable={false}
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                            <View style={styles.dateTouchView}>
                                <TouchableOpacity style={styles.dateTouchableStyle}
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
                                    handleConfirm(d)
                                }}
                                maximumDate={new Date()}
                                onCancel={() => hideTimePicker()}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dashBoardData.stateIDList}
                            isFocus={openStateIDropDown}
                            onChange={item => {
                                console.log("item", item)
                                setDropDownStateIDValue(item);
                                setOpenStateIDDropDown(false);
                            }}
                            onBlur={() => setOpenStateIDDropDown(false)}
                            value={dropDownStateIDValue}
                            onFocus={() => setOpenStateIDDropDown(false)}
                            searchPlaceholder={'Search State ID'}
                            placeholder={'Select State ID'}
                            label={'State ID'}
                            labelField={"stateName"}
                            valueField={"stid"}
                            mandatory={true}
                        />
                    </View>
                    {/* <Text style={styles.textStyle}>Source of Lead List</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dashBoardData.sourceLeadNameList}
                            isFocus={openSOLDropDown}
                            onChange={item => {
                                setDropDownSOLValue(item);
                                setOpenSOLDropDown(false);
                            }}
                            onBlur={() => setOpenSOLDropDown(false)}
                            value={dropDownSOLValue}
                            onFocus={() => setOpenSOLDropDown(false)}
                            searchPlaceholder={'Search Source of Lead'}
                            placeholder={'Select Source of Lead'}
                            label={'Source of Lead List'}
                            labelField={"sourceName"}
                            valueField={"sid"}
                        />
                    </View>
                    {/* <Text style={styles.textStyle}>Source Person Name List</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dashBoardData.sourcePersonNameList}
                            isFocus={openSPNDropDown}
                            onChange={item => {
                                setDropDownSPNValue(item);
                                setOpenSPNDropDown(false);
                            }}
                            onBlur={() => setOpenSPNDropDown(false)}
                            value={dropDownSPNValue}
                            onFocus={() => setOpenSPNDropDown(false)}
                            searchPlaceholder={'Search Source Person Name'}
                            placeholder={'Select Source Person Name'}
                            label={'Source Person Name List'}
                            labelField={"sourcePersonName"}
                            valueField={"spid"}
                        />
                    </View>
                    {/* <Text style={styles.textStyle}>Version List</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dashBoardData.versionList}
                            isFocus={openVersionDropDown}
                            onChange={item => {
                                console.log("item", item.estimatedCost)
                                onVersionChange(item)
                            }}
                            onBlur={() => setOpenVersionDropDown(false)}
                            value={dropDownVersionValue}
                            onFocus={() => setOpenVersionDropDown(false)}
                            searchPlaceholder={'Search Version'}
                            placeholder={'Select Version'}
                            label={'Version List'}
                            labelField={"vesionName"}
                            valueField={"vid"}
                        />
                    </View>
                    <TextInputComponent
                        text={'Amount'}
                        textStyle={styles.textStyle}
                        textInputStyle={styles.inputBox}
                        value={amount !== null ? amount.toString() : ''}
                        onChangeText={(text) => setAmount(text)}
                        placeholder={'Enter Amount'}
                        mandatory={true}
                        keyboardType={'phone-pad'}
                    />
                    {/* <Text style={styles.textStyle}>Sales Person Name</Text> */}
                    <View style={{ marginTop: 20 }}>
                        <DropdownComponent
                            data={dashBoardData.salesPersonList}
                            isFocus={openSalesPersonDropDown}
                            onChange={item => {
                                console.log("item", item)
                                setDropDownSalesPersonValue(item);
                                setOpenSalesPersonDropDown(false);
                            }}
                            onBlur={() => setOpenSalesPersonDropDown(false)}
                            value={dropDownSalesPersonValue}
                            onFocus={() => setOpenSalesPersonDropDown(false)}
                            searchPlaceholder={'Search Sales Person Name'}
                            placeholder={'Select Sales Person Name'}
                            label={'Sales Person Name'}
                            labelField={"salesPersonName"}
                            valueField={"sid"}
                            mandatory={true}
                        />
                    </View>
                    <TextInputComponent
                        text={'Detail'}
                        textStyle={styles.textStyle}
                        textInputStyle={[styles.inputBox, { height: height }]}
                        value={detailOrComment}
                        onChangeText={(text) => setDetailOrComment(text)}
                        placeholder={'Enter Detail or Comment'}
                        //mandatory={true}
                        numberOfLines={4}
                        onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
                    />
                    <TextInputComponent
                        text={'Comment Required'}
                        textStyle={styles.textStyle}
                        textInputStyle={[styles.inputBox, { height: commentHeight }]}
                        value={comment}
                        onChangeText={(text) => setComment(text)}
                        placeholder={'Enter Comment'}
                        //mandatory={true}
                        numberOfLines={4}
                        onContentSizeChange={e => setCommentHeight(e.nativeEvent.contentSize.height)}
                    />
                    <View style={styles.datemainViewStyle}>
                        <Text style={[styles.textStyle, styles.dateInputStyle]}>
                            {/* <Text style={{ color: 'red' }}>* </Text> */}
                            Follow up Date</Text>
                        <View style={[styles.inputBox, styles.dateViewStyle]}>
                            <View style={{ width: '85%' }}>
                                <TextInput
                                    style={[styles.textStyle, { fontWeight: 'normal', paddingVertical: 6 }]}
                                    value={followUpDate ? moment(followUpDate).format('DD-MM-YYYY') : followUpDate}
                                    placeholder='DD-MM-YYYY'
                                    editable={false}
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                            <View style={styles.dateTouchView}>
                                <TouchableOpacity style={styles.dateTouchableStyle}
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
                                    handleConfirmForFollowup(date)
                                }}
                                minimumDate={new Date()}
                                onCancel={() => hideTimePickerForFollowup()}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 40, backgroundColor: '#0A57A7', height: 40, borderRadius: 10 }}>
                        <TouchableOpacity style={{ alignItems: 'center', alignContent: 'center' }}
                            onPress={() => onSaveButtonPress()}
                        >
                            <Text style={[styles.textStyle, { marginTop: 8, fontSize: 20, color: '#FFFFFF', fontWeight: '500', fontSize: 14 }]}>SAVE</Text>
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
        fontWeight: '400',
        color: '#000000',
        marginTop: 10,
        fontFamily: 'Roboto',
        fontSize: 12
    },
    inputBox: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 4,
        paddingLeft: 15,
        padding: 8,
        height: 38,
        fontWeight: '400',
        color: '#000000',
        fontFamily: 'Roboto',
        fontSize: 12
    },
    dateInputStyle: {
        position: 'absolute',
        top: -14,
        left: 10,
        zIndex: 100,
        backgroundColor: 'white',
        paddingHorizontal: 2
    },
    dateTouchableStyle: {
        justifyContent: 'center',
        alignSelf: 'flex-ends'
    },
    dateViewStyle: {
        flexDirection: 'row',
        padding: 0,
        height: 38
    },
    datemainViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    dateTouchView: {
        width: '10%',
        marginLeft: 20,
        justifyContent: 'center'
    }
})