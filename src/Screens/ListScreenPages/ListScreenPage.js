import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Image, TouchableOpacity, ActivityIndicator, Platform, Alert, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import { listData } from '../../Services/ListDataService';
import Feather from 'react-native-vector-icons/Feather'
import { Backdrop } from "react-native-backdrop";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';
import DropdownComponent from '../../CommonComponent/DropDownComponent';

const ListScreenPage = (props, { route, navigation, }) => {

  const [isLoading, setIsLoading] = useState(false)
  const listDataFromReducer = useSelector((state) => state.listDataStateReducer.listData)
  const [visible, setVisible] = useState(false);
  const [fromDate, setFromDate] = useState('')
  const [isTimePickerVisibleForFromDate, setIsTimePickerVisibleForFromDate] = useState(false)
  const [toDate, setToDate] = useState('')
  const [isTimePickerVisibleForToDate, setIsTimePickerVisibleForToDate] = useState(false)
  const [openVersionDropDown, setOpenVersionDropDown] = useState(false);
  const [dropDownVersionValue, setDropDownVersionValue] = useState(null);
  const [openSalesPersonDropDown, setOpenSalesPersonDropDown] = useState(false);
  const [dropDownSalesPersonValue, setDropDownSalesPersonValue] = useState(null);
  const [openStateIDropDown, setOpenStateIDDropDown] = useState(false);
  const [dropDownStateIDValue, setDropDownStateIDValue] = useState(null);
  const dashBoardData = useSelector((state) => state.DashBoardReducer)


  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {
    onClearData()
    //setIsLoading(true)
    var d = new Date();
    //const tempdate = d.setDate(d.getDate() - 7);
    const data = {
      // fromDate: moment(new Date).format('YYYY-MM-DD') + ' 00:00:01',
      // toDate: moment(new Date).format('YYYY-MM-DD') + ' 23:59:59',
      fromDate: "",
      toDate: "",
      salesPersonID: 0,
      versionID: 0,
      stateID: 0
    }
    try {
      //setIsLoading(true)
      const response = await listData(data);
      //console.log("fetchData result:-", JSON.stringify(response))
      if (response.isRequestSuccessFull) {
        setIsLoading(false)
      } else {
        setIsLoading(false)
        Alert.alert("Error", response.error.message ? response.error.message : "")
      }
      setVisible(false)
      // Handling the response data here
    } catch (error) {
      // Handling errors here
      Alert.alert("Catch Error")
    }
  }

  const onClearData = () =>{
    setFromDate('');
    setToDate('')
    setDropDownVersionValue(null)
    setDropDownSalesPersonValue(null)
    setDropDownStateIDValue(null)
  }

  const applyFilter = async () => {

    const todateFormatting = moment(toDate).format('YYYY-MM-DD')
    const formdateFormatting = moment(fromDate).format('YYYY-MM-DD')
    const data = {
      fromDate: fromDate ? formdateFormatting + ' 00:00:01' : "",
      toDate: toDate ? todateFormatting + ' 23:59:59' : "",
      salesPersonID: dropDownSalesPersonValue?.sid ? dropDownSalesPersonValue?.sid : 0,
      versionID: dropDownVersionValue?.vid ? dropDownVersionValue?.vid : 0,
      stateID: dropDownStateIDValue?.stid ? dropDownStateIDValue?.stid : 0
    }
    //console.log("datatatattatatatattat",data)
    try {
      //setIsLoading(true)
      const response = await listData(data);
      if (response.isRequestSuccessFull) {
        setIsLoading(false)
      } else {
        setIsLoading(false)
        Alert.alert("Error", response.error.message ? response.error.message : "")
      }
      setVisible(false)
      // Handling the response data here
    } catch (error) {
      // Handling errors here
      Alert.alert("Catch Error")
    }
  }

  const gradientBackGroundColor = (value) => {
    if (value == 'Demo') {
      return ['#3763CC', '#94C3FF']
    } else {
      if (value == 'New Lead') {
        return ['#E0D2FF', '#9678DC']
      } else {
        if (value == 'Closed Leads') {
          return ['#F5915A', '#FFC693']
        } else {
          if (value == 'Quotation') {
            return ['#F26462', '#F8B9BA']
          } else {
            return ['#D3D3D3', '#BDBDBD']
          }
        }
      }
    }
  }

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message:
            'For Downloading pdf ,App needs access to your storage space',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
        return true
      } else {
        console.log('Storage permission denied');
        return false
      }
    } catch (error) {
      console.error('Error requesting storage permission: ', error);
    }
  };

  const onDownloadPDF = async (url, fileName) => {
    const permission = await requestStoragePermission()
    //console.log("permission value:--",permission)
    if (permission) {
      console.log("onDownloadPDF", url, fileName)
      const { config, fs } = RNFetchBlob;
      const downloads = fs.dirs.DownloadDir;
      const file_path = `${downloads}/${fileName}`;

      try {
        const response = await config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: file_path,
            description: 'Downloading PDF file',
          },
        }).fetch('GET', url);

        console.log('File downloaded to: ', response.path());
      } catch (error) {
        console.error('Error downloading file: ', error);
      }
    } else {
      Alert.alert('Stoarge Permission denied')
    }
  }

  const renderItem = (item) => {
    // const pdfUrl = 'https://www.example.com/path-to-your-pdf.pdf';
    // const pdfFileName = item.labName + "_" + item.ownerName + "_" + 'downloaded_file.pdf';
    return (
      <LinearGradient colors={gradientBackGroundColor(item.stateName)} style={{ width: '96%', backgroundColor: '#87CEEB', padding: 10, alignSelf: 'center', borderRadius: 10, margin: 4 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Lab Name : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.labName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Owner Name : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.ownerName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Date : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{moment(item.createddate).format('YYYY-MM-DD')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Mobile No : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.mobile}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Email Id : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.email}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Address : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.address}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Sales Person Name : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.salesPersonName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Version : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.vesionName ? item.vesionName : ''}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Amount : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.projectedAmount}</Text>
            </View>
          </View>
          {/* <View style={{ flexDirection: 'row', padding: 10 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
              // onPress={() =>
              //   onDownloadPDF(pdfUrl, pdfFileName)
              // }
            >
              <Feather name="download" size={15} color={'#000'} />
              <Text style={[{ color: '#000000', fontSize: 12 }]}> Download pdf</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </LinearGradient>
    )
  }

  const FilterModel = () => {
    return (
      <View style={{ flexDirection: 'row', marginRight: 20 }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          onPress={() => setVisible(true)}
        >
          <Feather name="filter" size={20} color={'#000'} />
          <Text style={[{ color: '#000000', fontSize: 18 }]}>Filter</Text>
        </TouchableOpacity>
      </View>
    )
  }



  const handleConfirmForFromDate = (date) => {
    console.log("A date has been picked for From Date: ", date);
    const setDate = moment(date).format('YYYY-MM-DD')
    setFromDate(setDate);
    setIsTimePickerVisibleForFromDate(false);
  };

  const hideTimePickerForFromDate = () => {
    setIsTimePickerVisibleForFromDate(false);
  }

  const handleConfirmForToDate = (date) => {
    console.log("A date has been picked for From Date: ", date);
    const setDate = moment(date).format('YYYY-MM-DD')
    setToDate(setDate);
    setIsTimePickerVisibleForToDate(false);
  };

  const hideTimePickerForToDate = () => {
    setIsTimePickerVisibleForToDate(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading &&
        <ActivityIndicator color={"#000"} size="large" />
      }
      <View>
        <View style={{ marginLeft: 320 }}>
          <FilterModel />
        </View>
        {listDataFromReducer.length > 0 ?
          <FlatList
            data={listDataFromReducer}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={item => item.id}
            style={{ marginBottom: 30 }}
          /> :
          <View style={{ alignSelf: 'center', marginTop: '50%' }}>
            <Image source={require('../../Assets/file_not_found.jpg')} style={{ width: 150, height: 150 }} />
            <Text style={[styles.textStyle, { marginTop: -18 }]}>NO DATA AVAILABLE !!</Text>
          </View>
        }
      </View>

      <Backdrop
        visible={visible}
        handleOpen={() => setVisible(true)}
        handleClose={() => setVisible(false)}
        onClose={() => { }}
        swipeConfig={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        animationConfig={{
          speed: 14,
          bounciness: 4,
        }}
        overlayColor="rgba(0,0,0,0.32)"
        backdropStyle={{
          backgroundColor: '#fff',
        }}>
        <View style={{ height: 400 }}>
          {/* <ScrollView> */}
          <View style={{ paddingHorizontal: 10, width: '95%', margin: 10 }}>
            <View
              style={{ width: '100%' }}
            >
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>From Date :</Text>
              <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, width: '100%' }]}>
                <View style={{ width: '90%' }}>
                  <TextInput
                    style={[styles.textStyle, { fontWeight: 'normal' }]}
                    value={fromDate}
                    placeholder='YYYY-MM-DD'
                    editable={false}
                  />
                </View>
                <View style={{ width: '14%', justifyContent: 'center' }}>
                  <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-ends' }}
                    onPress={() => setIsTimePickerVisibleForFromDate(true)}
                  >
                    <View style={{ justifyContent: 'flex-end' }}>
                      <Feather name="calendar" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isTimePickerVisibleForFromDate}
                  mode="date"
                  onConfirm={(date) => {
                    handleConfirmForFromDate(date)
                  }}
                  //maximumDate={new Date()}
                  onCancel={() => hideTimePickerForFromDate()}
                />
              </View>
            </View>
            <View
              style={{ width: '100%' }}
            >
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>To Date :</Text>
              <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, width: '100%' }]}>
                <View style={{ width: '90%' }}>
                  <TextInput
                    style={[styles.textStyle, { fontWeight: 'normal' }]}
                    value={toDate}
                    placeholder='YYYY-MM-DD'
                    editable={false}
                  />
                </View>
                <View style={{ width: '14%', justifyContent: 'center' }}>
                  <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'flex-ends' }}
                    onPress={() => setIsTimePickerVisibleForToDate(true)}
                  >
                    <View style={{ justifyContent: 'flex-end' }}>
                      <Feather name="calendar" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
                <DateTimePickerModal
                  isVisible={isTimePickerVisibleForToDate}
                  mode="date"
                  onConfirm={(date) => {
                    handleConfirmForToDate(date)
                  }}
                  //maximumDate={new Date()}
                  onCancel={() => hideTimePickerForToDate()}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <DropdownComponent
                data={dashBoardData.versionList}
                isFocus={openVersionDropDown}
                onChange={item => {
                  setDropDownVersionValue(item);
                  setOpenVersionDropDown(false);
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
              />
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
              />
            </View>
          </View>
          {/* </ScrollView> */}
          <View style={{ marginTop: 10, paddingHorizontal: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{ width: '48%' }} onPress={() => applyFilter()}>
              <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#000', backgroundColor: '#0A57A7', width: '100%', padding: 10 }}>
                <Text style={[styles.textStyle, { textAlign: 'center', color: '#fff' }]}>Apply</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '48%' }} onPress={() => { fetchData() }}>
              <View style={{ borderRadius: 10, borderWidth: 1, borderColor: '#000', backgroundColor: '#fff', width: '100%', padding: 10 }}>
                <Text style={[styles.textStyle, { textAlign: 'center' }]}>Clear</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Backdrop>
    </SafeAreaView>
  )
}

export default ListScreenPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
    backgroundColor: 'white'
  },
  textStyle: {
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10
  },
  title: {
    fontSize: 32,
  },
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
    color: '#000000'
  },
  inputBox: {
    width: '40%',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
    paddingLeft: 15,
    padding: 12,
    height: 38,
    borderColor: 'gray'
  },
});