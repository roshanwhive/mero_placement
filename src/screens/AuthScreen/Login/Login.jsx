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
import {loginUser} from '../../../features/auth/AuthSlice';
import AuthHeader from '../../../components/AuthHeader';
import AuthLogo from '../../../components/AuthLogo';
import AuthTitle from '../../../components/AuthTitle';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const loginLogo = require('../../../assets/loginLogo.png');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const dispatch = useDispatch();
  const {message} = useSelector(state => state.auth);
  useEffect(() => {
    console.log(message);
  }, [message]);
  const handleSubmit = () => {
    dispatch(loginUser({email, password}));
    navigation.navigate('HomeScreen');
  };

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
          <AuthTitle title="Login" />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Emaill"
              mode="outlined"
              value={email}
              onChangeText={value => setEmail(value)}
              outlineColor="#11401E"
              activeOutlineColor="#11401E"
              selectionColor="#11401E"
              left={<TextInput.Icon icon="email" size={25} color="#11401E" />}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Password"
              mode="outlined"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={value => setPassword(value)}
              outlineColor="#11401E"
              activeOutlineColor="#11401E"
              selectionColor="#11401E"
              right={
                <TextInput.Icon
                  icon={passwordVisible ? 'eye' : 'eye-off'}
                  onPress={togglePasswordVisibility}
                  size={20}
                  color={'#11401E'}
                />
              }
              left={<TextInput.Icon icon="lock" size={25} color="#11401E" />}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordEnterEmail')}
            style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text style={{color: 'black'}}>Don't have an account?</Text>
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

export default Login;
