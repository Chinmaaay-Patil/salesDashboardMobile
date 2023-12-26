import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import { listData } from '../../Services/ListDataService';
import Feather from 'react-native-vector-icons/Feather'
import { Backdrop } from "react-native-backdrop";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const ListScreenPage = (props, { route, navigation, }) => {

  const [isLoading, setIsLoading] = useState(true)
  const infoData = useSelector((state) => state.infoReducer.infoArray)
  const listDataFromReducer = useSelector((state) => state.listDataStateReducer.listData)
  console.log("listData:-----", JSON.stringify(listDataFromReducer))
  const [visible, setVisible] = useState(false);
  const [fromDate, setFromDate] = useState('')
  const [isTimePickerVisibleForFromDate, setIsTimePickerVisibleForFromDate] = useState(false)
  const [toDate, setToDate] = useState('')
  const [isTimePickerVisibleForToDate, setIsTimePickerVisibleForToDate] = useState(false)


  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {
    setIsLoading(true)
    var d = new Date();
    const tempdate = d.setDate(d.getDate() - 7);
    const data = {
      fromDate: moment(tempdate).format('YYYY-MM-DD') + ' 00:00:01',
      toDate: moment(new Date).format('YYYY-MM-DD') + ' 00:00:01',
      salesPersonID: 0,
      versionID: 0,
      stateID: 0
    }
    try {
      setIsLoading(true)
      const response = await listData(data);
      console.log("dshgghgdshjgdsh", JSON.stringify(response))
      if (response.isRequestSuccessFull) {
        setIsLoading(false)
      }
      setVisible(false)
      // Handling the response data here
    } catch (error) {
      // Handling errors here
    }
  }

  const applyFilter = async () => {
    setIsLoading(true)
    const todateFormatting = moment(toDate).format('YYYY-MM-DD')
    const formdateFormatting = moment(fromDate).format('YYYY-MM-DD')
    const data = {
      fromDate: formdateFormatting + ' 00:00:01',
      toDate: todateFormatting + ' 00:00:01',
      salesPersonID: 0,
      versionID: 0,
      stateID: 0
    }
    try {
      const response = await listData(data);
      if (response.isRequestSuccessFull) {
        setIsLoading(false)
      }
      setVisible(false)
      // Handling the response data here
    } catch (error) {
      // Handling errors here
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

  const renderItem = (item) => {
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
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{moment(item.createddate).format('DD-MM-YYYY')}</Text>
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
              <Text style={styles.textStyle}>Source Person Name : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.salesPersonName}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Version : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.dropDownVersionValue ? item.dropDownVersionValue : ''}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Amount : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.projectedAmount}</Text>
            </View>
          </View>
          {
            item.photoUrl &&
            <View style={styles.profileImg}>

              <Image source={{ uri: item.photoUrl }}
                style={styles.profileImg} />

            </View>
          }
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
      {isLoading ?
        <ActivityIndicator color={"#000"} size="large" />
        :
        <View>
          <View style={{ marginLeft: 320 }}>
            <FilterModel />
          </View>
          {listDataFromReducer.length > 0 ?
            <FlatList
              data={listDataFromReducer}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={item => item.id}
            /> :
            <View style={{ alignSelf: 'center', marginTop: '50%' }}>
              <Image source={require('../../Assets/file-not-found.png')} style={{ width: 150, height: 150 }} />
              <Text style={[styles.textStyle, { marginTop: -18 }]}>NO DATA AVAILABLE !!</Text>
            </View>
          }

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
            <View style={{ height: 200 }}>
              <View style={{ paddingHorizontal: 10, width: '95%', margin: 10, flexDirection: 'row' }}>
                <View
                  style={{ width: '50%' }}
                >
                  <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>From Date :</Text>
                  <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, width: '95%' }]}>
                    <View style={{ width: '80%' }}>
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
                  style={{ width: '50%' }}
                >
                  <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>To Date :</Text>
                  <View style={[styles.inputBox, { flexDirection: 'row', padding: 0, width: '100%' }]}>
                    <View style={{ width: '80%' }}>
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
              </View>
              <View style={{ marginTop: 200 - 130, paddingHorizontal: 20, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ width: '48%' }} onPress={() => applyFilter()}>
                  <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#000', backgroundColor: '#0A57A7', width: '100%', padding: 10 }}>
                    <Text style={[styles.textStyle, { textAlign: 'center', color: '#fff' }]}>Apply</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '48%' }} onPress={() => { fetchData() }}>
                  <View style={{ borderRadius: 20, borderWidth: 1, borderColor: '#000', backgroundColor: '#fff', width: '100%', padding: 10 }}>
                    <Text style={[styles.buttontextStyle, { textAlign: 'center' }]}>Clear</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </Backdrop>
        </View>
      }
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