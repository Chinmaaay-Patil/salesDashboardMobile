import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient';

const ListScreenPage = (props, { route, navigation, }) => {
  const infoData = useSelector((state) => state.infoReducer.infoArray)
  console.log("info screen in list screen------", infoData)

  const gradientBackGroundColor = (value) =>{
    if(value == 'Demo'){
      return ['#3763CC', '#94C3FF']
    }else{
      if(value == 'NewLead'){
        return ['#E0D2FF', '#9678DC']
      }else{
        if(value == 'CloseLead'){
          return ['#F5915A', '#FFC693']
        }else{
          if(value == 'Quotation'){
            return ['#F26462', '#F8B9BA']
          }else{
            return ['#F26445', '#F8B9ER']
          }
        }
      }
    }
  } 

  const renderItem = (item) => {
    console.log("item", item.dropDownSOLValue)
   const color = gradientBackGroundColor(item.dropDownSOLValue)
   console.log("coloororoor",color)
    return (
      <LinearGradient colors={gradientBackGroundColor(item.dropDownSOLValue)} style={{ width: '96%', backgroundColor: '#87CEEB', padding: 10, alignSelf: 'center', borderRadius: 10, margin: 4 }}>
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
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.date}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Mobile No : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.mobileNo}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Email Id : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.emailId}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Address : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.address}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Source Person Name : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.dropDownSPNValue}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Version : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.dropDownVersionValue}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textStyle}>Amount : </Text>
              <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.amount}</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      {infoData.length > 0 ?
        <FlatList
          data={infoData}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={item => item.id}
        /> :
        <View style={{ alignSelf: 'center', marginTop: '50%' }}>
          <Image source={require('../../Assets/file-not-found.png')} style={{ width: 150, height: 150 }} />
          <Text style={[styles.textStyle, { marginTop: -18 }]}>NO DATA AVAILABLE !!</Text>
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
});