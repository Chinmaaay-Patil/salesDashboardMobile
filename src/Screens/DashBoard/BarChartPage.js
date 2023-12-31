import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BarChart } from "react-native-gifted-charts";

const BarChartPage = (props) => {
   return (
      <View style={styles.container}>
         <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
            {props.graphTitle}
         </Text>
         <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            
            {props.stackData.length > 0 ?
               <BarChart
                  width={260}
                  //rotateLabel
                  noOfSections={4}
                  stackData={props.stackData}
                  spacing={50}
                  barWidth={35}
                  xAxisTextNumberOfLines={1}
                  barBorderRadius={6}
                  yAxisThickness={0}
                  //yAxisColor={'#fff'}
                  xAxisThickness={1}
               />
               :
               <View style={{ alignItems: 'center', height: 200, justifyContent: 'center' }}>
                  <Image source={require('../../Assets/file_not_found.jpg')} style={{ width: 100, height: 100 }} />
                  <Text style={[styles.textStyle, { marginTop: -10 }]}>NO DATA AVAILABLE !!</Text>
               </View>
            }
         </View>
         {/* <View style={{
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

            </View> */}
      </View>
   )
}

export default BarChartPage

const styles = StyleSheet.create({
   container: {
      margin: 10,
      padding: 16,
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 40, shadowColor: '#000'
   },
   textStyle: {
      fontWeight: 'bold',
      color: '#000000'
   },
})