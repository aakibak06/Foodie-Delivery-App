import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const Categories = () => {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30, color: '#EE5A24', marginBottom: 10, borderBottomWidth: 3, borderColor: '#EE5A24', padding: 5 }}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.categories}>
                    <FontAwesome5 name='hamburger' size={28} color={'black'} style={styles.icons} />
                    <Text style={styles.textStyle}>Burger</Text>
                </View>
                <View style={styles.categories}>
                    <FontAwesome5 name='pizza-slice' size={28} color={'black'} style={styles.icons} />
                    <Text style={styles.textStyle}>Pizza</Text>
                </View>
                <View style={styles.categories}>
                    <MaterialCommunityIcons name='noodles' size={28} color={'black'} style={styles.icons} />
                    <Text style={styles.textStyle}>Noodles</Text>
                </View>
                <View style={styles.categories}>
                    <FontAwesome name='birthday-cake' size={28} color={'black'} style={styles.icons} />
                    <Text style={styles.textStyle}>Cakes</Text>
                </View>
                <View style={styles.categories}>
                    <MaterialIcons name='icecream' size={28} color={'black'} style={styles.icons} />
                    <Text style={styles.textStyle}>icecream</Text>
                </View>
                <View style={styles.categories}>
                    <MaterialIcons name='emoji-food-beverage' size={28} color={'black'} style={styles.icons} />
                    <Text style={styles.textStyle}>Tea</Text>
                </View>
                <View style={styles.categories}>
                    <MaterialCommunityIcons name='food-turkey' size={28} color={'black'} style={styles.icons} />
                    <Text style={styles.textStyle}>non-veg</Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 20,
        alignItems: 'center',
        height: 160,
        width: '90%',
        marginHorizontal: 20
    },
    categories: {
        margin: 5,
        alignItems: 'center',
        borderWidth: 0.2,
        padding: 5,
        borderRadius: 10,
        width: 88,
        height: 64

    },
    textStyle: {
        fontSize: 13,
        color: 'black',
        marginTop: 2

    }

})