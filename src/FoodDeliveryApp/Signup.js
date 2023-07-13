import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native'
import React, { useEffect, useState, } from 'react';
import User from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/Fontisto';
import Eye from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useIsFocused } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// import firebase from 'firebase'






const Signup = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [CpasswordFocus, setCPasswordFocus] = useState(false);
    const [CshowPassword, setCShowPassword] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    // signup validations
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [address, setAddress] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [cpasswordError, setCpasswordError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [customError, setCustomError] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const SaveCredentials = () => {
        if (!name) {
            setNameError(true)
            return false
        } else {
            setNameError(false)

        }

        if (!email) {
            setEmailError(true)
            return false
        } else {
            setEmailError(false)
        }

        if (!phone) {
            setPhoneError(true)
            return false
        } else {
            if (phone.length != 10) {
                setCustomError('Phone Number is not Valid')
                return false
            } else {
                setCustomError(null)
            }
            setPhoneError(false)
        }



        if (!password) {
            setPasswordError(true)
            return false
        } else {
            if (password.length <= 7) {
                setCustomError('password atleast 8 character requried')
                return false
            } else {
                setCustomError(null)
            }
            setPasswordError(false)
        }

        if (!cpassword) {
            setCpasswordError(true)
            return false
        } else {
            if (password != cpassword) {
                setCustomError("password not match")
                return false
            }

            else {
                setCustomError(null)
            }
            setCpasswordError(false)
        }

        if (!address) {
            setAddressError(true)
            return false
        } else {
            if (address.length < 30) {
                setCustomError('Address is too short')
                return false
            } else {
                setCustomError(null)
            }
            setAddressError(false)
        }

        // navigation.navigate('login')
        try {
            //data store in authenticater firbase
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((usersInfo) => {
                    console.log('user created')

                    // store data in firestore
                    const userRef = firestore().collection("Users")
                    userRef.add({
                        name: name,
                        email: email,
                        phone: phone,
                        password: password,
                        address: address,
                        uid: usersInfo.user.uid


                    }).then(() => {
                        console.log('Data Added to fireStore')
                        setSuccessMsg("User has been created successfully")
                    })
                })
                .catch((error) => {
                    // agar aapka internet chal rha ho firebase ki taraf se koi dikkat hogo to ye wala error aayega
                    console.log('signup firebase error', error.message)
                    if (error.message == '[auth/email-already-in-use] The email address is already in use by another account.') {
                        setCustomError('Email already exist')
                    }
                    else if (error.message == '[auth/invalid-email] The email address is badly formatted.') {
                        setCustomError("Invalid Email")
                    }
                    else {
                        console.log(error.message)
                    }
                })

        }
        catch (error) {
            // agar aapka internet nhi chal rha ho to ye waha error aayega 
            console.log('signup system error', error.message)
        }



    }


    const navigateToLogin = () => {
        navigation.navigate('login')
    }






    return (
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <View>
                {successMsg == null ?
                    (<View style={styles.container}>
                        <StatusBar backgroundColor='#f1f2f6' barStyle={'dark-content'} />
                        <Text style={styles.header}>Sign Up</Text>
                        {customError != null && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#cd6133', fontSize: 15 }}>{customError} </Text>
                            <AntDesign name='exclamationcircle' size={28} color={'black'} />
                        </View>}
                        <View style={styles.inputContainer}>
                            <User name='user' size={25} color={nameFocus === true ? 'red' : '#636e72'} />
                            <TextInput placeholder='Full Name' autoCapitalize='none' style={styles.inputStyle}
                                placeholderTextColor={'#b2bec3'}
                                cursorColor={'#636e72'}
                                onFocus={() => {
                                    setNameFocus(true)
                                    setPasswordFocus(false)
                                    setShowPassword(false)
                                    setPhoneFocus(false)
                                    setEmailFocus(false)
                                    setCPasswordFocus(false)
                                    setCShowPassword(false)
                                    setAddressFocus(false)
                                    setCustomError(null)
                                }}
                                onChangeText={(actualVal) => setName(actualVal)}
                            />

                        </View>
                        {nameError == true && <Text style={{ fontSize: 10, alignSelf: 'flex-start', marginLeft: 34, marginTop: -10, color: 'red' }} z>please fill the details</Text>}
                        <View style={styles.inputContainer}>
                            <Entypo name='email' size={25} color={emailFocus === true ? 'red' : '#636e72'} />
                            <TextInput placeholder='Eamil' autoCapitalize='none' style={styles.inputStyle}
                                placeholderTextColor={'#b2bec3'}
                                cursorColor={'#636e72'}
                                onFocus={() => {
                                    setEmailFocus(true)
                                    setPasswordFocus(false)
                                    setShowPassword(false)
                                    setNameFocus(false)
                                    setPhoneFocus(false)
                                    setCPasswordFocus(false)
                                    setCShowPassword(false)
                                    setAddressFocus(false)
                                    setCustomError(null)
                                }}
                                onChangeText={(actualVal) => setEmail(actualVal)}
                            />

                        </View>
                        {emailError == true && <Text style={{ fontSize: 10, alignSelf: 'flex-start', marginLeft: 34, marginTop: -10, color: 'red' }} z>please fill the details</Text>}
                        <View style={styles.inputContainer}>
                            <Feather name='smartphone' size={25} color={phoneFocus === true ? 'red' : '#636e72'} />
                            <TextInput placeholder='Phone Number' autoCapitalize='none' style={styles.inputStyle}
                                placeholderTextColor={'#b2bec3'}
                                cursorColor={'#636e72'}
                                onFocus={() => {
                                    setPhoneFocus(true)
                                    setPasswordFocus(false)
                                    setShowPassword(false)
                                    setCPasswordFocus(false)
                                    setNameFocus(false)
                                    setEmailFocus(false)
                                    setCShowPassword(false)
                                    setAddressFocus(false)
                                    setCustomError(null)

                                }}
                                keyboardType='number-pad'
                                onChangeText={(actualVal) => setPhone(actualVal)}
                            />

                        </View>
                        {phoneError == true && <Text style={{ fontSize: 10, alignSelf: 'flex-start', marginLeft: 34, marginTop: -10, color: 'red' }} z>please fill the details</Text>}

                        <View style={styles.inputContainer}>
                            <Lock name='locked' size={25} color={passwordFocus === true ? 'red' : '#636e72'} />
                            <TextInput placeholder='Password' autoCapitalize='none' style={styles.inputStyle}
                                placeholderTextColor={'#b2bec3'}
                                cursorColor={'#636e72'}
                                onFocus={() => {
                                    setPasswordFocus(true)
                                    setEmailFocus(false)
                                    setCPasswordFocus(false)
                                    setNameFocus(false)
                                    setPhoneFocus(false)
                                    setCShowPassword(false)
                                    setAddressFocus(false)
                                    setCustomError(null)

                                }}
                                secureTextEntry={showPassword === false ? true : false}
                                onChangeText={(actualVal) => setPassword(actualVal)}
                            />
                            <Eye name={showPassword === false ? "eye-closed" : "eye"} style={styles.eyeStyle} color={'#636e72'} size={26} onPress={() => setShowPassword(!showPassword)} />
                        </View>
                        {passwordError == true && <Text style={{ fontSize: 10, alignSelf: 'flex-start', marginLeft: 34, marginTop: -10, color: 'red' }} z>please fill the details</Text>}
                        <View style={styles.inputContainer}>
                            <Lock name='locked' size={25} color={CpasswordFocus === true ? 'red' : '#636e72'} />
                            <TextInput placeholder='Confirm Password' autoCapitalize='none' style={styles.inputStyle}
                                placeholderTextColor={'#b2bec3'}
                                cursorColor={'#636e72'}
                                onFocus={() => {
                                    setCPasswordFocus(true)
                                    setEmailFocus(false)
                                    setShowPassword(false)
                                    setPhoneFocus(false)
                                    setPasswordFocus(false)
                                    setNameFocus(false)
                                    setAddressFocus(false)
                                    setCustomError(null)
                                }}
                                secureTextEntry={CshowPassword === false ? true : false}
                                onChangeText={(actualVal) => setCpassword(actualVal)}
                            />
                            <Eye name={CshowPassword === false ? "eye-closed" : "eye"} style={styles.eyeStyle} color={'#636e72'} size={26} onPress={() => setCShowPassword(!CshowPassword)} />
                        </View>
                        {cpasswordError == true && <Text style={{ fontSize: 10, alignSelf: 'flex-start', marginLeft: 34, marginTop: -10, color: 'red' }} z>please fill the details</Text>}

                        <Text style={{ fontSize: 17, color: '#44bd32' }}>Enter your Address:</Text>
                        <View style={styles.inputContainer}>
                            <Entypo name='home' size={25} color={addressFocus === true ? 'red' : '#636e72'} />
                            <TextInput placeholder='address...' autoCapitalize='none' style={styles.inputStyle}
                                placeholderTextColor={'#b2bec3'}
                                cursorColor={'#636e72'}
                                onFocus={() => {
                                    setAddressFocus(true)
                                    setCPasswordFocus(false)
                                    setEmailFocus(false)
                                    setShowPassword(false)
                                    setPhoneFocus(false)
                                    setPasswordFocus(false)
                                    setNameFocus(false)
                                    setCustomError(null)
                                }}
                                onChangeText={(actualVal) => setAddress(actualVal)}
                                scrollEnabled
                            />
                        </View>
                        {addressError == true && <Text style={{ fontSize: 10, alignSelf: 'flex-start', marginLeft: 34, marginTop: -10, color: 'red' }} >please fill the details</Text>}

                        <TouchableOpacity style={{ height: 50, backgroundColor: '#e84118', borderRadius: 10, width: '85%', marginTop: 20, justifyContent: 'center' }}
                            onPress={() => {
                                SaveCredentials()

                            }}
                        >
                            <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}>Sign Up</Text>
                        </TouchableOpacity>

                        {/* <Text style={styles.forgot}>Forgot Password</Text> */}
                        <Text style={styles.or}>OR</Text>
                        <Text style={styles.otherSignIn}>Sign Up With</Text>

                        <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'space-evenly', width: '100%' }}>
                            <TouchableOpacity style={styles.btnBack}>
                                <View>
                                    <User name='google' size={30} color={'#e84118'} />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnBack}>
                                <View>
                                    <FontAwesome name='facebook' size={35} color={'#1B9CFC'} />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnBack}>
                                <View>

                                    <User name='twitter' size={30} color={'#1B9CFC'} />

                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lines}></View>

                        <View style={{ flexDirection: "row", marginBottom: 30 }}>
                            <Text style={{ color: '#636e72' }}>Already have an account</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                <Text style={{ color: '#1e90ff', marginLeft: 10 }}>SignIn</Text>
                            </TouchableOpacity>
                        </View>

                    </View>)
                    : (<View>
                        <Text style={styles.successMsg}>{successMsg}</Text>
                        <TouchableOpacity style={{ backgroundColor: '#e84118', borderRadius: 10, width: '85%', marginTop: 10, marginHorizontal: 30 }}
                            onPress={navigateToLogin}
                        >
                            <Text style={{ fontSize: 25, textAlign: 'center', padding: 10, color: 'white' }}>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: '#e84118', borderRadius: 10, width: '85%', marginTop: 10, marginHorizontal: 30 }}
                            onPress={() => {
                                setSuccessMsg(null)
                                setName("")
                                setEmail("")
                                setPhone("")
                                setPassword("")
                                setCpassword("")
                                setAddress("")
                            }}
                        >
                            <Text style={{ fontSize: 25, textAlign: 'center', padding: 10, color: 'white' }}>Go Back</Text>
                        </TouchableOpacity>
                    </View>)
                }
            </View>
        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 30,
        color: '#e84118',
        marginBottom: 10,
        marginTop: 30
    },
    inputContainer: {
        flexDirection: 'row',
        width: '85%',
        marginVertical: 10,
        backgroundColor: '#f5f6fa',
        elevation: 20, borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        paddingLeft: 5,
        height: 50
    },
    inputStyle: {
        paddingLeft: 5,
        padding: 13,
        fontSize: 20,
        width: '80%',
        height: '100%',
        color: 'black'
    },

    eyeStyle: {
        position: 'absolute',
        right: 10,
    },

    or: {
        color: '#e84118',
        fontSize: 16, marginTop: 5
    },
    otherSignIn: {
        marginTop: 5,
        fontSize: 22,
        color: '#b2bec3'
    },
    btnBack: {
        marginTop: -20,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        elevation: 20,
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lines: {
        width: '80%',
        borderBottomColor: '#a4b0be',
        borderBottomWidth: 2,
        marginHorizontal: 40,
        marginVertical: 20,
        borderRadius: 10,
        elevation: 20
    },
    successMsg: {
        fontSize: 20,
        marginTop: 200,
        color: '#6ab04c',
        borderWidth: 3,
        borderColor: '#27ae60',
        margin: 10,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10
    }


})