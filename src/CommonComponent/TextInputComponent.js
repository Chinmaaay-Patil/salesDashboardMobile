import React from 'react'
import { View, Text, TextInput } from 'react-native'

export default function TextInputComponent(props) {
    //console.log("prosp",props)
    return (
        <View style={props.viewStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={props.textStyle}>{props.text}</Text>
                {
                    props.mandatory && (
                        <Text style={{ color: 'red' }}>*</Text>
                    )
                }
            </View>
            <TextInput
                style={props.textInputStyle}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                maxLength={props.maxLength ? props.maxLength : 100}
                keyboardType='default'

            />
        </View>
    )
}