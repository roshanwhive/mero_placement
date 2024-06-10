import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import AuthTitle from '../../../components/AuthTitle';
import {customTextColor, customThemeColor} from '../../../constants/Color';
import {useDispatch} from 'react-redux';
import {setNewPassword} from '../../../features/auth/forgotPassword/setnewPasswordSlice';
import {Controller} from 'react-hook-form';

const Login = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const loginLogo = require('../../../assets/password-change.png');

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
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
      confirmPassword: '',
    },
  });
  const onPressSend = formData => {
    console.log(formData);
    dispatch(setNewPassword(formData));
    //navigation.navigate('ForgotPaasword_AcountRecover')
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
      <View style={styles.formContainer}>
        <AuthHeader />
        <AuthLogo imgSrc={loginLogo} />
        <View style={styles.inputContainer}>
          <AuthTitle title="Create new password" />
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={styles.input}
                  label="Email"
                  mode="outlined"
                  outlineColor={customTextColor.darkGreen}
                  activeOutlineColor={customTextColor.darkGreen}
                  selectionColor={customTextColor.darkGreen}
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
              <Text style={styles.errorText}>{errors.password.message}</Text>
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
                  label="Confirm Password"
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
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={handleSubmit(onPressSend)}
              style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
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
});

export default Login;
