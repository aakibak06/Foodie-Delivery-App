import { StyleSheet, Text, TouchableOpacity, View, StatusBar, TextInput, Alert } from 'react-native';
import React, { useEffect, useState, } from 'react';

import firebase from '@react-native-firebase/app';
// import { AppContext } from '../UseContext';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
// import { AppContext } from '../UseContext';
// const [isLogged, setIsLogged] = useContext(AppContext)
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const UserProfile = () => {
    const [showLoder, setShowLoader] = useState(false);
    const [userlogged, setUserlogged] = useState(null);
    const [userData, setUserData] = useState(null);

    const [edit, setEdit] = useState(false);
    const [passwordEdit, setPasswordEdit] = useState(false);

    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newPhone, setNewPhone] = useState('');

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigation = useNavigation();
    const handleLogout = () => {
        firebase.auth().signOut()
            .then(() => {

                console.log('logOut')
                navigation.navigate('login')

            })
            .catch((error) => {
                console.log(error)
            })

    }

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

    const getUserData = async () => {
        const docRef = firebase.firestore().collection('Users').where
            ('uid', '==', userlogged);
        const doc = await docRef.get();
        if (!doc.empty) {
            doc.forEach((doc) => {
                setUserData(doc.data())
                setShowLoader(true)

            })
        } else {
            console.log('no such document')
        }
    }
    useEffect(() => {

        getUserData()
    }, [userlogged])

    //

    const updateUser = async () => {
        const UserRef = firebase.firestore().collection('Users').where('uid', '==', userlogged);
        const doc = await UserRef.get();

        if (!doc.empty) {
            if (newName != "") {

                doc.forEach((doc) => {
                    doc.ref.update({
                        name: newName
                    }).then(() => {

                    })
                })
            }

        } if (newAddress != '') {
            doc.forEach((doc) => {
                doc.ref.update({
                    address: newAddress
                })
            })
        }
        if (newPhone != "") {
            doc.forEach((doc) => {
                doc.ref.update({
                    phone: newPhone
                }).then(() => {
                    alert("your data is updated")
                    getUserData()
                    setEdit(false)
                })
            })
        }

        else {
            alert('no User data')
        }




    }

    const updatePassword = async () => {
        try {
            const reauthenticate = (oldPassword) => {
                var user = firebase.auth().currentUser;
                var credent = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword);
                if (oldPassword != "" && newPassword != "") {
                    return user.reauthenticateWithCredential(credent);
                } else {
                    alert("enter credentials")
                }

            }
            const UserRef = firebase.firestore().collection('Users').where('uid', '==', userlogged);
            let doc = await UserRef.get();
            reauthenticate(oldPassword).then(() => {
                var user = firebase.auth().currentUser;
                user.updatePassword(newPassword).then(() => {

                    if (!doc.empty) {
                        if (newPassword != "") {
                            doc.forEach((doc) => {
                                doc.ref.update({
                                    password: newPassword

                                }).then((data) => {

                                    alert("Your password is updated")
                                    setPasswordEdit(false)
                                })
                            })
                        }
                    }


                })

            }).catch((error) => {
                console.log(error.message)
            })
        }
        catch (error) {
            console.log(error)
        }


    }
    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={'#dfe6e9'} barStyle={'dark-content'} />
            <View style={styles.userContainer}>
                <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
                    <AntDesign name='back' size={50} color={'white'} />
                </TouchableOpacity>
                {edit == false && passwordEdit == false &&
                    <View>

                        <Text style={styles.heading}>Your Profile</Text>
                        <View style={styles.usersdetals}>

                            {showLoder ?
                                <Text style={styles.title}>Name:
                                    {userData ?
                                        <Text style={styles.details}> {userData.name}</Text>
                                        : "Loading"
                                    }
                                </Text> : <ShimmerPlaceHolder style={styles.shimmerHoler}
                                    shimmerColors={['#2d3436', '#636e72', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            }

                            {showLoder ?
                                <Text style={styles.title}>Eamil:
                                    {userData ?
                                        <Text style={styles.details}> {userData.email}</Text>
                                        : 'Loading'


                                    }
                                </Text> : <ShimmerPlaceHolder style={styles.shimmerHoler}
                                    shimmerColors={['#2d3436', '#636e72', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            }

                            {showLoder ?
                                <Text style={styles.title}>Phone No:
                                    {userData ?
                                        <Text style={styles.details}> {userData.phone}</Text>
                                        : 'Loading'
                                    }
                                </Text> : <ShimmerPlaceHolder style={styles.shimmerHoler}
                                    shimmerColors={['#2d3436', '#636e72', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            }

                            {showLoder ?
                                <Text style={styles.title}>Address:
                                    {userData ?
                                        <Text style={styles.details}> {userData.address}</Text>
                                        : 'Loading'
                                    }
                                </Text> : <ShimmerPlaceHolder style={styles.shimmerHoler}
                                    shimmerColors={['#2d3436', '#636e72', '#2d3436']}
                                >

                                </ShimmerPlaceHolder>
                            }
                            <TouchableOpacity style={styles.logoutbtn} onPress={() => {
                                handleLogout()
                            }}>
                                <Text style={styles.logoutText}>LogOut</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setEdit(!edit)} style={styles.btnedit}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setPasswordEdit(!passwordEdit)} style={styles.btnedit}>
                            <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>Change Password</Text>
                        </TouchableOpacity>
                    </View>

                }

                {edit == true &&
                    <View style={styles.editContainer}>
                        <Text style={styles.heading}>Edit Profile</Text>
                        <TextInput placeholder='name' value={newName} onChangeText={(actualVal) => setNewName(actualVal)} style={styles.inputStyle}
                            placeholderTextColor={'#b2bec3'} />
                        <TextInput placeholder='address' value={newAddress} onChangeText={(actualVal) => setNewAddress(actualVal)} style={styles.inputStyle}
                            placeholderTextColor={'#b2bec3'}
                        />
                        <TextInput placeholder='phone' value={newPhone} onChangeText={(actualVal) => setNewPhone(actualVal)} style={styles.inputStyle} keyboardType='number-pad'
                            placeholderTextColor={'#b2bec3'} />

                        <TouchableOpacity style={styles.submitbtn} onPress={() => updateUser()}>
                            <Text style={styles.textBtn}>Submit</Text>
                        </TouchableOpacity>
                    </View>}

                {passwordEdit == true &&
                    <View style={styles.editContainer}>
                        <Text style={styles.heading}>Change Your Password</Text>
                        <TextInput placeholder='old password' value={oldPassword} onChangeText={(actualVal) => setOldPassword(actualVal)}
                            placeholderTextColor={'#b2bec3'} style={styles.inputStyle} />
                        <TextInput placeholder='new password' value={newPassword} onChangeText={(actualVal) => setNewPassword(actualVal)}
                            placeholderTextColor={'#b2bec3'} style={styles.inputStyle} />

                        <TouchableOpacity style={styles.submitbtn} onPress={() => updatePassword()}>
                            <Text style={styles.textBtn}>Submit</Text>
                        </TouchableOpacity>
                    </View>}
            </View>



        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#dfe6e9',
        // margin: 20,
        // borderRadius: 1

    },
    closeBtn: {
        width: 60,
        backgroundColor: "#d35400",
        borderTopLeftRadius: 10

    },
    userContainer: {
        flex: 1,
        // position: 'absolute',
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10,
        elevation: 20
    },
    heading: {
        marginTop: 40,
        fontSize: 25,
        color: '#e67e22',
        textAlign: 'center',
        marginBottom: 20
    },

    usersdetals: {
        margin: 20,
        // borderWidth: 1,
        backgroundColor: '#dff9fb',
        borderRadius: 10,
        padding: 10

    },
    title: {
        // padding: 20,
        fontSize: 20,
        margin: 5,
        color: '#e67e22',
        borderWidth: 0.3,
        padding: 8,
        borderRadius: 10
    },
    details: {
        fontSize: 18,
        color: 'black',
        marginRight: 20
    },
    logoutbtn: {
        backgroundColor: '#e67e22',
        borderRadius: 10,
        paddingVertical: responsiveHeight(1),
        width: responsiveWidth(30),
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: ,
        alignSelf: 'center',
        marginTop: responsiveHeight(3)
    },
    logoutText: {
        color: 'white',
        textAlign: 'center',
        fontSize: responsiveFontSize(2.4)
    },
    btnedit: {
        backgroundColor: 'black',
        // borderRadius: 10,
        padding: 5,

        marginTop: 10
    },
    inputStyle: {
        borderWidth: 0.4,
        margin: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 18,
        height: 50
    },
    submitbtn: {
        backgroundColor: '#74b9ff',
        margin: 10,
        marginTop: 30,
        borderRadius: 10

    },
    textBtn: {
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        color: 'white',
        paddingVertical: responsiveHeight(0.6)
    },
    shimmerHoler: {
        height: responsiveHeight(4),
        width: responsiveWidth(66),
        borderRadius: 1,
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 20

    }

})