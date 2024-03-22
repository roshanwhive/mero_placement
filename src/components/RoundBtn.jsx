import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { customTextColor } from '../constants/Color'

export default function RoundButtonComp({ label, border = false, onPressBtn, widthBtn = '100%' }) {
    return (
        <TouchableOpacity onPress={() => onPressBtn()}>
            <View style={
                {
                    //if the border is true it will be ##3036a6 else f45c4e
                    backgroundColor: border ? 'white' : customTextColor.darkRed,
                    width: widthBtn,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 20,
                    marginLeft: 10,
                    borderWidth: border ? 1 : 0,
                    borderColor: 'black',
                    marginTop: 10
                }
            }>
                <Text style={
                    {
                        color: border ? 'black' : 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 15
                    }
                }>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}