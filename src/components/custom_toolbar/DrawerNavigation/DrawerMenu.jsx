import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { useNavigation } from '@react-navigation/native'

const DrawerMenu = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Text>DrawerMenu</Text>
        </View>
    )
}

export default DrawerMenu