import { FlatList, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);



const CardSlider = ({ data, title }) => {

    const [showLoder, setShowLoader] = useState(true);
    const navigation = useNavigation()
    const openProductPage = (item) => {
        navigation.navigate('productPage', item)

    }




    // const cartData = JSON.stringify({ cart: [{ AddonQuantity: addOnQuantity, foodQuantity: quantity, data }] })
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.specialTitle}>
                {title}
            </Text>
            <View>
                <FlatList data={data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.cardsout}
                    overScrollMode='never'
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => openProductPage(item)}>
                                <View style={styles.subMainContainer}>
                                    <View style={styles.imagesContainer}>
                                        <Image source={{ uri: item.foodImage }} resizeMode='contain' style={styles.foodImages} />
                                    </View>

                                    <View style={styles.TextContainer}>
                                        <Text style={styles.foodName}>{item.foodName}</Text>
                                    </View>
                                    <View style={styles.subTextContainer} >
                                        <Text style={styles.foodPrice}>Rs.{item.foodPrice}/-</Text>
                                        {/* {item.foodType == 'veg' ? <Text style={styles.greenColor}></Text> : <Text style={styles.redColor}></Text>} */}


                                    </View>

                                    <Text style={styles.details}>{item.restaurantName}</Text>
                                    <Text style={styles.details}>location: {item.restaurantCityAddress}</Text>
                                    <TouchableOpacity style={styles.buyNowBtn}
                                    // onPress={() => navigation.navigate('placeOrder', { cartData })}
                                    >
                                        <Text style={styles.buyNowText}>Buy Now</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
        </View>
    )
}

export default CardSlider

const styles = StyleSheet.create({
    greenColor: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'green',
        marginRight: 4
    },
    redColor: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        marginRight: 4
    },

    specialTitle: {
        fontSize: 25,
        color: '#34495e',
        marginLeft: 10

    },
    mainContainer: {
        marginTop: 20,
        // marginBottom: 150
    },
    cardsout: {
        width: '100%',
        height: undefined,
        // aspectRatio: 1
        // backgroundColor: 'yellow'
    },
    subMainContainer: {
        width: 170,
        height: 300,
        // height: undefined,
        margin: 10,
        // borderWidth: 1,
        borderRadius: 10,
        // borderColor: '#95a5a6',
        backgroundColor: 'white',
        // aspectRatio: 1
    },
    imagesContainer: {
        width: '100%',
        height: 130,
        borderRadius: 10

    },
    foodImages: {
        width: '100%',
        aspectRatio: 1.3,
        borderRadius: 10

    },
    TextContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: 3,
        marginTop: 5

    },

    foodName: {
        fontSize: 14,
        padding: 1,

        // borderWidth: 1,
        color: 'black',



    },
    foodPrice: {
        fontSize: 13,
        color: 'black'

        // width: 100
        // alignItems: 'center',


    },

    subTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderWidth: 1,
        padding: 3
        // marginRight: 2,
        // width: 70,



    },
    buyNowBtn: {
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
        // marginBottom: 5,
        bottom: 5
    },
    buyNowText: {
        backgroundColor: 'green',
        width: '65%',
        textAlign: 'center',
        fontSize: 17,
        color: 'white',
        borderRadius: 10,
        paddingVertical: 5,
        // position: 'relative'
    },
    details: {
        fontSize: 12,
        color: '#7f8c8d',
        paddingLeft: 3
    }





})