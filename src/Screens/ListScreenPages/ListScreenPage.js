import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const ListScreenPage = (props,{route,navigation,}) => {
  const infoData = useSelector((state) => state.infoReducer.infoArray)
  console.log("info screen in list screen------", infoData)
  console.log("p==========",props.route.params)

  const renderItem = (item) => {
    console.log("item", item)
    return (
      <View style={{ width: '96%', backgroundColor: '#87CEEB', padding: 10, alignSelf: 'center', borderRadius: 10, margin: 4 }}>
        <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
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
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ props.route.params ? props.route.params.listData : infoData}
        renderItem={({ item }) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

export default ListScreenPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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