import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import { customTextColor } from '../../../constants/Color';
import { customFontSize, customFonts } from '../../../constants/theme';
import logoImage from '../../../assets/search1.jpg';

const NoSavedJob = () => {
    return (
        <View style={styles.bodyContent1}>
            <Image source={logoImage} style={styles.image} />
            <Text style={styles.subtitle}>
                You haven't saved any jobs yet.
            </Text>
            <View style={styles.signupTextContainer}>
                <TouchableOpacity >
                    <Text style={styles.signupText}>Browse Jobs  </Text>
                </TouchableOpacity>
                <Text style={{ color: customTextColor.primary, fontFamily: customFonts.fontPoppins }}>
                    and apply now
                </Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bodyContent1: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        height: '80%',
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
        textAlign: 'center',
        color: '#11401E',
        fontFamily: customFonts.fontRobotoBold,
    },
    subtitle: {
        textAlign: 'center',
        color: '#11401E',
        fontFamily: customFonts.fontPoppins,
        fontSize: customFontSize.font14,
    },

    signupTextContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    signupText: {
        color: customTextColor.lightGreen,
        marginLeft: 5,
        fontSize: customFontSize.font16,
        fontFamily: customFonts.fontBold,
        textDecorationLine: 'underline',
    },
    image: {
        width: 250,
        height: 210,
        borderRadius: 50,
        marginBottom: 20,
    },
});

export default NoSavedJob;