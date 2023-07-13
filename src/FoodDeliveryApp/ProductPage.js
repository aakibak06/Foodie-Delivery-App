import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, StatusBar, TouchableHighlight, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductPage = ({ route }) => {
    const navigation = useNavigation();
    const data = route.params;

    // following add to cart functionality using firebase
    const [quantity, setQuantity] = useState('1');
    const [addOnQuantity, setAddOnQuantity] = useState('0');

    const addToCart = () => {
        const docRef = firebase.firestore().collection('UserCart').doc(firebase.auth().currentUser.uid);

        const data1 = {
            data,
            AddonQuantity: addOnQuantity,
            foodQuantity: quantity,
        }

        docRef.get().then((doc) => {
            if (doc.exists) {
                docRef.update({
                    cart: firebase.firestore.FieldValue.arrayUnion(data1)
                })
                alert('Added to cart')
            } else {
                docRef.set({
                    cart: [data1]
                })
                alert('Added to cart')
            }
        })

    }
    // console.log(data.foodAddonPrice)

    const decrementQuantity = () => {
        if (parseInt(quantity) > 1) {
            setQuantity((parseInt(quantity) - 1).toString())
        }
    }

    const incrementQuantity = () => {
        setQuantity((parseInt(quantity) + 1).toString())
    }

    const decrementAddOnQuantity = () => {
        if (parseInt(addOnQuantity) > 0) {
            setAddOnQuantity((parseInt(addOnQuantity) - 1).toString())
        }
    }

    const incrementAddOnQuantity = () => {
        setAddOnQuantity((parseInt(addOnQuantity) + 1).toString())
    }

    const cartData = JSON.stringify({ cart: [{ AddonQuantity: addOnQuantity, foodQuantity: quantity, data }] })

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'black'} barStyle={'default'} />
            <View style={styles.mainContainer}>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: data.foodImage }} style={styles.image} resizeMode='contain' />
                </View>
                <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.navigate('homeScreen')}>
                    <AntDesign name='back' size={50} color={'white'} />
                </TouchableOpacity>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.foodName}>
                            {data.foodName}
                        </Text>
                        <FontAwesome name='rupee' size={46} style={{ marginLeft: 10, color: 'black' }} />
                        <Text style={styles.foodPrice}>{data.foodPrice}/-</Text>
                    </View>
                </View>
                <View style={styles.aboutCon}>
                    <Text style={styles.aboutFood}>
                        About Food
                    </Text>
                    <Text style={{ fontSize: 14, color: '#dcdde1', marginHorizontal: 20, marginTop: 10 }}>
                        {data.foodNameDescription.slice(0, 72)}
                    </Text>

                    <View style={styles.foodType}>
                        {data.foodType === 'veg' ? <Text style={styles.veg}></Text> : <Text style={styles.nonVeg}></Text>}
                        <Text style={styles.vegNonVeg}>{data.foodType}</Text>

                    </View>

                </View>
                <View style={styles.detailsCon}>
                    <Text style={styles.resText}>Restaurant Details</Text>
                    <Text style={styles.resDetails}>
                        Restaurant Name:  {data.restaurantName}
                    </Text>
                    <Text style={styles.resDetails}>
                        Ph No:   {data.restaurantPhone}
                    </Text>

                    <Text style={styles.resDetails}>
                        Location:
                        <Text style={styles.location}> {data.restaurantBuildingAddress} | </Text>
                        <Text style={styles.location}>{data.restaurantStreetAddress} | </Text>
                        <Text style={styles.location}>{data.restaurantCityAddress} | </Text>
                        <Text style={styles.location}>{data.restaurantAddressPincode}</Text>

                    </Text>
                    <View style={styles.lineBreak}></View>

                </View>
                <View style={styles.addToCart}>

                    <View style={styles.mainAddOn}>
                        <Text style={styles.AddonHeading}>Food Quantity</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                            <TouchableOpacity onPress={() => decrementQuantity()}>
                                <Entypo name='minus' style={styles.icons} />
                            </TouchableOpacity>
                            <Text style={styles.inputStyle}>{quantity}</Text>
                            <TouchableOpacity onPress={() => incrementQuantity()}>
                                <Entypo name='plus' style={styles.icons} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* add on Quantity here  */}
                {data.foodAddonPrice != "" && (
                    <View style={styles.addToCart}>

                        <View style={styles.mainAddOn}>
                            <Text style={styles.AddonHeading}>Add On</Text>
                            <View style={styles.addonCon}>
                                <Text style={{ fontSize: 18 }}>{data.foodAddon}</Text>
                                <Text style={{ fontSize: 18 }}> Rs.{data.foodAddonPrice}/-</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => decrementAddOnQuantity()}>
                                    <Entypo name='minus' style={styles.icons} />
                                </TouchableOpacity>
                                <Text style={styles.inputStyle}>{addOnQuantity}</Text>
                                <TouchableOpacity onPress={() => incrementAddOnQuantity()}>
                                    <Entypo name='plus' style={styles.icons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>)}

                <View style={styles.totalPriceContainer}>
                    <View style={styles.subTotalContainer}>
                        <Text style={styles.totalText}>Total Price</Text>
                        {data.foodAddonPrice != "" ? <Text style={styles.withAddOn}>
                            ₹{((parseInt(data.foodPrice) * parseInt(quantity) +
                                parseInt(addOnQuantity) * parseInt(data.foodAddonPrice))).toString()}/-
                        </Text>
                            :
                            <Text style={styles.withoutAddOn}>
                                ₹{(parseInt(data.foodPrice) * parseInt(quantity)).toString()}/-
                            </Text>}
                    </View>

                </View>

                <View style={styles.btnContainer}  >
                    <TouchableOpacity style={styles.btnstyless1} onPress={() => addToCart()}>
                        <Text style={styles.textColor}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnstyless2} onPress={() => navigation.navigate('placeOrder', { cartData })}>
                        <Text style={styles.textColor}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProductPage

