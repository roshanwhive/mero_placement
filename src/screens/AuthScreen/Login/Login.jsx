import React, { useEffect, useState } from 'react';
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserProfile,
  loginUser,
  resetState,
} from '../../../features/auth/AuthSlice';
import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import AuthTitle from '../../../components/AuthTitle';
import { customTextColor, customThemeColor } from '../../../constants/Color';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GlobalStyleSheet } from '../../../constants/StyleSheet';
import { customFontSize, customFonts } from '../../../constants/theme';

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const loginLogo = require('../../../assets/loginLogo.png');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const dispatch = useDispatch();

  const {
    message,
    token,
    isAuthenticated,
    isSuccess,
    isError,
    isLoading,
    userProfile,
    statusCode,
  } = useSelector(state => state.auth);

  useEffect(() => {
    if (
      isError &&
      statusCode !== 200 &&
      statusCode !== 0 &&
      message !== undefined
    ) {
      showMessage({
        message: JSON.stringify(message),
        type: 'danger',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
    } else if (isSuccess && statusCode === 200 && isAuthenticated) {
      navigation.navigate('Home');
      showMessage({
        message: JSON.stringify(message),
        type: 'success',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
    }
  }, [isError, isSuccess, statusCode, message]);

  const schema = yup.object().shape({
    email: yup.string().required('Email is Required').email('Invalid Email'),
    password: yup.string().required('Password is required'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onPressSend = formData => {
    dispatch(loginUser(formData))
      .then(() => dispatch(getUserProfile()))
      .then(() => {
        setTimeout(() => {
          dispatch(resetState());
        }, 5000);
      });
  };

  const commonTextInputProps = {
    style: styles.input,
    mode: 'outlined',
    outlineColor: customTextColor.darkGreen,
    activeOutlineColor: customTextColor.darkGreen,
    selectionColor: customTextColor.darkGreen,
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={customThemeColor.primary}
      />

      {/* Title and form */}

      <View style={GlobalStyleSheet.formContainer}>
        <AuthHeader />
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollViewContent}>
            <AuthLogo imgSrc={loginLogo} />

            <View style={styles.inputContainer}>
              <AuthTitle title="Login" />
              <View style={styles.inputWrapper}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      {...commonTextInputProps}
                      label="Email"
                      value={value}
                      onChangeText={onChange}
                      disabled={isLoading}
                      left={
                        <TextInput.Icon
                          icon="email"
                          size={25}
                          color={customTextColor.darkGreen}
                        />
                      }
                    />
                  )}
                  name="email"
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email.message}</Text>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      {...commonTextInputProps}
                      label="Password"
                      secureTextEntry={!passwordVisible}
                      value={value}
                      disabled={isLoading}
                      onChangeText={onChange}
                      right={
                        <TextInput.Icon
                          icon={passwordVisible ? 'eye' : 'eye-off'}
                          onPress={togglePasswordVisibility}
                          size={20}
                          color={customTextColor.darkGreen}
                        />
                      }
                      left={
                        <TextInput.Icon
                          icon="lock"
                          size={25}
                          color={customTextColor.darkGreen}
                        />
                      }
                    />
                  )}
                  name="password"
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPasswordEnterEmail')}
                style={styles.forgotPasswordContainer}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <View style={styles.buttonWrapper}>
                <TouchableOpacity
                  onPress={handleSubmit(onPressSend)}
                  style={styles.button}>
                  {isLoading ? (
                    <ActivityIndicator
                      animating={true}
                      style={{ paddingVertical: 14 }}
                      color={customTextColor.white}
                      size={20}
                    />
                  ) : (
                    <Text style={styles.buttonText}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.signupTextContainer}>
                <Text
                  style={{
                    color: customTextColor.primary,
                    fontFamily: customFonts.fontPoppins,
                  }}>
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signupText}>Signup</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  scrollViewContent: {
    paddingBottom: 0,
    zIndex: 0,
    borderTopLeftRadius: 25,
    position: 'relative',
    borderTopRightRadius: 25,
    flexGrow: 1,
  },

  inputContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
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
    fontFamily: customFonts.fontPoppins,
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
    fontSize: customFontSize.font20,
    color: customTextColor.white,
    textAlign: 'center',
    padding: 10,
    fontFamily: customFonts.fontRobotoBold,
  },
  signupTextContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: customTextColor.lightGreen,
    marginLeft: 5,
    fontFamily: customFonts.fontPoppins,
  },
  errorText: {
    color: 'red',
    margin: 0,
    padding: 0,
  },
});

export default Login;
