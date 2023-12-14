import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useState, useRef } from 'react'
import LogInLogoImage from '../../Assets/login_logo.png'
import PhoneInput from "react-native-phone-number-input";
import { actions } from '../../Redux/Action/ActionIndex'

const LoginScreen = ({ navigation }) => {

    const phoneInput = useRef(null);
    const [mobileNumber, setMobileNumber] = useState("");

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView>
            {/* Login Top Text */}
            <Text style={styles.headerTextStyle}>Log in</Text>
            {/* Login Top Image */}
            <View style={{ alignItems: 'center', height: '50%', marginTop: 20 }}>
                <Image source={LogInLogoImage} resizeMode="contain" style={{ width: '70%', height: '100%' }} />
            </View>
            {/* Login phone number input */}
            <View style={{ alignItems: 'center', alignSelf: 'center', marginTop: 20 }}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={mobileNumber}
                    defaultCode="IN"
                    layout="second"
                    onChangeText={(text) => {
                        console.log("onChangeText",text)
                        setMobileNumber(text);
                    }}
                    onChangeFormattedText={(text) => {
                        //console.log("onChangeFormattedText", text)
                        actions.mobileNumberAction({ mobileNumber: text })
                    }}
                    placeholder={'Phone Number'}
                    withDarkTheme={false}
                    withShadow
                    autoFocus
                    containerStyle={styles.textInput}
                    textContainerStyle={{ borderRadius: 20, paddingVertical: 2, backgroundColor: '#f4f0ec' }}
                />
            </View>
            {/* Otp button */}
            <TouchableOpacity onPress={() => { mobileNumber.length > 0 ? navigation.navigate("OTPScreen") : Alert.alert("Please enter mobile number") }} style={[styles.textInput, styles.buttonStyle]}>
                <Text style={[styles.headerTextStyle, { marginTop: 0, fontSize: 16 }]}>Get OTP</Text>
            </TouchableOpacity>
            {/* Bottom text for TC */}
            <View style={{ marginTop: 40, width: '85%', alignSelf: 'center', }}>
                <Text style={{ textAlign: 'center' }}>By signing up,you are agreen with our Terms and condition</Text>
            </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        marginTop: 20
    },
    textInput: {
        width: '85%',
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 70,
        backgroundColor: '#f4f0ec'
    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: '#45b1e8',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderColor: '#45b1e8'
    }
})

export default LoginScreen