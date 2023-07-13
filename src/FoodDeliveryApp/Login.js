import { StyleSheet, Text, TextInput, View, Button, Alert, TouchableOpacity, ScrollView, StatusBar, Dimensions } from 'react-native'
import React, { useState, useContext, useEffect } from 'react';
import User from 'react-native-vector-icons/AntDesign';
import Lock from 'react-native-vector-icons/Fontisto';
import Eye from 'react-native-vector-icons/Octicons';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { height, width } = Dimensions.get('window')





import firebase from '@react-native-firebase/app';
import { AppContext } from './UseContext';
import HomeScreen from './HomeScreen';




const Login = ({ navigation }) => {
    const { isLogged, setIsLogged } = useContext(AppContext);

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [customError, setCustomError] = useState(null);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignIn = () => {
        if (!email) {
            setEmailError(true)
            return false
        } else {
            setEmailError(false)

        }

        if (!password) {
            setPasswordError(true)
            return false
        } else {
            setPasswordError(false)
        }

        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredentials) => {
                    var user = userCredentials.user;
                    console.log('User login successfully')
                    // console.log(user)
                    if (user) {
                        navigation.navigate('homeScreen')
                        setEmail('')
                        setPassword('')
                    }
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    if (errorMessage == '[auth/invalid-email] The email address is badly formatted.') {
                        setCustomError('Please enter a valid email address')
                    } else {
                        setCustomError('Incorrect email and password')
                    }
                })
        }
        catch (error) {
            console.log(error.message)
        }



    }




    const checkLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setIsLogged(true)
                console.log('useLooged in')
            } else {
                setIsLogged(false)
                setIsLogged('user not logged in')
            }
        })
    }

    useEffect(() => {
        checkLoggedIn()
    }, [])
    return (

        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
            <View style={{ display: 'flex', height: height, width: width }}>
                {
                    isLogged === true ? (<HomeScreen />) :
                        (
                            <View style={styles.container}>
                                <StatusBar backgroundColor='#f1f2f6' barStyle={'dark-content'} />
                                <Text style={styles.header}>Sign In</Text>
                                {customError != null && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ color: '#cd6133', fontSize: 15 }}>{customError} </Text>
                                    <AntDesign name='exclamationcircle' size={28} color={'black'} />
                                </View>}

                                <View style={styles.inputContainer}>
                                    <User name='user' size={25} color={emailFocus === true ? 'red' : '#636e72'} />
                                    <TextInput placeholder='Eamil' autoCapitalize='none' style={styles.inputStyle}
                                        placeholderTextColor={'#b2bec3'}
                                        cursorColor={'#636e72'}
                                        onFocus={() => {
                                            setEmailFocus(true)
                                            setPasswordFocus(false)
                                            setShowPassword(false)
                                            setCustomError(null)
                                        }}
                                        onChangeText={(actualVal) => setEmail(actualVal)}
                                    />
                                </View>
                                {emailError == true && <Text style={{ fontSize: 12, alignSelf: 'flex-start', marginLeft: 45, marginTop: -10, color: 'red' }} z>please fill the details</Text>}
                                <View style={styles.inputContainer}>
                                    <Lock name='locked' size={25} color={passwordFocus === true ? 'red' : '#636e72'} />
                                    <TextInput placeholder='Password' autoCapitalize='none' style={styles.inputStyle}
                                        placeholderTextColor={'#b2bec3'}
                                        cursorColor={'#636e72'}

                                        onFocus={() => {
                                            setPasswordFocus(true)
                                            setEmailFocus(false)
                                            setCustomError(null)
                                        }}
                                        secureTextEntry={showPassword === false ? true : false}
                                        onChangeText={(actualVal) => setPassword(actualVal)}
                                    />
                                    <Eye name={showPassword === false ? "eye-closed" : "eye"} style={styles.eyeStyle} size={26} color={'#636e72'} onPress={() => setShowPassword(!showPassword)} />
                                </View>
                                {passwordError == true && <Text style={{ fontSize: 12, alignSelf: 'flex-start', marginLeft: 45, marginTop: -10, color: 'red' }} z>please fill the details</Text>}
                                <TouchableOpacity style={{
                                    display: "flex", width: '80%', marginTop: 20, height: 50,
                                }}
                                    onPress={() => {
                                        handleSignIn()

                                    }}
                                >
                                    <Text style={{
                                        fontSize: 25, color: 'white', backgroundColor: '#e84118', borderRadius: 10, height: '100%', width: '100%', padding: 8, textAlign: 'center'

                                    }}>Sign In</Text>
                                </TouchableOpacity>
                                <View style={{

                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    // height: '50%',
                                    // borderWidth: 1,
                                    // flex: 1

                                }}>

                                    <Text style={styles.forgot}>Forgot Password</Text>
                                    <Text style={styles.or}>OR</Text>
                                    <Text style={styles.otherSignIn}>Sign In With</Text>


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

                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={{ color: '#636e72' }}>Don't have an account</Text>
                                        <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                                            <Text style={{ color: '#1e90ff', marginLeft: 10 }}>SignUp</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                        )
                }
            </View>
        </ScrollView>

    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    header: {
        fontSize: 40,
        color: '#e84118',
        marginBottom: 30,
        marginTop: 40
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: '#f5f6fa',
        elevation: 20,
        borderRadius: 10,
        marginVertical: 20,
        alignItems: 'center',
        paddingLeft: 5,
        height: 50,
        // padding: 10
    },
    inputStyle: {
        display: 'flex',
        paddingLeft: 10,
        // margin: 30,
        fontSize: 20,
        width: '80%',
        height: '100%',
        color: 'black',




    },

    eyeStyle: {
        position: 'absolute',
        right: 10
    },
    forgot: {
        marginVertical: 10,
        fontSize: 17,
        color: '#718093'
    },
    or: {
        color: '#e84118',
        fontSize: 20
    },
    otherSignIn: {
        marginTop: 10,
        fontSize: 30,
        color: '#b2bec3'
    },
    btnBack: {
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
    }

})