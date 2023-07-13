import { StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeNav from './HomeNav'
import NavBottom from '../NavBottom'
// import { firebase } from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/app';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const TrackOrder = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const orderRef = firebase.firestore().collection('UsersOrder').where('orderuseruid', '==', firebase.auth().currentUser.uid);
        orderRef.onSnapshot(snapshot => {
            setOrders(snapshot.docs.map(doc => doc.data()))
        })
    }

    useEffect(() => {
        getOrders()
    }, [])
    // console.log(orders)

    const convert = (date) => {
        let newDate = new Date(date.seconds * 1000)
        return newDate.toDateString()
    }

    const cancelOrder = (item) => {
        const orderRef = firebase.firestore().collection('UsersOrder').doc(item.orderid);
        orderRef.update({
            orderstatus: 'cancelled'
        })
        getOrders()

    }

    return (
        <View style={styles.mainContainer}>

            <HomeNav />

            <View style={styles.NavBottom}>
                <NavBottom />
            </View>
            <Text style={styles.trackOrder}>Track Order</Text>
            <View style={styles.underline}></View>
            <ScrollView style={styles.orderDetails}>
                {orders.sort(
                    (a, b) => {
                        b.orderdate.seconds - a.orderdate.seconds
                    }
                ).map((item, index) => {
                    return (
                        <View key={index} style={styles.mainMapCon}>

                            <Text style={styles.orderid}>order id: {item.orderid}</Text>
                            <Text style={styles.orderdate}>order date: {convert(item.orderdate)}</Text>
                            {item.orderstatus === 'ontheway' && <Text style={styles.ontheway}>
                                Your Order is on the way
                            </Text>}
                            {item.orderstatus === 'deliverd' && <Text style={styles.deliverd}>
                                Your order is deliverd
                            </Text>}
                            {item.orderstatus === 'cancelled' && <Text style={styles.cancelled}>
                                Your Order is cancelled
                            </Text>}
                            {item.orderstatus === 'pending' && <Text style={styles.pending}>
                                Your Order is pending
                            </Text>}


                            <View style={styles.row1}>
                                <Text style={styles.agentDetails}>Delivery boy name & contact</Text>
                                {item.fooddeliveryboyname ? <Text style={styles.boyName}>Name: {item.fooddeliveryboyname}</Text>
                                    : <Text style={styles.notAssigned}>delivery boy not assigned</Text>
                                }
                                {item.foodDeliveryBoyPhone ? <Text style={styles.boyName}>Phone: {item.foodDeliveryBoyPhone}</Text>
                                    : null
                                }
                            </View>
                            {item.orderdata.map((item, index) => {
                                return (
                                    <View style={styles.Main} key={index}>
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
                            })}



                            <Text style={styles.totalCost}>Total: ₹{item.ordercost}</Text>

                            {item.orderstatus === 'deliverd' ? <Text style={styles.greating}>Thankyou for ordering with us ❤️</Text>
                                : null
                            }
                            {item.orderstatus === 'cancelled' ? <Text style={styles.greating}>sorry for the inconvenience 😲</Text>
                                : null
                            }

                            {item.orderstatus != 'deliverd' && item.orderstatus != 'cancelled' ?
                                <TouchableOpacity style={styles.cancelContainer} onPress={() => cancelOrder(item)}>
                                    <Text style={styles.cancelOrder}>
                                        Cancel Order
                                    </Text>
                                </TouchableOpacity>
                                : null
                            }



                        </View>
                    )
                })
                }
                <View style={{ marginBottom: 100 }}></View>
            </ScrollView>
        </View>
    )
}

export default TrackOrder

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    NavBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 20,
        // height: 60,
        backgroundColor: '#dff9fb',

    },
    Main: {
        flexDirection: 'column',
        margin: 10,
        elevation: 10,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        width: responsiveWidth(90),
        alignSelf: 'center'





    },
    totalPrice: {
        color: 'black',
        width: 70,
        textAlign: 'right',
        fontSize: responsiveFontSize(2.7)
    },

    row: {
        // backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: responsiveHeight(1),
        width: responsiveWidth(88),
        // borderWidth: 1



    },
    qty: {
        backgroundColor: 'red',
        width: responsiveWidth(8),
        height: responsiveHeight(3.8),
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        fontSize: responsiveFontSize(2.5)
    },

    titile: {
        fontSize: responsiveFontSize(2),
        color: 'black',
        width: responsiveWidth(45),

        marginLeft: responsiveWidth(2),
        textTransform: 'capitalize'
    },
    price1: {
        color: 'red',
        // marginLeft: responsiveWidth(10),
        textAlign: 'center',
        fontSize: responsiveFontSize(2)
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        width: responsiveWidth(66)



    },
    right: {


        paddingRight: responsiveWidth(2)

    },
    mainMapCon: {
        backgroundColor: '#b2bec3',
        // marginTop: 20,
        margin: 10,
        borderRadius: 10,
        width: responsiveWidth(95),
        // alignSelf: 'center'

    },

    orderid: {
        marginTop: 10,
        textAlign: 'center',
        color: 'black',
        fontSize: 17
    },
    orderdate: {
        marginTop: 5,
        textAlign: 'center',
        color: 'black',
        fontSize: 17
    },

    cancelled: {
        marginTop: 10,
        backgroundColor: 'red',
        marginHorizontal: 60,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderRadius: 10,
        padding: 5
    },
    deliverd: {
        marginTop: 10,
        backgroundColor: 'green',
        marginHorizontal: 60,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderRadius: 10,
        padding: 5
    },

    pending: {
        marginTop: 10,
        backgroundColor: 'grey',
        marginHorizontal: 65,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderRadius: 10,
        padding: 5
    },

    ontheway: {
        marginTop: 10,
        backgroundColor: '#74b9ff',
        marginHorizontal: 50,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        borderRadius: 10,
        padding: 5
    },

    row1: {
        backgroundColor: '#74b9ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        margin: 10,
        borderRadius: 10,
        padding: 10
    },
    agentDetails: {
        color: 'black',
        fontSize: 20
    },

    notAssigned: {
        color: 'red',
        fontSize: 16, marginTop: 10,
    },
    boyName: {
        color: 'green',
        fontSize: 17
    },
    trackOrder: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 30,
        color: 'red'
    },
    underline: {
        backgroundColor: 'red',
        height: 2,
        margin: 5
    },

    totalCost: {
        textAlign: 'right',
        margin: 10,
        fontSize: 23,
        color: 'red'
    },
    greating: {
        fontSize: 17,
        textAlign: 'center',
        marginBottom: 10,
        backgroundColor: "orange",
        padding: 5,
        color: 'white'
    },

    cancelContainer: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
        marginBottom: responsiveHeight(2)

    },
    cancelOrder: {
        color: 'white',
        fontSize: responsiveFontSize(3),
        paddingVertical: responsiveHeight(1)
    }







})