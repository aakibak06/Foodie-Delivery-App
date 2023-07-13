import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import NavBottom from '../NavBottom';
//
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
const { height, width } = Dimensions.get('window');





const UserCart = ({ navigation }) => {
    const isFocused = useIsFocused()
    // const navigation = useNavigation()
    const [cartData, setCartData] = useState(null);
    const [subtotal, setSubtotal] = useState(0);






    const saveCartData = () => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
        docRef.get().then((doc) => {
            if (doc.exists) {
                const data = JSON.stringify(doc.data())
                setCartData(data)
            } else {
                console.log("no any cart exist")
            }
        }).catch((error) => {
            console.log(error.message)
        })

    }

    useEffect(() => {
        saveCartData();
    }, [isFocused])

    // this data is for flatlist
    // const newData = ;
    // console.log(newData)

    const removeItem = (item) => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);
        docRef.update({
            cart: firebase.firestore.FieldValue.arrayRemove(item)
        }).then(() => {
            saveCartData()
        })


    }

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




    return (

        <View style={styles.mainContainer}>
            {/* <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.navigate('homeScreen')}>
                <AntDesign name='back' size={50} color={'white'} />
            </TouchableOpacity> */}
            <View style={styles.NavBottom}>
                <NavBottom />
            </View>
            <View style={styles.cartView}>
                <Text style={styles.header}>Your Cart</Text>
                {cartData == null || JSON.parse(cartData).cart.length == 0 ?
                    <View style={styles.withoutDataCon}><Text style={styles.withoutData}> your cart is empty</Text></View>
                    :

                    <View style={{ height: '100%', width: '100%', }}>
                        <FlatList data={JSON.parse(cartData).cart}
                            style={{ width: '100%', marginBottom: 200 }}
                            scrollEnabl
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.withDataContainer}>
                                        <Image source={{ uri: item.data.foodImage }} style={styles.images} />
                                        <View style={styles.TextContainer}>
                                            <View style={styles.firstText}>
                                                <Text style={{ width: '90%', color: 'black' }}>{item.foodQuantity}&nbsp; {item.data.foodName}</Text>

                                                <Text style={styles.eachPrice}>₹{item.data.foodPrice}/each</Text>
                                            </View>

                                            {item.AddonQuantity > 0 &&
                                                <View style={styles.secondText}>
                                                    <Text style={{ color: 'black' }}>{item.AddonQuantity}&nbsp;{item.data.foodAddon}</Text>
                                                    <Text style={styles.addonprice}>₹{item.data.foodAddonPrice}/each addon</Text>
                                                </View>}
                                            <TouchableOpacity style={{ alignSelf: 'flex-end', }} onPress={() => {
                                                removeItem(item)

                                            }}>
                                                <AntDesign name='delete' size={27} color={'red'} />

                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }}
                        />

                        <View style={styles.placeOrder}>
                            <View style={{ flexDirection: 'row', width: '50%', alignItems: 'center', }}>
                                <Text style={styles.totalText}>Total </Text>
                                <Text style={styles.totalText1}>₹{subtotal}</Text>
                            </View>
                            <TouchableOpacity style={{ backgroundColor: '#ff793f', borderRadius: 15, width: "50%", }} onPress={() => navigation.navigate('placeOrder', { cartData })}>
                                <Text style={styles.placeOrderStyle}>Place Order</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                }
            </View>

        </View>
    )
}

export default UserCart

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: width,
        height: height,
        display: 'flex',
        // marginBottom: 300

    },
    cartView: {
        // flex: 1,
        height: '100%',
        width: '100%',
        display: 'flex',
        marginBottom: 300


    },

    closeBtn: {

        // width: 60,
        // backgroundColor: "red",
        // position: 'absolute',
        borderBottomRightRadius: 10,
        borderWidth: 1

    },
    NavBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 20,
        // height: 60,
        backgroundColor: '#dff9fb',

    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        marginTop: 20,
        color: '#cd6133',

    },
    withoutDataCon: {
        // borderWidth: 1,
        backgroundColor: 'white',
        height: 300,
        width: '95%',
        margin: 10, marginTop: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 20,
        // height: '20%'

    },
    withoutData: {
        fontSize: 25,
        textTransform: 'capitalize'

    },

    withDataContainer: {
        display: 'flex',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginVertical: 10,

        borderRadius: 10,
        elevation: 5,
        flexDirection: 'row',
        // alignItems: 'center',




    },
    images: {
        width: '33%',
        height: 100,
        borderRadius: 10,
        margin: 5
    },
    TextContainer: {
        // flexDirection: 'column',
        margin: 5,
        // borderWidth: 1,
        width: width / 1.77,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    firstText: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 5,


    },

    eachPrice: {
        fontSize: 13,
        color: 'white',
        backgroundColor: '#ff793f',
        width: '50%',
        padding: 5,
        paddingLeft: 10,
        borderRadius: 10,
        marginVertical: 5
    },
    secondText: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        width: '100%',
        padding: 5,
    },
    addonprice: {
        fontSize: 13,
        color: 'white',
        backgroundColor: 'red',
        width: '70%',
        padding: 5,
        paddingLeft: 10,
        borderRadius: 10,
        marginVertical: 5
    },
    placeOrder: {
        width: responsiveWidth(100),
        flexDirection: 'row',
        position: 'absolute',

        bottom: 145,

        // borderWidth: 1,
        backgroundColor: '#7f8fa6',
        // margin: 5



    },

    placeOrderStyle: {
        fontSize: responsiveFontSize(2.5),
        color: 'white',
        // paddingHorizontal: 10,
        // width: '100%',
        textAlign: 'center',
        padding: 5

    },
    totalText: {
        fontSize: responsiveFontSize(3),
        color: 'white',
        marginLeft: responsiveWidth(3)

    },
    totalText1: {
        fontSize: responsiveFontSize(3),
        textAlign: 'left',
        // width: '66%',
        // borderWidth: 1,
        textAlign: 'left',
        color: 'black',
        marginLeft: responsiveWidth(2),
        padding: 5

    }
})