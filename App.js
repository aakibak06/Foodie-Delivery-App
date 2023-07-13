
import { StyleSheet, Text, View } from 'react-native';

import React from 'react';


import { NavigationContainer } from '@react-navigation/native';


//screens

import DrawerNavigation from './src/FoodDeliveryApp/drawerNavigation/DrawerNavigation';
// import { AppProvider } from './src/FoodDeliveryApp/UseContext';








const App = () => {


  return (
    <NavigationContainer >
      <DrawerNavigation />
    </NavigationContainer>

  )


}



export default App

const styles = StyleSheet.create({})