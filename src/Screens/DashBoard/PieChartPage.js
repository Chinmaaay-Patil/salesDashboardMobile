import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { PieChart } from "react-native-gifted-charts";

const PieChartPage = (props) => {

    // const data = [
    //     {
    //        month: 'Jan',
    //        Person1: 5,
    //        Person2: 8,
    //     },
    //     {
    //        month: 'Feb',
    //        Person1: 15,
    //        Person2: 12,
    //     },
    //     {
    //        month: 'Mar',
    //        Person1: 20,
    //        Person2: 33,
    //     },
    //     {
    //        month: 'Apr',
    //        Person1: 10,
    //        Person2: 15,
    //     },
    //     {
    //        month: 'May',
    //        Person1: 16,
    //        Person2: 12,
    //     },
    //     {
    //        month: 'Jun',
    //        Person1: 19,
    //        Person2: 13,
    //     },
    //     {
    //        month: 'Jul',
    //        Person1: 10,
    //        Person2: 19,
    //     },
    //     {
    //        month: 'Aug',
    //        Person1: 15,
    //        Person2: 12,
    //     },
    //     {
    //        month: 'Sept',
    //        Person1: 15,
    //        Person2: 12,
    //     },
    //     {
    //        month: 'Otc',
    //        Person1: 20,
    //        Person2: 40,
    //     },
    //     {
    //        month: 'Nov',
    //        Person1: 20,
    //        Person2: 12,
    //     },
    //     {
    //        month: 'Dec',
    //        Person1: 30,
    //        Person2: 20,
    //     },
    //     // Add more data for each month and person as needed
    //  ];
    //  const colors = ['#F26462', '#F5915A']; // Colors for each person
  
    //  const keys = ['Person1', 'Person2']; // Keys for the persons
  
    //  // Extracting labels for X axis
    //  const labels = data.map(item => item.month);
  
    //  // Finding the maximum value for the Y axis
    //  const maxVal = Math.max(...data.map(item => Math.max(...keys.map(key => item[key]))));

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
                    <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 40,
                        }}
                        >
                        {renderDot(props.renderDotColor2)}
                        <Text style={{ color: '#000000' }}>{props.subText2}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot(props.renderDotColor1)}
                        <Text style={{ color: '#000000' }}>{props.subText1}</Text>
                    </View>
                </View>
            </>
        );
    };
    return (
        <View
            style={styles.container}>
            <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
                {props.graphTitle}
            </Text>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <PieChart
                    data={props.pieData}
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
                                    {props.innerCircleText1}
                                </Text>
                                <Text style={{ fontSize: 18, color: '#000000' }}>{props.innerCircleText2}</Text>
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
            <View style={{marginRight:25}}>
            {renderLegendComponent()}
            </View>
        </View>
    )
}

export default PieChartPage

const styles = StyleSheet.create({
    container:{
        margin: 10,
        padding: 16,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 40, shadowColor: '#000'
    }
})