const styles = StyleSheet.create({
    closeBtn: {
        // marginTop: 10,
        width: 60,
        backgroundColor: "red",
        position: 'absolute',
        borderBottomRightRadius: 10,
        borderWidth: 1

    },
    imageContainer: {
        width: '100%',
        height: 310,
        // marginTop: 10,
        // position: 'relative'

    },
    image: {
        width: '100%',
        height: 310,
        borderRadius: 1,
        // position: 'absolute'

    },
    mainContainer: {
        marginBottom: 20
    },
    textContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    foodName: {
        fontSize: 27,
        width: '60%',
        // borderWidth: 1,
        paddingLeft: 10, color: 'red'
    },
    foodPrice: {
        fontSize: 40,
        color: 'black'


    },
    aboutCon: {
        backgroundColor: 'red',
        margin: 30,
        height: 220,
        borderRadius: 10,
        elevation: 10
    },
    aboutFood: {
        fontSize: 26, color: '#dcdde1',
        marginLeft: 20,
        marginTop: 20
    },
    foodType: {
        width: 150,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 20,
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nonVeg: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 15
    },
    veg: {
        width: 30,
        height: 30,
        backgroundColor: 'green',
        borderRadius: 15
    },
    vegNonVeg: {
        fontSize: 20, marginLeft: 15,
        color: 'black'
    },
    btnstyless1: {
        backgroundColor: '#e84118',
        height: 60,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // marginLeft: 20,
        // marginTop: 30,
        // flexDirection: 'row'
    },
    btnstyless2: {
        backgroundColor: 'green',
        height: 60,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        // marginLeft: 20,
        // marginTop: 30,
        // flexDirection: 'row'
    },
    textColor: {
        fontSize: 20,
        color: 'white'
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30
    },
    detailsCon: {
        // margin: 20,
        marginHorizontal: 20,
        backgroundColor: '#dff9fb',
        padding: 10,
        borderRadius: 10,
        width: '90%', height: 180,
        elevation: 10
    },
    resText: {
        textAlign: 'center',
        fontSize: 22,
        borderBottomWidth: 2,
        borderBottomColor: 'orange',
        color: '#e67e22'

    },
    location: {
        fontSize: 16,
        marginLeft: 10,
        color: '#34495e'

    },
    resDetails: {
        fontSize: 16,
        marginTop: 5, paddingHorizontal: 5, color: '#34495e'
    },
    lineBreak: {
        borderBottomWidth: 2,
        borderBottomColor: "orange",
        marginVertical: 10
    },
    addToCart: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1,
        padding: 10,
        marginHorizontal: 40,
        borderRadius: 30,
        backgroundColor: '#dff9fb',
        elevation: 15


    },
    mainAddOn: {

    },
    AddonHeading: {
        fontSize: 30,
        textAlign: 'center',
        color: '#e67e22'

    },
    addonCon: {
        flexDirection: 'row',
        marginTop: 10

        // borderWidth: 1
    },
    inputStyle: {
        backgroundColor: 'white',
        alignItems: 'center', justifyContent: 'center',
        // marginHorizontal: 25,
        fontSize: 30,
        marginHorizontal: 30,
        backgroundColor: '#dff9fb',
        color: '#576574'
    },
    icons: {
        fontSize: 30,
        backgroundColor: '#f0932b',
        alignItems: 'center', justifyContent: 'center',
        color: 'white',
        padding: 10,
        borderRadius: 15
    },
    totalPriceContainer: {
        marginTop: 50,
        // borderWidth: 1,
        margin: 10,
        borderRadius: 30,
        padding: 10,
        backgroundColor: 'white',
        elevation: 15

    },

    totalText: {
        fontSize: 25,
        color: "#c0392b"
    },
    subTotalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    withoutAddOn: {
        fontSize: 25,
        // borderWidth: 1,
        width: '30%'
    },
    withAddOn: {
        fontSize: 25,
        width: '30%'
    }




})