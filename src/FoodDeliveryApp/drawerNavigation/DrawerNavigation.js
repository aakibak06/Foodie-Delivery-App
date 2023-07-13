import { StyleSheet, Text, View } from 'react-native';

import React, { useEffect } from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import StackNavigator from './StackNavigator';
import SplashScreen from 'react-native-splash-screen'




const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {

    useEffect(() => {
        SplashScreen.hide()
    }, [])
    return (
        <Drawer.Navigator

            drawerContent={(props) => <DrawerContent {...props} />} >
            <Drawer.Screen name="Stacknavigator" component={StackNavigator}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({

})