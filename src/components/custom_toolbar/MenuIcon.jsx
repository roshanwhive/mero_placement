import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo';


export default function MenuIcon() {
    return (
        <TouchableOpacity>

            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                {/* <View style={styles.rightIcon}>
          <Icon type="AntDesign" name="search1" size={25} color="#000000" />
        </View> */}

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

// const styles = StyleSheet.create({
//     rightIcon: {
//         paddingHorizontal: 20,
//         resizeMode: 'contain',
//         backgroundColor: 'white',
//     },
//     rightContainer: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         alignItems: 'center',
//     },

// })