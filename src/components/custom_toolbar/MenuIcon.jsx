import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';


export default function MenuIcon({onpressMenu}) {
    return (
        <TouchableOpacity  onPress={() => onpressMenu}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>

                <View style={{
                    resizeMode: 'contain',
                    backgroundColor: 'white',
                }}>
                    <Icon type="Entypo" name="menu" size={25} color="#000000" />
                </View>
            </View>
        </TouchableOpacity>
    )
}