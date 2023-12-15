import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';
import image from '../../Assets/customer-engagement.png'

const DashBoardFirstPage = ({ navigation }) => {
   const infoData = useSelector((state) => state.infoReducer.infoArray)
   console.log("info screen in dash screen------", infoData)
   const [data, setData] = useState([
      {
         count: '2,533',
         enquiryType: 'Quotation',
         opportunitiesCount : 0
      },
      {
         count: '4,044',
         enquiryType: 'Demo',
         opportunitiesCount : 0
      },
      {
         count: '4,033',
         enquiryType: 'NewLead',
         opportunitiesCount : 0
      },
      {
         count: '4,033',
         enquiryType: 'CloseLead',
         opportunitiesCount : 0
      }
   ])

   const navigationToListScreen = (value) => {
      const filter = infoData.filter((item) => item.dropDownValue == value)
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
         array.image= require('../../Assets/customer-engagement.png')
         array.titleText='New Lead'
         return array
      } else {
         if (item.enquiryType == 'Quotation') {
            array.color = ['#F26462', '#F8B9BA']
            array.image= require('../../Assets/quotation.png')
            array.titleText='Quotation'
            return array
         } else {
            if (item.enquiryType == 'Demo') {
               array.color = ['#3763CC', '#94C3FF']
               array.image= require('../../Assets/demo.png')
               array.titleText='Demo'
               return array
            } else {

               array.color = ['#F5915A', '#FFC693']
               array.image= require('../../Assets/customer-engagement.png')
               array.titleText='Close Lead'
               return array

            }
         }
      }
   }

   return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>

         <ScrollView
            horizontal={true}
         >

            <View style={{ width: 660, height: 130, alignItems: 'center', flexDirection: 'row' }}>
               {
                  data.map((item, index) => {
                     const gradiantColor = getGradiantColor(item)
                     return (

                        <TouchableOpacity
                           //style={styles.cardStyle}
                           onPress={() => navigationToListScreen(item.enquiryType)}
                        >
                           <LinearGradient colors={gradiantColor.color} style={styles.cardStyle}>
                              <Text style={{padding:20,fontWeight:'400',fontSize:14.77,lineHeight:17.3,color:'#FFFFFF',fontFamily:'Robot-Thin'}}>{gradiantColor.titleText}</Text>
                              <View style={{alignItems:'center',alignContent:'center',bottom:10}}>
                              <Image source={gradiantColor.image} style={{width:44.3,height:44.3,alignSelf:'center'}} />
                              <Text style={{fontFamily:'Roboto-Medium',fontSize:20,color:'#ffffff'}}>{item.count}</Text>
                              <Text style={{fontFamily:'Roboto-Medium',fontSize:10,color:'#ffffff'}}>{item.opportunitiesCount} Opportunities</Text>
                              </View>
                           </LinearGradient>
                        </TouchableOpacity>

                     )
                  })
               }
            </View>
         </ScrollView>

      </View>
   )
}

export default DashBoardFirstPage

const styles = StyleSheet.create({
   cardStyle: { height: 144.43, width: 144.43, marginTop: 60, margin: 10 },
   cardDivStyle: { height: '50%', alignItems: 'center', justifyContent: 'center' }
})