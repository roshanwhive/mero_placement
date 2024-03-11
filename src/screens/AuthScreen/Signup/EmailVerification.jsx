import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import AuthTitle from '../../../components/AuthTitle';

const EmailVerification = ({navigation}) => {
  const loginLogo = require('../../../assets/password-change.png');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#FCFCFC"
      />

      {/* Title and form */}
      <View style={styles.formContainer}>
        <AuthHeader />
        <AuthLogo imgSrc={loginLogo} />
        <View style={styles.inputContainer}>
          <AuthTitle title="Enter OTP" />
          <Text>OTP has been sent to your email.</Text>

          <View style={styles.container1}>
            <OtpInputs
              numberOfInputs={5}
              selectTextOnFocus={true}
              inputStyles={{
                backgroundColor: '#f2f4f5',
                borderRadius: 10,
                width: 50,
                textAlign: 'center',
              }}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ForgotPassword_ChoosePassword')
              }
              style={styles.button}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text>Didn't get a code?</Text>
            <TouchableOpacity>
              <Text style={styles.signupText}>Resend Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    backgroundColor: '#FCFCFC',
  },

  formContainer: {
    flex: 1,
    width: '100%',
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
    color: '#2b8256',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#9D050A',
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  signupTextContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#2b8256',
    marginLeft: 5,
  },
});

export default EmailVerification;
