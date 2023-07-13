import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from '../Login'
import Signup from '../Signup';
import HomeScreen from '../HomeScreen';


import UserProfile from '../underHomescreen/UserProfile';
import UserCart from '../underHomescreen/UserCart';
import ProductPage from '../ProductPage'
import PlaceOrderPage from '../underHomescreen/PlaceOrderPage';
import TrackOrder from '../underHomescreen/TrackOrder';



const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name='welcomeScreen' component={WelcomeScreen} options={{ headerShown: false }} /> */}
            <Stack.Screen name='login' component={Login} options={{ headerShown: false, }} />
            <Stack.Screen name='signUp' component={Signup} options={{ headerShown: false, }} />
            <Stack.Screen name='homeScreen' component={HomeScreen} options={{ headerShown: false, }} />
            <Stack.Screen name='userProfile' component={UserProfile} options={{ headerShown: false, }} />
            <Stack.Screen name='productPage' component={ProductPage} options={{ headerShown: false, }} />
            <Stack.Screen name='userCart' component={UserCart} options={{ headerShown: false, }} />
            <Stack.Screen name='placeOrder' component={PlaceOrderPage} options={{ headerShown: false, }} />
            <Stack.Screen name='trackOrder' component={TrackOrder} options={{ headerShown: false, }} />
            {/* <Stack.Screen name='drawer' component={DrawerNavigation} options={{ headerShown: false, }} /> */}


        </Stack.Navigator>
    )
}

export default StackNavigator

const styles = StyleSheet.create({})