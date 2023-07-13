import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import React from 'react';
import Mainlogo from '../../assets/images/delivery-logo.png'
import { line } from './styles';

const WelcomeScreen = () => {



    return (
        <View style={{ backgroundColor: '#e67e22', flex: 1 }}>
            <StatusBar backgroundColor='#e67e22' />
            <Text style={{ fontSize: 60, textAlign: 'center', color: '#1B1464', marginTop: 30 }}>Welcome </Text>
            <Text style={{ fontSize: 40, textAlign: 'center', color: '#1B1464', marginTop: 5 }}>To </Text>
            <Text style={{ fontSize: 60, textAlign: 'center', color: '#1B1464', marginTop: 5 }}>Foodie </Text>
            <View style={{ width: '30%', height: '30%', marginTop: 30 }}>
                <Image source={Mainlogo} resizeMode='contain' style={{ height: 300, width: 400 }} />
            </View>

            <View style={{ marginTop: 40 }}>
                <View style={line}></View>
                <Text style={{ textAlign: 'center', color: 'white' }}>Find the best food around you at lowest price.</Text>
                <View style={line}></View>
            </View>

            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={{ backgroundColor: '#d2dae2', borderRadius: 10, width: 100 }}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={{ fontSize: 25, textAlign: 'center', padding: 10, color: '#e67e22' }}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#d2dae2', borderRadius: 10, width: 120 }}
                    onPress={() => navigation.navigate('signUp')}
                >
                    <Text style={{ fontSize: 25, textAlign: 'center', padding: 10, color: '#e67e22' }}>SignUp</Text>
                </TouchableOpacity>
            </View> */}


        </View>

    )
}

export default WelcomeScreen

const styles = StyleSheet.create({

})