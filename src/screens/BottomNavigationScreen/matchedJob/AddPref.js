import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';
import {customTextColor} from '../../../constants/Color';
import {customFontSize, customFonts} from '../../../constants/theme';
import logoImage from '../../../assets/search1.jpg';

const AddPref = () => {
  return (
    <View style={styles.bodyContent1}>
      <Image source={logoImage} style={styles.image} />
      <Text style={styles.title}>No Matched job Found</Text>
      <Text style={styles.subtitle}>
        Add your preferences to view Matched Job.
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={[styles.buttonContainer, styles.buttonLogout]}>
        <Text style={styles.logoutText}>Add Preference</Text>
      </TouchableOpacity>
    </View>
  );
};

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
