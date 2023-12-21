import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'
import { Backdrop } from "react-native-backdrop";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { StackedBarChart, XAxis, YAxis } from 'react-native-svg-charts';

const DashBoardFirstPage = ({ navigation }) => {

   const [visible, setVisible] = useState(false);
   const [modal, setModal] = useState(false)
   const infoData = useSelector((state) => state.infoReducer.infoArray)
   console.log("info screen in dash screen------", infoData)

   const pieData = [
      {
         value: 47, color: '#987BDD', gradientCenterColor: '#CDBDF1',
         //focused: true,
      },
      { value: 40, color: '#3763CC', gradientCenterColor: '#94C3FF' },
   ];
   const stackData = [
      {
         stacks: [
            { value: 10, color: '#F26462' },
            { value: 20, color: '#F5915A', marginBottom: 2 },
         ],
         label: 'Person 1',
      },
      {
         stacks: [
            { value: 11, color: '#F26462', },
            { value: 10, color: '#F5915A', marginBottom: 2 },
         ],
         label: 'Person 2',
      },
      {
         stacks: [
            { value: 14, color: '#F26462' },
            { value: 18, color: '#F5915A', marginBottom: 2 },
         ],
         label: 'Person 3',
      }
   ];

   const data = [
      {
         month: 'Jan',
         Person1: 5,
         Person2: 8,
      },
      {
         month: 'Feb',
         Person1: 15,
         Person2: 12,
      },
      {
         month: 'Mar',
         Person1: 20,
         Person2: 33,
      },
      {
         month: 'Apr',
         Person1: 10,
         Person2: 15,
      },
      {
         month: 'May',
         Person1: 16,
         Person2: 12,
      },
      {
         month: 'Jun',
         Person1: 19,
         Person2: 13,
      },
      {
         month: 'Jul',
         Person1: 10,
         Person2: 19,
      },
      {
         month: 'Aug',
         Person1: 15,
         Person2: 12,
      },
      {
         month: 'Sept',
         Person1: 15,
         Person2: 12,
      },
      {
         month: 'Otc',
         Person1: 20,
         Person2: 40,
      },
      {
         month: 'Nov',
         Person1: 20,
         Person2: 12,
      },
      {
         month: 'Dec',
         Person1: 30,
         Person2: 20,
      },
      // Add more data for each month and person as needed
   ];
   const colors = ['#F26462', '#F5915A']; // Colors for each person

   const keys = ['Person1', 'Person2']; // Keys for the persons

   // Extracting labels for X axis
   const labels = data.map(item => item.month);

   // Finding the maximum value for the Y axis
   const maxVal = Math.max(...data.map(item => Math.max(...keys.map(key => item[key]))));



   useEffect(() => {
      navigation.setOptions({
         headerRight: () => <View style={{ flexDirection: 'row', marginRight: 10 }}>
            <AddEnquiry />
         </View>,
      })
   }, []);

   const AddEnquiry = () => {
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

   const navigationToListScreen = (value) => {
      const filter = infoData.filter((item) => item.dropDownSOLValue == value)
      console.log("filter", filter)
      navigation.navigate(
         "ListScreenThird", {
         screen: "ListScreenPage",
         params: {
            listData: filter,
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

   const handleOpen = () => {
      setVisible(true);
   };

   const handleClose = () => {
      setVisible(false);
   };

   const renderDot = color => {
      return (
         <View
            style={{
               height: 20,
               width: 20,
               borderRadius: 5,
               backgroundColor: color,
               marginRight: 10,
            }}
         />
      );
   };

   const renderLegendComponent = () => {
      return (
         <>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
               <View
                  style={{
                     flexDirection: 'row',
                     alignItems: 'center',
                     width: 120,
                     marginRight: 30,
                  }}>
                  {renderDot('#9A7DDE')}
                  <Text style={{ color: '#000000' }}>Total Count: 40%</Text>
               </View>
               <View
                  style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                  {renderDot('#3763CC')}
                  <Text style={{ color: '#000000' }}>Total Amount: 3%</Text>
               </View>
            </View>
         </>
      );
   };


   return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
         <View style={{ marginLeft: 320 }}>
            <AddEnquiry />
         </View>

         {/* <ScrollView
            horizontal={true}
            persistentScrollbar={true}
         >

            <View style={{ width: 800, height: 130, alignItems: 'center', flexDirection: 'row', marginTop: 20 }}>
               {
                  data.map((item, index) => {
                     const gradiantColor = getGradiantColor(item)
                     return (

                        <TouchableOpacity
                           //style={styles.cardStyle}
                           onPress={() => navigationToListScreen(item.enquiryType)}
                        >
                           <LinearGradient colors={gradiantColor.color} style={styles.cardStyle}>
                              <Text style={{ padding: 20, fontWeight: '400', fontSize: 20, lineHeight: 17.3, color: '#FFFFFF', fontFamily: 'Robot-Thin' }}>{gradiantColor.titleText}</Text>
                              <View style={{ alignItems: 'center', alignContent: 'center', bottom: 10, paddingVertical: 10 }}>
                                 <Image source={gradiantColor.image} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                                 <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 25, color: '#ffffff' }}>{item.count}</Text>
                                 <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ffffff' }}>{item.opportunitiesCount} Opportunities</Text>
                              </View>
                           </LinearGradient>
                        </TouchableOpacity>

                     )
                  })
               }
            </View>
         </ScrollView> */}
         <ScrollView>
            <View style={{ flexDirection: 'row' }}>
               <TouchableOpacity
                  //style={styles.cardStyle}
                  onPress={() => navigationToListScreen('NewLead')}
               >
                  <LinearGradient colors={['#E0D2FF', '#9678DC']} style={styles.cardStyle}>
                     <Text style={{ padding: 20, fontWeight: '400', fontSize: 20, lineHeight: 17.3, color: '#FFFFFF', fontFamily: 'Robot-Thin' }}>{'New Lead'}</Text>
                     <View style={{ alignItems: 'center', alignContent: 'center', bottom: 10, paddingVertical: 10 }}>
                        <Image source={require('../../Assets/customer-engagement.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 25, color: '#ffffff' }}>{'2,333'}</Text>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ffffff' }}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
               <TouchableOpacity
                  //style={styles.cardStyle}
                  onPress={() => navigationToListScreen('Quotation')}
               >
                  <LinearGradient colors={['#F26462', '#F8B9BA']} style={styles.cardStyle}>
                     <Text style={{ padding: 20, fontWeight: '400', fontSize: 20, lineHeight: 17.3, color: '#FFFFFF', fontFamily: 'Robot-Thin' }}>{'Quotation'}</Text>
                     <View style={{ alignItems: 'center', alignContent: 'center', bottom: 10, paddingVertical: 10 }}>
                        <Image source={require('../../Assets/quotation.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 25, color: '#ffffff' }}>{'4,123'}</Text>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ffffff' }}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
               <TouchableOpacity
                  //style={styles.cardStyle}
                  onPress={() => navigationToListScreen('Demo')}
               >
                  <LinearGradient colors={['#3763CC', '#94C3FF']} style={styles.cardStyle}>
                     <Text style={{ padding: 20, fontWeight: '400', fontSize: 20, lineHeight: 17.3, color: '#FFFFFF', fontFamily: 'Robot-Thin' }}>{'Demo'}</Text>
                     <View style={{ alignItems: 'center', alignContent: 'center', bottom: 10, paddingVertical: 10 }}>
                        <Image source={require('../../Assets/demo.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 25, color: '#ffffff' }}>{'4,123'}</Text>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ffffff' }}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
               <TouchableOpacity
                  //style={styles.cardStyle}
                  onPress={() => navigationToListScreen('CloseLead')}
               >
                  <LinearGradient colors={['#F5915A', '#FFC693']} style={styles.cardStyle}>
                     <Text style={{ padding: 20, fontWeight: '400', fontSize: 20, lineHeight: 17.3, color: '#FFFFFF', fontFamily: 'Robot-Thin' }}>{'Close Lead'}</Text>
                     <View style={{ alignItems: 'center', alignContent: 'center', bottom: 10, paddingVertical: 10 }}>
                        <Image source={require('../../Assets/Group.png')} style={{ width: 50, height: 50, alignSelf: 'center' }} />
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 25, color: '#ffffff' }}>{'3,211'}</Text>
                        <Text style={{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ffffff' }}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
            </View>
            {/* <View style={{ alignItems: 'center', marginTop: 10 }}>
               
               <BarChart
                  data={barChartData}
                  width={Dimensions.get('window').width - 16}
                  height={220}
                  yAxisLabel={'Rs'}
                  chartConfig={{
                     backgroundColor: '#FFFFFF',
                     backgroundGradientFrom: '#FFFFFF',
                     backgroundGradientTo: '#FFFFFF',
                     decimalPlaces: 0,
                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                     style: {
                        borderRadius: 16,
                     },
                     barPercentage: 0.4,
                     barRadius: 3,
                     strokeWidth: 1,
                     backgroundGradientFromOpacity: 2
                  }}
                  style={{
                     marginVertical: 8,
                     borderRadius: 20,
                     borderWidth: 0.5
                  }}
               />
            </View> */}
            {/* <View style={{ alignSelf: 'center' }}> */}
            {/* <DonutPieChart/> */}
            {/* <PieChart
                  donut
                  showText
                  textColor="black"
                  radius={110}
                  textSize={14}
                  showTextBackground
                  textBackgroundRadius={20}
                  data={pieData}
               /> */}
            <View
               style={{
                  margin: 10,
                  padding: 16,
                  borderRadius: 20,
                  backgroundColor: '#fff',
                  elevation: 40, shadowColor: '#000'
               }}>
               <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
                  Sales growth by Market Segment
               </Text>
               <View style={{ padding: 20, alignItems: 'center' }}>
                  <PieChart
                     data={pieData}
                     donut
                     showGradient
                     sectionAutoFocus
                     radius={90}
                     innerRadius={50}
                     innerCircleColor={'#fff'}
                     centerLabelComponent={() => {
                        return (
                           <View style={{ justifyContent: 'center', alignItems: 'center', elevation: 19, shadowColor: '#000', }}>
                              <Text
                                 style={{ fontSize: 18, color: '#000000' }}>
                                 Count &
                              </Text>
                              <Text style={{ fontSize: 18, color: '#000000' }}>Amount</Text>
                           </View>
                        );
                     }}
                     focusOnPress
                     showText
                     showValuesAsLabels={true}
                     textSize={18}
                     //showTextBackground={true}
                     textColor="black"
                     innerCircleBorderWidth={2}
                     innerCircleBorderColor={'#000'}
                     strokeColor="white"
                     strokeWidth={4}
                  />
               </View>
               {renderLegendComponent()}
            </View>
            <View style={{
               margin: 10,
               padding: 16,
               borderRadius: 20,
               backgroundColor: '#fff',
               elevation: 40, shadowColor: '#000'
            }}>
               <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
                  Sales Per User
               </Text>
               <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                  {/* <BarChart
                     width={280}
                     //rotateLabel
                     noOfSections={3}
                     spacing={75}
                     stackData={stackData}
                     barWidth={35}
                     //rotateLabel
                     labelWidth={100}
                     initialSpacing={3}
                     barBorderRadius={6}
                  /> */}
                  <BarChart
                     width={260}
                     //rotateLabel
                     noOfSections={4}
                     stackData={stackData}
                     spacing={44}
                     barWidth={35}
                     xAxisTextNumberOfLines={2}
                     barBorderRadius={6}
                     yAxisThickness={0}
                     //yAxisColor={'#fff'}
                     xAxisThickness={1}
                  />
               </View>
            </View>
            <View style={{
               margin: 10,
               padding: 16,
               borderRadius: 20,
               backgroundColor: '#fff',
               elevation: 40, shadowColor: '#000'
            }}>
               <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
                  Sales Per User
               </Text>
               <View style={{}}>
                  <View style={{ flexDirection: 'row', height: 300, padding: 10 }}>
                     <YAxis
                        data={[0, maxVal + 5]} // Adjust the Y-axis range as needed
                        contentInset={{ top: 20, bottom: 50 }}
                        svg={{ fill: 'grey', fontSize: 10 }}
                        numberOfTicks={10}
                        formatLabel={value => `${value}`}
                     />
                     <View style={{ flex: 1, marginLeft: 10 }}>
                        <StackedBarChart
                           style={{ flex: 1 }}
                           data={data}
                           keys={keys}
                           colors={colors}
                           showGrid={true}
                           contentInset={{ top: 30, bottom: 30 }}
                           gridMin={0}
                        />
                        <XAxis
                           style={{ marginHorizontal: -10, height: 30 }}
                           data={labels}
                           formatLabel={(value, index) => labels[index]}
                           contentInset={{ left: 20, right: 20 }}
                           svg={{ fontSize: 10, fill: 'black' }}
                           numberOfTicks={labels.length}
                        />
                     </View>

                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                     <View
                        style={{
                           flexDirection: 'row',
                           alignItems: 'center',
                           width: 120,
                           marginRight: 30,
                        }}>
                        {renderDot('#F26462')}
                        <Text style={{ color: '#000000' }}>Sales Person 1</Text>
                     </View>
                     <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#F5915A')}
                        <Text style={{ color: '#000000' }}>Sales Person 2</Text>
                     </View>
                  </View>
               </View>

            </View>

            {/* </View> */}
         </ScrollView>
         {modal &&
            <Modal
               isVisible={modal}
               style={{ justifyContent: 'flex-end', margin: 0 }}
               onBackdropPress={() => setModal(false)}
               animationType="slide"
            >

               <View style={{ flex: 0.5, backgroundColor: 'green', justifyContent: 'space-around', alignItems: 'center' }}>
               </View>

            </Modal>
         }
         <Backdrop
            visible={visible}
            handleOpen={handleOpen}
            handleClose={handleClose}
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
            <View style={{ height: 300, flexDirection: 'row' }}>
               <View style={{ width: '50%', backgroundColor: 'green' }}></View>
               <View style={{ width: '50%', backgroundColor: 'pink' }}></View>
            </View>
         </Backdrop>
      </View>
   )
}

export default DashBoardFirstPage

const styles = StyleSheet.create({
   cardStyle: { height: 180, width: 180, marginTop: 20, margin: 8, borderRadius: 20 },
   cardDivStyle: { height: '50%', alignItems: 'center', justifyContent: 'center' }
})