import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


import { useNavigation } from '@react-navigation/native';
const HomeNav = () => {


  const navigation = useNavigation()





  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Fontisto name='nav-icon-list-a' size={30} color={'#d35400'} />
      </TouchableOpacity>


      <View style={styles.container2} >
        <Text style={{ fontSize: 25, color: '#d35400' }}>Foodie </Text>
        <MaterialCommunityIcons name='food-fork-drink' size={30} color={'#1B1464'} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('userProfile')}>
        <FontAwesome5 name='user-circle' size={40} color={'#d35400'} />
      </TouchableOpacity>


    </View>
  )
}

export default HomeNav

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    elevation: 20,
    alignItems: 'center',
    width: '100%',
    height: 60,



  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

})