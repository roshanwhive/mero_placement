import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import {customTextColor, customThemeColor} from '../../../constants/Color';

const EmailVerified = ({navigation}) => {
  const verifiedLogo = require('../../../assets/verified-logo1.png');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={customThemeColor.primary}
      />

      {/* Title and form */}
      <View style={styles.formContainer}>
        <AuthHeader />
        <AuthLogo imgSrc={verifiedLogo} />
        <View style={styles.inputContainer}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Email Verified Successfully</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: customThemeColor.primary,
  },

  formContainer: {
    flex: 1,
    width: '100%',
  },
  titleTextContainer: {
    width: '100%',
    padding: 6,
  },
  titleText: {
    color: customTextColor.darkGreen,
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    bottom: '-8%',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 40,
  },
  inputWrapper: {
    padding: 4,
    width: '100%',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
  },
  forgotPasswordContainer: {
    marginTop: 3,
    marginLeft: 'auto',
  },
  forgotPasswordText: {
    color: customTextColor.lightGreen,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: customThemeColor.darkRed,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: customTextColor.white,
    textAlign: 'center',
    padding: 10,
  },
  signupTextContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: customTextColor.lightGreen,
    marginLeft: 5,
  },
});

export default EmailVerified;
