import React, {useState} from 'react';
import {
  Image,
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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const forgotPasswordLogo = require('../../../assets/forgotPassword.png');

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
        <AuthLogo imgSrc={forgotPasswordLogo} />
        <View style={styles.inputContainer}>
          <AuthTitle title="Forgot Password" />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Email"
              mode="outlined"
              outlineColor="#11401E"
              activeOutlineColor="#11401E"
              selectionColor="#11401E"
              left={<TextInput.Icon icon="email" size={25} color="#11401E" />}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasword_EnterOtp')}
              style={styles.button}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text>Remembered Password?</Text>
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
});

export default Login;
