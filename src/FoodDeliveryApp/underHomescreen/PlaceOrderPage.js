import { Alert, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import firebase from '@react-native-firebase/app';
//
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

const PlaceOrderPage = ({ navigation, route }) => {
    const { cartData } = route.params;
    const [orderData, setOrderData] = useState([]);
    const [subtotal, setSubtotal] = useState('0');

    const [userlogged, setUserlogged] = useState(null);
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        setOrderData(JSON.parse(cartData));
    }, [cartData])
    // console.log(orderData)


    //subtotal formula
    useEffect(() => {
        if (cartData != null) {
            const foodprice = JSON.parse(cartData).cart;
            let totalfoodprice = 0;
            foodprice.map((item) => {
                // console.log(item.data.foodPrice)
                totalfoodprice = (parseInt(item.data.foodPrice) * parseInt(item.foodQuantity)) +
                    (parseInt(item.data.foodAddonPrice) * parseInt(item.AddonQuantity)) + totalfoodprice
            })

            // console.log(totalfoodprice)
            setSubtotal(JSON.stringify(totalfoodprice))
        }

    }, [cartData])


    const checkLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUserlogged(user.uid)
                // setIsLogged(true)
                console.log('useLooged in')
            } else {
                setUserlogged(null)
                // setIsLogged(false)
                // setIsLogged('user not logged in')
            }
        })
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])

    useEffect(() => {
        const getUserData = async () => {
            const docRef = firebase.firestore().collection('Users').where
                ('uid', '==', userlogged);
            const doc = await docRef.get();
            if (!doc.empty) {
                doc.forEach((doc) => {
                    setUserData(doc.data())
                })
            } else {
                console.log('no such document')
            }
        }
        getUserData()
    }, [userlogged])

    const payNow = () => {
        const docRef = firebase.firestore().collection('UsersOrder').doc(new Date().getTime().toString());
        docRef.set({
            orderid: docRef.id,
            orderdata: orderData.cart,
            orderstatus: 'pending',
            ordercost: subtotal,
            orderdate: firebase.firestore.FieldValue.serverTimestamp(),
            orderaddress: userData.address,
            orderphone: userData.phone,
            orderuseruid: userlogged,
            customername: userData.name,
            orderpayment: 'online',
            paymenttotal: subtotal,
            paymentstatus: 'paid'
        }).then(() => {
            Alert.alert("payment successfully order placed ")
        })
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.header}>Your Order Summary</Text>

            <View style={styles.flatlistView}>
                <FlatList data={orderData.cart}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.Main}>
                                <View style={styles.row}>
                                    <View style={styles.left}>
                                        <Text style={styles.qty}>{item.foodQuantity}</Text>
                                        <Text style={styles.titile}>{item.data.foodName}</Text>
                                        <Text style={styles.price1}>₹{item.data.foodPrice}</Text>
                                    </View>

                                    <View style={styles.right}>
                                        <Text style={styles.totalPrice}>
                                            ₹{parseInt(item.foodQuantity) * parseInt(item.data.foodPrice)}
                                        </Text>
                                    </View>
                                </View>
                                {item.AddonQuantity > 0 &&
                                    <View style={styles.row}>
                                        <View style={styles.left}>
                                            <Text style={styles.qty}>{item.AddonQuantity}</Text>
                                            <Text style={styles.titile}>{item.data.foodAddon}</Text>
                                            <Text style={styles.price1}>₹{item.data.foodAddonPrice}</Text>
                                        </View>

                                        <View style={styles.right}>
                                            <Text style={styles.totalPrice}>
                                                ₹{parseInt(item.AddonQuantity) * parseInt(item.data.foodAddonPrice)}
                                            </Text>
                                        </View>
                                    </View>}
                            </View>
                        )
                    }}

                />



                <ScrollView>

                    <View style={styles.userContainer}>

                        <Text style={styles.heading}>Your details</Text>
                        <View style={styles.usersdetals}>
                            <Text style={styles.title}>Name:
                                {userData ?
                                    <Text style={styles.details}> {userData.name}</Text>
                                    : 'loading'
                                }
                            </Text>
                            <Text style={styles.title}>Eamil:
                                {userData ?
                                    <Text style={styles.details}> {userData.email}</Text>
                                    : 'loading'
                                }
                            </Text>
                            <Text style={styles.title}>Phone No:
                                {userData ?
                                    <Text style={styles.details}> {userData.phone}</Text>
                                    : 'loading'
                                }
                            </Text>
                            <Text style={styles.title}>Address:
                                {userData ?
                                    <Text style={styles.details}> {userData.address}</Text>
                                    : 'loading'
                                }
                            </Text>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.paymentBtn} onPress={() => payNow()}>
                                <Text style={styles.btnText}>Proceed to payment</Text>
                            </TouchableOpacity>

                        </View>
                    </View>







                </ScrollView>
            </View>
            <View style={styles.subTotalPrice}>
                <Text style={styles.totalText2}>Order Total</Text>
                <Text style={styles.totalText3}>₹{subtotal}</Text>
            </View>
        </View>
    )
}

