import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import * as yup from 'yup';
import {TextInput} from 'react-native-paper';
import {yupResolver} from '@hookform/resolvers/yup';
import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import AuthTitle from '../../../components/AuthTitle';
import {customTextColor, customThemeColor} from '../../../constants/Color';
import {Controller, useForm} from 'react-hook-form';

const Login = ({navigation}) => {
  const forgotPasswordLogo = require('../../../assets/forgotPassword.png');

  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
  });

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });
  const onPressSend = formData => {
    console.log(formData);
    navigation.navigate('ForgotPasword_EnterOtp');
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
        <AuthLogo imgSrc={forgotPasswordLogo} />
        <View style={styles.inputContainer}>
          <AuthTitle title="Forgot Password" />
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

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={handleSubmit(onPressSend)}
              style={styles.button}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text style={{color: customTextColor.primary}}>
              Remembered Password?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupText}>Login</Text>
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
  inputWrapper: {
    padding: 4,
    width: '100%',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
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
  errorText: {
    color: 'red',
    margin: 0,
    padding: 0,
  },
});

export default Login;
