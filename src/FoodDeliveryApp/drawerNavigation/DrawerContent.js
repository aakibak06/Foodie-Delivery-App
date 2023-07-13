import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const DrawerContent = ({ navigation }) => {

    return (
        <View style={{ backgroundColor: '#a4b0be', flex: 1, }}>
            <View style={{ backgroundColor: 'red', height: 100 }}>
                {/* <View style={{ height: 2, width: '100%', backgroundColor: '#dfe4ea', marginTop: 17 }}></View> */}
                <Text style={{ fontSize: 40, textAlign: 'center', color: 'white', marginTop: 6, letterSpacing: 5 }}>Foodie</Text>
                <View style={{ height: 1, width: '100%', backgroundColor: '#dfe4ea' }}></View>
                <Text style={{ color: 'white', textAlign: 'center', marginTop: 3, letterSpacing: 1 }}>Great Taste | Fast Delivery</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('homeScreen')} style={[styles.homeStyle, { marginTop: 40 }]}>
                <Entypo name='home' size={40} color={'#57606f'} style={{ paddingLeft: 10 }} />
                <Text style={styles.textStyle}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('userCart')} style={styles.homeStyle}>
                <Entypo name='shopping-cart' size={40} color={'#57606f'} style={{ paddingLeft: 10 }} />
                <Text style={styles.textStyle}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('trackOrder')} style={styles.homeStyle}>
                <MaterialIcons name='fastfood' size={40} color={'#57606f'} style={{ paddingLeft: 10 }} />
                <Text style={styles.textStyle}>Your Order</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DrawerContent

const styles = StyleSheet.create({

    homeStyle: {
        // borderWidth: 0.2,
        // margin: 10,
        backgroundColor: '#ced6e0',
        // width: '48%',
        // borderRadius: 10,
        marginTop: 15,
        flexDirection: 'row'

    },
    textStyle: {
        fontSize: 25,
        color: '#ff7f50',
        paddingLeft: 15,
        padding: 5,

    },

})