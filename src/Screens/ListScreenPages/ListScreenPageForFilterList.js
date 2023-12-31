import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

const ListScreenPage = (props, { route, navigation, }) => {

    const renderItem = (item) => {
        //console.log("item", item)
        return (
            <LinearGradient colors={props.route.params ? props.route.params.gradientColor : ['#3763CC', '#94C3FF']} style={{ width: '96%', backgroundColor: '#87CEEB', padding: 10, alignSelf: 'center', borderRadius: 10, margin: 4 }}>
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
                            <Text style={[styles.textStyle, { fontWeight: 'normal' }]}>{item.vesionName}</Text>
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

    return (
        <SafeAreaView style={styles.container}>
            {props.route.params.listData.length > 0 ?
                <FlatList
                    data={props.route.params || props.route.params.listData.length > 0 ? props.route.params.listData : []}
                    renderItem={({ item }) => renderItem(item)}
                    keyExtractor={item => item.id}
                /> :
                <View style={{ alignSelf: 'center', marginTop: '50%' }}>
                    <Image source={require('../../Assets/file_not_found.jpg')} style={{ width: 150, height: 150 }} />
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
        // marginTop: StatusBar.currentHeight || 0,
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