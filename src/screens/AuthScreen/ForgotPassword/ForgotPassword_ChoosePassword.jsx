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

const Login = ({navigation}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const loginLogo = require('../../../assets/password-change.png');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
          <AuthTitle title="Create new password" />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Password"
              mode="outlined"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
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

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Confirm Password"
              mode="outlined"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              outlineColor="#11401E"
              activeOutlineColor="#11401E"
              selectionColor="#11401E"
              right={
                <TextInput.Icon
                  icon={confirmPassword ? 'eye' : 'eye-off'}
                  onPress={toggleConfirmPasswordVisibility}
                  size={20}
                  color={'#11401E'}
                />
              }
              left={<TextInput.Icon icon="lock" size={25} color="#11401E" />}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ForgotPaasword_AcountRecover')
              }
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
