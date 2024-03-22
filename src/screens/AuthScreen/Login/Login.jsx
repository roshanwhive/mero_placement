import React, {useEffect, useState} from 'react';
import {
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser, resetState} from '../../../features/auth/AuthSlice';
import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import AuthTitle from '../../../components/AuthTitle';
import {customTextColor, customThemeColor} from '../../../constants/Color';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {showMessage} from 'react-native-flash-message';

const Login = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [password, setPassword] = useState('');
  const loginLogo = require('../../../assets/loginLogo.png');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const dispatch = useDispatch();

  const {message, isSuccess, isError, statusCode} = useSelector(
    state => state.auth,
  );

  // const { message } = useSelector(state => state.auth);
  useEffect(() => {}, [message]);

  useEffect(() => {
    if (isError && statusCode !== 200 && statusCode !== 0) {
      showMessage({
        message: JSON.stringify(message),
        type: 'danger',
      });
    } else if (isSuccess && statusCode === 200) {
      navigation.navigate('HomeScreen');
      showMessage({
        message: JSON.stringify(message),
        type: 'success',
      });
    }
    setTimeout(() => {
      dispatch(resetState());
    }, 15000);
    console.log('api' + isError, isSuccess, statusCode, message);
  }, [isError, isSuccess, statusCode, message]);

  const schema = yup.object().shape({
    email: yup.string().required('Email is Required').email('Invalid Email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onPressSend = formData => {
    dispatch(loginUser(formData));
  };

  // const pressbtn = () => {
  //   showMessage({
  //     message: "Success",
  //     description: "The Event has been created",
  //     type: "success",
  //   });
  // };

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
      <View style={styles.formContainer}>
        <AuthHeader />
        <AuthLogo imgSrc={loginLogo} />
        <View style={styles.inputContainer}>
          <AuthTitle title="Login" />
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="Emaill"
                  value={value}
                  onChangeText={onChange}
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
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="Password"
                  secureTextEntry={!passwordVisible}
                  value={value}
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
              <Text style={styles.errorText}>{errors.password.message}</Text>
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
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text style={{color: customTextColor.primary}}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupText}>Signup</Text>
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
  errorText: {
    color: 'red',
    margin: 0,
    padding: 0,
  },
});

export default Login;
