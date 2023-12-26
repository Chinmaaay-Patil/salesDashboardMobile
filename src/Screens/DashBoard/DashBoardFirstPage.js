import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'
import { Backdrop } from "react-native-backdrop";
import PieChartPage from './PieChartPage';
import BarChartPage from './BarChartPage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { DashBoardCardData } from '../../Services/DashBoardService';

const DashBoardFirstPage = ({ navigation }) => {

   const [visible, setVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(true)
   const [fromDate, setFromDate] = useState('')
   const [isTimePickerVisibleForFromDate, setIsTimePickerVisibleForFromDate] = useState(false)
   const [toDate, setToDate] = useState('')
   const [isTimePickerVisibleForToDate, setIsTimePickerVisibleForToDate] = useState(false)
   const infoData = useSelector((state) => state.infoReducer.infoArray)
   const dashBoardData = useSelector((state) => state.DashBoardReducer)

   useEffect(() => {
      fetchData();
   }, [])

   const fetchData = async () => {
      //setIsLoading(true)
      var d = new Date();
      const tempdate = d.setDate(d.getDate() - 7);
      const data = {
         fromDate: moment(tempdate).format('YYYY-MM-DD') + ' 00:00:01',
         toDate: moment(new Date).format('YYYY-MM-DD') + ' 00:00:01',
         salesPersonID: 0
      }
      try {
         const response = await DashBoardCardData(data);
         setVisible(false)
         if (response.isRequestSuccessFull) {
            setIsLoading(false)
         }
         // Handling the response data here
      } catch (error) {
         // Handling errors here
      }
   }

   const applyFilter = async () => {
     // setIsLoading(true)
      const todateFormatting = moment(toDate).format('YYYY-MM-DD')
      const formdateFormatting = moment(fromDate).format('YYYY-MM-DD')
      const data = {
         fromDate: formdateFormatting + ' 00:00:01',
         toDate: todateFormatting + ' 00:00:01',
         salesPersonID: 0
      }
      try {
         const response = await DashBoardCardData(data);
         setVisible(false)
         if (response.isRequestSuccessFull) {
            setIsLoading(false)
         }
         // Handling the response data here
      } catch (error) {
         // Handling errors here
      }
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

   const navigationToListScreen = (value, colorArray) => {
      const filter = infoData.filter((item) => item.dropDownSOLValue == value)
      console.log("filter", filter, value)
      navigation.navigate(
         "DashBoardFirst", {
         screen: "ListScreenPageForFilterData",
         params: {
            listData: filter,
            gradientColor: colorArray
         },
      }
      )
   }

   const getGradiantColor = (item) => {
      let array = []
      if (item.enquiryType == 'NewLead') {
         array.color = ['#E0D2FF', '#9678DC']
         array.image = require('../../Assets/customer-engagement.png')
         array.titleText = 'New Lead'
         return array
      } else {
         if (item.enquiryType == 'Quotation') {
            array.color = ['#F26462', '#F8B9BA']
            array.image = require('../../Assets/quotation.png')
            array.titleText = 'Quotation'
            return array
         } else {
            if (item.enquiryType == 'Demo') {
               array.color = ['#3763CC', '#94C3FF']
               array.image = require('../../Assets/demo.png')
               array.titleText = 'Demo'
               return array
            } else {

               array.color = ['#F5915A', '#FFC693']
               array.image = require('../../Assets/Group.png')
               array.titleText = 'Close Lead'
               return array

            }
         }
      }
   }


   return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
         {isLoading ?
            <ActivityIndicator color={"#000"} size="large" />
            :
            <View>
               <View style={{ marginLeft: 320 }}>
                  <FilterModel />
               </View>
               <ScrollView>
                  <View style={{ flexDirection: 'row' }}>
                     <TouchableOpacity onPress={() => navigationToListScreen('NewLead', ['#E0D2FF', '#9678DC'])}>
                        <LinearGradient colors={['#E0D2FF', '#9678DC']} style={styles.cardStyle}>
                           <Text style={styles.cardTitleText}>{'New Lead'}</Text>
                           <View style={styles.cardSubView}>
                              <Image source={require('../../Assets/customer-engagement.png')} style={styles.cardImageStyle} />
                              <Text style={styles.cardCountText}>{dashBoardData?.newLeadArray[0]?.count ? dashBoardData?.newLeadArray[0]?.count : 0}</Text>
                              <Text style={styles.cardSubText}>{0} Opportunities</Text>
                           </View>
                        </LinearGradient>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigationToListScreen('Quotation', ['#F26462', '#F8B9BA'])}>
                        <LinearGradient colors={['#F26462', '#F8B9BA']} style={styles.cardStyle}>
                           <Text style={styles.cardTitleText}>{'Quotation'}</Text>
                           <View style={styles.cardSubView}>
                              <Image source={require('../../Assets/quotation.png')} style={styles.cardImageStyle} />
                              <Text style={styles.cardCountText}>{dashBoardData?.quotationArray[0]?.count ? dashBoardData?.quotationArray[0]?.count : 0}</Text>
                              <Text style={styles.cardSubText}>{0} Opportunities</Text>
                           </View>
                        </LinearGradient>
                     </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                     <TouchableOpacity onPress={() => navigationToListScreen('Demo', ['#3763CC', '#94C3FF'])}>
                        <LinearGradient colors={['#3763CC', '#94C3FF']} style={styles.cardStyle}>
                           <Text style={styles.cardTitleText}>{'Demo'}</Text>
                           <View style={styles.cardSubView}>
                              <Image source={require('../../Assets/demo.png')} style={styles.cardImageStyle} />
                              <Text style={styles.cardCountText}>{dashBoardData?.demoArray[0]?.count ? dashBoardData?.demoArray[0]?.count : 0}</Text>
                              <Text style={styles.cardSubText}>{0} Opportunities</Text>
                           </View>
                        </LinearGradient>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => navigationToListScreen('CloseLead', ['#F5915A', '#FFC693'])}>
                        <LinearGradient colors={['#F5915A', '#FFC693']} style={styles.cardStyle}>
                           <Text style={styles.cardTitleText}>{'Close Lead'}</Text>
                           <View style={styles.cardSubView}>
                              <Image source={require('../../Assets/Group.png')} style={styles.cardImageStyle} />
                              <Text style={styles.cardCountText}>{dashBoardData?.closeLeadArray[0]?.count ? dashBoardData?.closeLeadArray[0]?.count : 0}</Text>
                              <Text style={styles.cardSubText}>{0} Opportunities</Text>
                           </View>
                        </LinearGradient>
                     </TouchableOpacity>
                  </View>
                  <View>

                     <PieChartPage
                        pieData={dashBoardData?.pieData}
                        subText1={dashBoardData?.pieData && dashBoardData?.pieData[0]?.value ? 'Total Amount: ' + dashBoardData.pieData[0].value + "%" : 0}
                        subText2={dashBoardData?.pieData && dashBoardData?.pieData[1]?.value ? 'Total Amount: ' + dashBoardData.pieData[1].value + "%" : 0}
                        innerCircleText1={'Count &'}
                        innerCircleText2={'Amount'}
                        graphTitle={'Sales growth by Market Segment'}
                        renderDotColor1={'#9A7DDE'}
                        renderDotColor2={'#3763CC'}
                     />


                  </View>
                  <View>
                     <BarChartPage
                        stackData={dashBoardData.stackData ? dashBoardData.stackData : []}
                        graphTitle={'Sales Per User'}
                     />
                  </View>
               </ScrollView>

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
                              <Text style={[styles.textStyle, { textAlign: 'center' }]}>Clear</Text>
                           </View>
                        </TouchableOpacity>
                     </View>
                  </View>
               </Backdrop>
            </View>
         }
      </View>
   )
}

export default DashBoardFirstPage

const styles = StyleSheet.create({
   cardStyle: { height: 180, width: 180, marginTop: 10, margin: 8, borderRadius: 20 },
   cardDivStyle: { height: '50%', alignItems: 'center', justifyContent: 'center' },
   cardTitleText: { padding: 20, fontWeight: '400', fontSize: 20, lineHeight: 17.3, color: '#FFFFFF', fontFamily: 'Robot-Thin' },
   cardSubView: { alignItems: 'center', alignContent: 'center', bottom: 10, paddingVertical: 10 },
   cardCountText: { fontFamily: 'Roboto-Medium', fontSize: 25, color: '#ffffff' },
   cardSubText: { fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ffffff' },
   cardImageStyle: { width: 50, height: 50, alignSelf: 'center' },
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
})