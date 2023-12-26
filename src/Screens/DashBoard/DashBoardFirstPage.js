import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather'
import { Backdrop } from "react-native-backdrop";
import PieChartPage from './PieChartPage';
import BarChartPage from './BarChartPage';

const DashBoardFirstPage = ({ navigation }) => {

   const [visible, setVisible] = useState(false);
   const infoData = useSelector((state) => state.infoReducer.infoArray)
   //console.log("info screen in dash screen------", infoData)

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

   const navigationToListScreen = (value,colorArray) => {
      const filter = infoData.filter((item) => item.dropDownSOLValue == value)
      console.log("filter", filter,value)
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
         {/* <View style={{ marginLeft: 320 }}>
            <AddEnquiry />
         </View> */}
         <ScrollView>
            <View style={{ flexDirection: 'row' }}>
               <TouchableOpacity onPress={() => navigationToListScreen('NewLead',['#E0D2FF', '#9678DC'])}>
                  <LinearGradient colors={['#E0D2FF', '#9678DC']} style={styles.cardStyle}>
                     <Text style={styles.cardTitleText}>{'New Lead'}</Text>
                     <View style={styles.cardSubView}>
                        <Image source={require('../../Assets/customer-engagement.png')} style={styles.cardImageStyle} />
                        <Text style={styles.cardCountText}>{'2,333'}</Text>
                        <Text style={styles.cardSubText}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigationToListScreen('Quotation',['#F26462', '#F8B9BA'])}>
                  <LinearGradient colors={['#F26462', '#F8B9BA']} style={styles.cardStyle}>
                     <Text style={styles.cardTitleText}>{'Quotation'}</Text>
                     <View style={styles.cardSubView}>
                        <Image source={require('../../Assets/quotation.png')} style={styles.cardImageStyle} />
                        <Text style={styles.cardCountText}>{'4,123'}</Text>
                        <Text style={styles.cardSubText}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
               <TouchableOpacity onPress={() => navigationToListScreen('Demo',['#3763CC', '#94C3FF'])}>
                  <LinearGradient colors={['#3763CC', '#94C3FF']} style={styles.cardStyle}>
                     <Text style={styles.cardTitleText}>{'Demo'}</Text>
                     <View style={styles.cardSubView}>
                        <Image source={require('../../Assets/demo.png')} style={styles.cardImageStyle} />
                        <Text style={styles.cardCountText}>{'4,123'}</Text>
                        <Text style={styles.cardSubText}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigationToListScreen('CloseLead',['#F5915A', '#FFC693'])}>
                  <LinearGradient colors={['#F5915A', '#FFC693']} style={styles.cardStyle}>
                     <Text style={styles.cardTitleText}>{'Close Lead'}</Text>
                     <View style={styles.cardSubView}>
                        <Image source={require('../../Assets/Group.png')} style={styles.cardImageStyle} />
                        <Text style={styles.cardCountText}>{'3,211'}</Text>
                        <Text style={styles.cardSubText}>{0} Opportunities</Text>
                     </View>
                  </LinearGradient>
               </TouchableOpacity>
            </View>
            <View>
               <PieChartPage
               pieData={pieData}
               subText1={'Total Amount: '+ pieData[0].value +'%'}
               subText2={'Total Amount: ' + pieData[1].value + '%'}
               innerCircleText1={'Count &'}
               innerCircleText2={'Amount'}
               graphTitle={'Sales growth by Market Segment'}
               renderDotColor1={'#9A7DDE'}
               renderDotColor2={'#3763CC'}
               />
            </View>
            <View>
               <BarChartPage
               stackData={stackData}
               graphTitle={'Sales Per User'}
               />
            </View>
         </ScrollView>

         <Backdrop
            visible={visible}
            handleOpen={()=>setVisible(true)}
            handleClose={()=>setVisible(false)}
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
   cardStyle: { height: 180, width: 180, marginTop: 10, margin: 8, borderRadius: 20 },
   cardDivStyle: { height: '50%', alignItems: 'center', justifyContent: 'center' },
   cardTitleText:{ padding: 20, fontWeight: '400', fontSize: 20, lineHeight: 17.3, color: '#FFFFFF', fontFamily: 'Robot-Thin' },
   cardSubView:{ alignItems: 'center', alignContent: 'center', bottom: 10, paddingVertical: 10 },
   cardCountText:{ fontFamily: 'Roboto-Medium', fontSize: 25, color: '#ffffff' },
   cardSubText:{ fontFamily: 'Roboto-Medium', fontSize: 14, color: '#ffffff' },
   cardImageStyle:{ width: 50, height: 50, alignSelf: 'center' }
})