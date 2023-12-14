import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const DashBoardFirstPage = ({ navigation }) => {
   const infoData = useSelector((state) => state.infoReducer.infoArray)
   console.log("info screen in dash screen------", infoData)
   const [data, setData] = useState([
      {
         count: 25,
         enquiryType: 'Quotation'
      },
      {
         count: 40,
         enquiryType: 'Sales'
      },
      {
         count: 40,
         enquiryType: 'Demo'
      },
      {
         count: 40,
         enquiryType: 'NewLead'
      },
      {
         count: 40,
         enquiryType: 'CloseLead'
      }
   ])

   const navigationToListScreen = (value) =>{
      const filter = infoData.filter((item)=>item.dropDownValue == value)
      console.log("filter",filter)
      navigation.navigate(
      "ListScreenThird", {
         screen: "ListScreenPage",
         params: {
            listData: filter,
         },
       }
      )
   }

   return (
      <View style={{ backgroundColor: '#ffffff', flex: 1 }}>
         {
            data.map((item, index) => {
               return (
                  <TouchableOpacity
                     style={{ alignItems: 'center' }}
                     onPress={() => navigationToListScreen(item.enquiryType)}
                  >
                     <View style={styles.cardStyle}>
                        <View style={[styles.cardDivStyle, { backgroundColor: '#0F52BA' }]}>
                           <Text style={{ fontWeight: 'bold', color: '#fff' }}>{item.count}</Text>
                        </View>
                        <View style={{ borderWidth: 1, borderColor: '#000' }} />
                        <View style={[styles.cardDivStyle, { backgroundColor: '#4682B4' }]}>
                           <Text style={{ fontWeight: '700', color: '#fff' }}>{item.enquiryType}</Text>
                        </View>
                     </View>
                  </TouchableOpacity>
               )
            })
         }
      </View>
   )
}

export default DashBoardFirstPage

const styles = StyleSheet.create({
   cardStyle: { height: 100, width: '99%', margin: 4 },
   cardDivStyle: { height: '50%', alignItems: 'center', justifyContent: 'center' }
})