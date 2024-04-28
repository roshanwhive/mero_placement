import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { customTextColor } from '../constants/Color'
import { customFontSize, customFonts } from '../constants/theme'

export default function RoundButtonComp({ label, border = false, onPressBtn, widthBtn = '100%' }) {
    return (
        <TouchableOpacity onPress={() => onPressBtn()}>
            <View style={
                {
                    //if the border is true it will be ##3036a6 else f45c4e
                    backgroundColor: border ? 'white' : customTextColor.darkRed,
                    width: widthBtn,
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 5,
                    marginLeft: 10,
                    borderWidth: border ? 1 : 0,
                    borderColor: 'black',

                }
            }>
                <Text style={
                    {
                        color: border ? 'black' : 'white',
                        textAlign: 'center',
                        fontFamily: customFonts.fontPrompt,
                        fontSize: customFontSize.font16,
                    }
                }>{label}</Text>
            </View>
        </TouchableOpacity>
    )
}