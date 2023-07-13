import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import WelcomeScreen from './src/FoodDeliveryApp/WelcomeScreen'
import App from './App'


const SetWelcome = () => {
    const [showWelcomeScreen, setShowWelcomeScreen] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setShowWelcomeScreen(false)
        }, 3000)
    })
    return (
        <View style={{ flex: 1 }}>
            {showWelcomeScreen ? <WelcomeScreen /> : <App />}
        </View>
    )
}

export default SetWelcome

const styles = StyleSheet.create({})