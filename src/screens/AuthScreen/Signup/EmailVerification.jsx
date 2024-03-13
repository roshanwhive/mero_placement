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
import {customTextColor, customThemeColor} from '../../../constants/Color';

const EmailVerification = ({navigation}) => {
  const loginLogo = require('../../../assets/password-change.png');

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
        <AuthLogo imgSrc={loginLogo} />
        <View style={styles.inputContainer}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <AuthTitle title="Enter OTP" />

            <Text style={styles.text}>OTP has been sent to your email.</Text>
          </View>

          <View style={styles.container1}>
            <OtpInputs
              numberOfInputs={6}
              selectTextOnFocus={true}
              inputStyles={{
                backgroundColor: customThemeColor.otpBg,
                borderRadius: 10,
                width: 45,
                fontSize: 20,
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
            <Text style={{color: customTextColor.primary}}>
              Didn't get a code?
            </Text>
            <TouchableOpacity>
              <Text style={styles.resendCodeText}>Resend Code</Text>
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
    backgroundColor: customThemeColor.primary,
  },

  formContainer: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    bottom: '-5%',
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 40,
  },
  text: {
    color: customTextColor.primary,
    fontSize: 14,
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
  resendCodeText: {
    color: customTextColor.lightGreen,
    marginLeft: 5,
  },
});

export default EmailVerification;