export default PlaceOrderPage

const styles = StyleSheet.create({
    flatlistView: {
        height: responsiveHeight(100),
        width: responsiveWidth(100)


    },
    mainContainer: {
        height: responsiveHeight(100),
        width: responsiveWidth(100),
        // justifyContent: 'center',
        // alignItems: 'center'
    },

    header: {
        fontSize: responsiveFontSize(3.5),
        textAlign: 'center',
        color: 'orange',
        backgroundColor: '#535c68'
    },
    Main: {
        width: responsiveWidth(95),
        alignSelf: 'center',
        // marginHorizontal: responsiveWidth(5),
        marginVertical: 10,
        elevation: 10,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        justifyContent: 'space-between',





    },

    row: {
        // backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-evenly',
        marginVertical: 5,

        width: responsiveWidth(90),
        // borderWidth: 0.6
        // marginHorizontal: responsiveWidth(10)



    },
    qty: {
        backgroundColor: 'red',
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        color: 'white',
        textAlign: 'center',
        paddingTop: 4,
        borderRadius: responsiveWidth(2),
        fontSize: responsiveFontSize(2)
    },

    titile: {
        fontSize: responsiveFontSize(1.8),
        color: 'black',
        width: responsiveWidth(35),

        marginLeft: 10,
        textTransform: 'capitalize',
        // borderWidth: 1,
        // borderColor: 'red'
    },
    price1: {
        color: 'red',
        fontSize: responsiveFontSize(2),
        // borderWidth: 1,
        width: responsiveWidth(15)

    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 0.5,
        // justifyContent: 'space-between',
        width: responsiveWidth(65)




    },
    right: {

        marginLeft: responsiveWidth(10)
    },
    totalPrice: {
        color: 'black',
        // width: 70,
        // borderWidth: 1,
        // textAlign: 'right',
        fontSize: responsiveFontSize(2.5)
    },
    subTotalPrice: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#2d3436',
        width: responsiveWidth(100),
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(7),
        // marginBottom: 200
    },
    totalText2: {
        color: 'white',
        fontSize: responsiveFontSize(2.5),
        padding: 5
    },
    totalText3: {
        color: 'white',
        fontSize: responsiveFontSize(3.5),
        marginLeft: responsiveWidth(20),
        width: responsiveWidth(30)
    },
    userContainer: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: 'purple',
        margin: 10,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#dff9fb',
        height: responsiveHeight(35),
        // borderWidth: 
        marginBottom: responsiveHeight(13)


    },
    heading: {
        marginTop: 5,
        fontSize: responsiveFontSize(3),
        color: '#d35400'
    },
    title: {
        color: '#7f8c8d',
        margin: 2,
        // textAlign: 'center',
        // borderWidth: 1,
        borderBottomWidth: 0.4,
        width: responsiveWidth(80),
        fontSize: responsiveFontSize(2)


    },
    paymentBtn: {
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: 'red',
        borderRadius: 10,
        width: responsiveWidth(50),
        elevation: 10,
        // marginBottom: 100
    },
    btnText: {
        fontSize: responsiveFontSize(2),
        color: 'white',
        textAlign: 'center',
        padding: 10
    }

})