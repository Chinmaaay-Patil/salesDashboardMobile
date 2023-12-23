import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export default function TextInputComponent(props) {
    //console.log("prosp",props)
    return (
        <View style={props.viewStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center',marginTop:20 }}>
                {
                    props.mandatory && (
                        <Text style={[props.textStyle, {
                            position: 'absolute',
                            top: -20,
                            left: 5,
                            zIndex: 100,
                            backgroundColor: 'white',
                            paddingHorizontal: 2,
                            color:'red'
                        }]}>*</Text>
                    ) 
                }
                <Text style={[props.textStyle, style.textStyle]}>{props.text}</Text>

            
            <TextInput
                style={props.textInputStyle}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                maxLength={props.maxLength ? props.maxLength : 600}
                keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                numberOfLines={props.numberOfLines}
                multiline={true}
                onContentSizeChange={props.onContentSizeChange}
                placeholderTextColor={'gray'}
            />
            </View>
        </View>
    )
}

const style=StyleSheet.create({
    textStyle:{
        position: 'absolute',
        top: -20,
        left: 15,
        zIndex: 100,
        backgroundColor: 'white',
        paddingHorizontal: 2
    }
})