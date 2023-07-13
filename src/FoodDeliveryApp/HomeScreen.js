import { ScrollView, ScrollViewBase, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import { firebase } from '../firebase/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
//screens 
import HomeNav from './underHomescreen/HomeNav';
import Categories from './underHomescreen/Categories';
import OfferSliders from './underHomescreen/OfferSliders';
import CardSlider from './underHomescreen/CardSlider';
import NavBottom from './NavBottom';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
// import DrawerNavigationApp from '../drawerNavigation/DrawerNavigation';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);





const HomeScreen = ({ navigation }) => {
    const [showLoder, setShowLoader] = useState(false);

    const [foodData, setFoodData] = useState([]);
    const [vegFood, setVegFood] = useState([]);
    const [nonVegFood, setNonVegFood] = useState([]);
    const [search, setSearch] = useState('');


    const foodRef = firestore().collection('FoodData');

    useEffect(() => {
        foodRef.onSnapshot((snapshot) => {
            setFoodData(snapshot.docs.map((doc) => doc.data()))
            setShowLoader(true)
        })
    }, [])

    useEffect(() => {
        setVegFood(foodData.filter((item) => item.foodType === 'veg'))
        setNonVegFood(foodData.filter((item) => item.foodType === 'non-veg'))
        setShowLoader(true)
    }, [foodData])




    return (
        // <ScrollView nestedScrollEnabled={false} >
        <View style={styles.mainContainer} >

            {/* <View style={{ height: '100%', position: 'absolute', zIndex: 20, width: 800 }}>
                <DrawerNavigationApp />
            </View> */}
            <View style={styles.Navtop}>
                <HomeNav />
            </View>


            <View style={styles.NavBottom}>
                <NavBottom />
            </View>

            <ScrollView>



                <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />



                <View style={styles.searchBox}>
                    <AntDesign name='search1' size={30} color={'#d35400'} />
                    <TextInput placeholder='Search' autoCapitalize='none' style={styles.inputStyle} onChangeText={(actualVal) => setSearch(actualVal)} />
                </View>
                {
                    search != '' && <View style={styles.searchResultsSouter}>
                        {foodData.map((item, index) => {
                            if (item.foodName.toLowerCase().includes(search)) {
                                return (
                                    <View style={styles.searchContainer} key={index}>
                                        <AntDesign name='arrowright' size={30} color={'green'} />
                                        <Text style={styles.searchText}>{item.foodName}</Text>
                                    </View>
                                )
                            }
                        })}

                    </View>
                }



                <View >

                    <Categories />
                    <OfferSliders />

                    {showLoder ?
                        <CardSlider title={"Today's Special"} data={foodData} />
                        : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                            <View>
                                <ShimmerPlaceHolder style={{ width: 100, height: 100, borderRadius: 50 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>
                            <View >
                                <ShimmerPlaceHolder style={{ width: 150, height: 20, borderRadius: 4, marginLeft: 40 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder style={{ width: 150, height: 20, borderRadius: 4, marginTop: 10, marginLeft: 6 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>
                            <View>
                                <ShimmerPlaceHolder style={{ width: 50, height: 50, borderRadius: 4, marginLeft: 20 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>

                        </View>

                    }

                    {showLoder ?
                        <CardSlider title={"For Vegetarians"} data={vegFood} />
                        : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                            <View>
                                <ShimmerPlaceHolder style={{ width: 100, height: 100, borderRadius: 50 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>
                            <View >
                                <ShimmerPlaceHolder style={{ width: 150, height: 20, borderRadius: 4, marginLeft: 40 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder style={{ width: 150, height: 20, borderRadius: 4, marginTop: 10, marginLeft: 6 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>
                            <View>
                                <ShimmerPlaceHolder style={{ width: 50, height: 50, borderRadius: 4, marginLeft: 20 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>

                        </View>


                    }

                    {showLoder ?
                        <CardSlider title={"For Non-Vegetarians"} data={nonVegFood} />
                        : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                            <View>
                                <ShimmerPlaceHolder style={{ width: 100, height: 100, borderRadius: 50 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>
                            <View >
                                <ShimmerPlaceHolder style={{ width: 150, height: 20, borderRadius: 4, marginLeft: 40 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder style={{ width: 150, height: 20, borderRadius: 4, marginTop: 10, marginLeft: 6 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>
                            <View>
                                <ShimmerPlaceHolder style={{ width: 50, height: 50, borderRadius: 4, marginLeft: 20 }}
                                    shimmerColors={['#636e72', '#b2bec3', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            </View>

                        </View>


                    }





                </View>


            </ScrollView>
        </View>


    )
}

export default HomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 70,
        height: '100%'

    },


    searchBox: {
        flexDirection: 'row',
        width: '90%',
        backgroundColor: 'white', margin: 10,
        elevation: 20,
        borderRadius: 30,
        alignItems: 'center',
        paddingLeft: 10,
        marginLeft: 20,
        height:50


    },
    inputStyle: {
        width: '90%',
        marginLeft: 10, fontSize: 18,
        color: 'black'
    },
    searchResultsSouter: {
        width: '95%',
        height: '100%',
        marginHorizontal: 10,

    },
    searchContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    searchText: {
        fontSize: 20,
        color: '#cd6133',
        marginLeft: 10
    },
    NavBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 20,
        // height: 60,
        backgroundColor: '#dff9fb',

    },




})