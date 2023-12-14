import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useRef, useState } from 'react'
import LogInLogoImage from '../../Assets/login_logo.png'
import { useSelector } from 'react-redux';
import OTPTextInput from 'react-native-otp-textinput'

const OtpScreen = ({navigation}) => {

    const mobileNUmber = useSelector((state) => state.mobileNumberStateReducer)
    const [otpNumber, setOTPNumber] = useState()
    let otpInput = useRef(null);

    const verifyOtpFunction = () => {
        if (otpNumber.length == 4) {
            navigation.navigate("Drawer")
        } else {
            Alert.alert("Please enter OTP")
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView>
            {/* OTP Top Text */}
            <Text style={styles.headerTextStyle}>OTP Verify</Text>
            {/* OTP Top Image */}
            <View style={{ alignItems: 'center', height: '50%', marginTop: 0 }}>
                <Image source={LogInLogoImage} resizeMode="contain" style={{ width: '70%', height: '100%' }} />
            </View>
            {/* Text for mobile number */}
            <View style={{ marginTop: -30, width: '85%', alignSelf: 'center' }}>
                <Text style={[styles.headerTextStyle, { fontWeight: 'normal', fontSize: 18 }]}>Otp Sent to</Text>
                <Text style={[styles.headerTextStyle, { marginTop: 0, fontWeight: '500', fontSize: 18 }]}>{mobileNUmber.mobileNumber}</Text>
            </View>
            {/* OTP BOX */}
            <View style={{ width: '50%', alignSelf: 'center', alignItems: 'center', marginTop: 20 }}>
                <OTPTextInput
                    ref={e => (otpInput = e)}
                    inputCount={4}
                    textInputStyle={{ width: 65, height: 45, borderRadius: 10, borderWidth: 2 }}
                    tintColor={'grey'}
                    handleTextChange={(otp) => setOTPNumber(otp)}
                />
            </View>
            {/* verify Otp button */}
            <TouchableOpacity onPress={() => verifyOtpFunction()} style={[styles.textInput, styles.buttonStyle]}>
                <Text style={[styles.headerTextStyle, { marginTop: 0, fontSize: 16 }]}>Verify OTP</Text>
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
        borderColor: '#45b1e8',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 70,
        backgroundColor: '#f4f0ec'
    },
    buttonStyle: {
        elevation: 8,
        marginTop: 20,
        backgroundColor: '#45b1e8',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    }
})

export default OtpScreen