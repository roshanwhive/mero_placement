import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import {customTextColor} from '../../../constants/Color';
import {customFontSize, customFonts} from '../../../constants/theme';
import logoImage from '../../../assets/search1.jpg';

const AddPref = ({title, subtitle, btnText = 'Login', handleBtn}) => {
  return (
    <View style={styles.bodyContent1}>
      <Image source={logoImage} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <TouchableOpacity
        onPress={handleBtn}
        style={[styles.buttonContainer, styles.buttonLogout]}>
        <Text style={styles.logoutText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bodyContent1: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    height: '100%',
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

  buttonContainer: {
    marginTop: 10,
    bottom: '-10%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    width: 150,
    borderRadius: 30,
  },
  buttonLogout: {
    backgroundColor: customTextColor.darkRed,
  },
  logoutText: {
    color: customTextColor.white,
    fontSize: customFontSize.font16,
    fontFamily: customFonts.fontPoppins,
  },
  image: {
    width: 250,
    height: 210,
    borderRadius: 50,
    marginBottom: 20,
  },
});

export default AddPref;
