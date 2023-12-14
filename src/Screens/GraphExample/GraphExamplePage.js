import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { BarChart, LineChart, ProgressChart, PieChart, StackedBarChart } from 'react-native-chart-kit'


export default function GraphExamplePage({ navigation }) {

   useEffect(() => {
      navigation.setOptions({
         headerRight: () => <View style={{ flexDirection: 'row', marginRight: 12 }}>
            <AddEnquiry />
         </View>,
      })
   }, []);

   const AddEnquiry = () => {
      return (
         <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }}
               onPress={() => navigation.navigate("DataEntryForm")}
            >
               <Text style={[{ color: '#000000', fontSize: 20 }]}>Add</Text>
            </TouchableOpacity>
         </View>
      )
   }

   const barChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
         {
            data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 69]
         },
      ],
   };

   const chartConfig = {
      backgroundGradientFrom: "red",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "red",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 0) => `rgba(27, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      barRadius: 10
      //useShadowColorFromDataset: false // optional
   };
   const progressvieRIngData = {
      labels: ["Swim", "Bike", "Run"], // optional
      data: [0.4, 0.6, 0.8]
   };
   const barGraphData = {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
         {
            data: [20, 45, 28, 80, 99, 43]
         }
      ]
   };
   const PieChartdata = [
      {
         name: "Seoul",
         population: 21500,
         color: "rgba(131, 167, 234, 1)",
         legendFontColor: "#7F7F7F",
         legendFontSize: 15
      },
      {
         name: "Toronto",
         population: 28000,
         color: "yellow",
         legendFontColor: "#7F7F7F",
         legendFontSize: 15
      },
      {
         name: "Beijing",
         population: 52761,
         color: "red",
         legendFontColor: "#7F7F7F",
         legendFontSize: 15
      },
      {
         name: "New York",
         population: 85380,
         color: "pink",
         legendFontColor: "#7F7F7F",
         legendFontSize: 15
      },
      {
         name: "Moscow",
         population: 31929,
         color: "rgb(0, 0, 255)",
         legendFontColor: "#7F7F7F",
         legendFontSize: 15
      }
   ];
   
   return (
      <ScrollView style={{ marginBottom: 50 }}>
         <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
               <Text>Bar Chart</Text>
               <BarChart
                  data={barChartData}
                  width={Dimensions.get('window').width - 16}
                  height={220}
                  yAxisLabel={'Rs'}
                  chartConfig={{
                     backgroundColor: '#1cc910',
                     backgroundGradientFrom: '#eff3ff',
                     backgroundGradientTo: '#efefef',
                     decimalPlaces: 0,
                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                     style: {
                        borderRadius: 16,
                     },
                     barPercentage: 0.5,
                     barRadius: 3,
                     strokeWidth: 1
                  }}
                  style={{
                     marginVertical: 8,
                     borderRadius: 16,
                  }}
               />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
               <Text>Line Chart</Text>
               <LineChart
                  data={barChartData}
                  width={Dimensions.get("window").width - 20} // from react-native
                  height={220}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                     backgroundColor: '#1cc910',
                     backgroundGradientFrom: '#eff3ff',
                     backgroundGradientTo: '#efefef',
                     decimalPlaces: 2,
                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                     style: {
                        borderRadius: 16,
                     },
                  }}
                  style={{
                     marginVertical: 8,
                     borderRadius: 16,
                  }}
               />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
               <Text>Progress Chart</Text>
               <ProgressChart
                  data={progressvieRIngData}
                  width={Dimensions.get('window').width - 16}
                  height={220}
                  chartConfig={{
                     backgroundColor: '#1cc910',
                     backgroundGradientFrom: '#eff3ff',
                     backgroundGradientTo: '#efefef',
                     decimalPlaces: 2,
                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                     style: {
                        borderRadius: 16,
                     },
                  }}
                  style={{
                     marginVertical: 8,
                     borderRadius: 16,
                  }}
                  strokeWidth={16}
                  radius={32}
                  hideLegend={false}
               />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
               <Text>Bar Chart</Text>
               <BarChart
                  style={{
                     marginVertical: 8,
                     borderRadius: 16
                  }}
                  data={barGraphData}
                  width={Dimensions.get('window').width}
                  height={220}
                  yAxisLabel="$"
                  chartConfig={chartConfig}
                  verticalLabelRotation={30}
               />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
               <Text>Pie Chart</Text>
               <PieChart
                  data={PieChartdata}
                  width={Dimensions.get('window').width - 30}
                  height={220}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor={"transparent"}
                  paddingLeft={"2"}
                  center={[10, 10]}
                  absolute
               />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
               <Text>Stacked Bar Chart</Text>
               <StackedBarChart
                  data={{
                     labels: ['Test1', 'Test2'],
                     legend: ['L1', 'L2', 'L3'],
                     data: [[60, 60, 60], [30, 30, 60]],
                     barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
                  }}
                  width={Dimensions.get('window').width - 16}
                  height={220}
                  chartConfig={{
                     backgroundColor: '#1cc910',
                     backgroundGradientFrom: '#eff3ff',
                     backgroundGradientTo: '#efefef',
                     decimalPlaces: 2,
                     color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                     style: {
                        borderRadius: 16,
                     },
                  }}
                  style={{
                     marginVertical: 8,
                     borderRadius: 16,
                  }}
               />
            </View>
         </View>
      </ScrollView>
   )
}
