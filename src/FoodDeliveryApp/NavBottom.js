import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';


const NavBottom = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('homeScreen')}>
                <View style={styles.home}>
                    <Fontisto name='home' size={40} color={'#cd6133'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity >
                <View style={styles.home}>
                    <Fontisto name='search' size={40} color={'#cd6133'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('userCart')} >
                <View style={styles.home}>
                    <Ionicons name='cart-sharp' size={40} color={'#cd6133'} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('trackOrder')}>
                <View style={styles.home}>
                    <FontAwesome5 name='map-marker-alt' size={40} color={'#cd6133'} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default NavBottom

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopWidth: 0.5,
        borderColor: '#f0932b',


    },
    home: {
        padding: 5,
        // borderWidth: 0.2,
        margin: 6,
        backgroundColor: 'white',
        borderRadius: 10,
        height: 60,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'

    }

})