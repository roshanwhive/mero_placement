import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { event } from 'react-native-reanimated';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const BottomSheet_comp = () => {
    const gesture = Gesture.Pan().onUpdate((event) => {

    console.log(event.translationY);
    });
    return (
        <GestureDetector>
        <Animated.View style={styles.bottomSheetContainer}>
           <View style={styles.line} >

           </View>
        </Animated.View>
        </GestureDetector>
    )
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        height: SCREEN_HEIGHT,
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: SCREEN_HEIGHT / 1.5,
        borderRadius: 25,
    },
    line:{
        width: 75,
        height: 4,
        backgroundColor: 'grey',
        alignSelf: 'center',
        marginVertical: 15,
        borderRadius: 2,
    }

})