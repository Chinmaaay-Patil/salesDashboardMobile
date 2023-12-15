import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import LoginScreen from '../Screens/Login/LoginScreen';
import OtpScreen from '../Screens/Login/OtpScreen';
import DashBoardFirstPage from '../Screens/DashBoard/DashBoardFirstPage';
import DataEnterForm from '../Screens/DataEntryPages/DataEnterForm';
import ListScreenPage from '../Screens/ListScreenPages/ListScreenPage';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = () => {
  const DashBoardFirstStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="DashBoardFirstScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="DashBoardFirstScreen" component={DashBoardFirstPage} options={{ title: 'Dashboard', headerTintColor: '#000000' }} />
      </Stack.Navigator>
    );
  }
  const DataEntrySecondStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="DataEntryForm"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="DataEntryForm" component={DataEnterForm} />
      </Stack.Navigator>
    );
  }
  const ListScreenThirdStack = () => {
    return (
      <Stack.Navigator
        initialRouteName="ListScreenPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ListScreenPage" component={ListScreenPage} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OTPScreen" component={OtpScreen} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="DashBoardFirstScreen" component={DashBoardFirstPage} options={{ title: 'Dashboard', headerTintColor: '#000000' }} />
        <Stack.Screen name="DataEntryForm" component={DataEnterForm} options={{ headerShown: true }} /> */}
      {/* </Stack.Navigator> */}
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#ffffff', //Set Drawer background
            width: 250, //Set Drawer width
          },
          headerStyle: {
            backgroundColor: '#ffffff', //Set Header color
          },
          headerTintColor: '#000', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'normal', //Set Header text style
          }
        }}>
        <Drawer.Screen
          name="DashBoardFirst"
          options={{
            drawerLabel: 'DashBoard',
            title: 'Sales DashBoard'
          }}
          component={DashBoardFirstStack} />
        <Drawer.Screen
          name="DataEntrySecond"
          options={{
            drawerLabel: 'New Enquiry',
            title: 'New Enquiry'
          }}
          component={DataEntrySecondStack} />
          <Drawer.Screen
          name="ListScreenThird"
          options={{
            drawerLabel: 'List View',
            title: 'List View'
          }}
          component={ListScreenThirdStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default Routes