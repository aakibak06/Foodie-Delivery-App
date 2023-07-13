import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper'
import AntDesign from 'react-native-vector-icons/AntDesign';


const OfferSliders = () => {
    return (
        <View>
            <View style={styles.offerSwiper}>
                <Swiper autoplay={true} showsButtons={true} dotColor='#bdc3c7' activeDotColor='red'
                    nextButton={<Text style={styles.btn}><AntDesign name='rightcircle' size={30} color={'white'} /> </Text>}
                    prevButton={<Text style={styles.btn}><AntDesign name='leftcircle' size={30} color={'white'} /> </Text>}
                >
                    <View style={styles.slide}>
                        <Image source={require('../../../assets/images/img1.png')} resizeMode='cover' style={styles.imageStyle} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../../assets/images/img2.png')} style={styles.imageStyle} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../../assets/images/img3.png')} style={styles.imageStyle} />
                    </View>
                    <View style={styles.slide}>
                        <Image source={require('../../../assets/images/img4.png')} style={styles.imageStyle} />
                    </View>
                </Swiper>
            </View>
        </View>
    )
}

export default OfferSliders

const styles = StyleSheet.create({
    offerSwiper: {
        width: '100%',
        height: 200,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    slide: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    btn: {
        backgroundColor: 'red',
        height: 40,
        width: 40,
        borderRadius: 20,
        paddingLeft: 3,
        paddingTop: 2


    }
})