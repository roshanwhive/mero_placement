import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { customTextColor } from '../constants/Color'

export default function RoundButtonComp({ label, border = false, onPressBtn, widthBtn = '100%', margintopBtn = 0, marginleftBtn = 0 }) {
    return (
        <TouchableOpacity style={{ marginTop: margintopBtn }} onPress={() => onPressBtn()}>
            <View style={
                {
                    //if the border is true it will be ##3036a6 else f45c4e
                    backgroundColor: border ? 'white' : customTextColor.darkRed,
                    width: widthBtn,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    borderRadius: 20,
                    marginLeft: marginleftBtn,
                    borderWidth: border ? 1 : 0,
                    borderColor: 'black',
                    marginTop: margintopBtn
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