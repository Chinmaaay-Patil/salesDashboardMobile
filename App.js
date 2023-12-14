import React from 'react'
import Routes from './src/Routes/RouteScreen'
import { Provider } from 'react-redux'
import store from './src/Redux/store';
import 'react-native-gesture-handler';
const App = () => {
  return (
    <Provider store={store}>
    <Routes/>
    </Provider>
  )
}

export default App