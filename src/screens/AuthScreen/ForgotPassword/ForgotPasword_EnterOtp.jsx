import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import * as yup from 'yup';
import OtpInputs from 'react-native-otp-inputs';
import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import AuthTitle from '../../../components/AuthTitle';
import {customTextColor, customThemeColor} from '../../../constants/Color';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

const ForgotPasword_EnterOtp = ({navigation}) => {
  const loginLogo = require('../../../assets/password-change.png');

  const schema = yup.object().shape({
    otp: yup
      .string()
      .required('OTP is required')
      .length(6, 'OTP must be exactly 6 digits'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: '',
    },
  });
  const onPressSend = otpData => {
    console.log('this is otp', otpData);
    //dispatch(forgotPassword(emailData));
    //navigation.navigate('ForgotPasword_EnterOtp');
  };

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
          <AuthTitle title="Enter OTP" />

          <View style={styles.container1}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
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
              )}
              name="otp"
            />
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={
                () => {
                  handleSubmit(onPressSend);
                }
                //navigation.navigate('ForgotPassword_ChoosePassword')
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

export default ForgotPasword_EnterOtp;
