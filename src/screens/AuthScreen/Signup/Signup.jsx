import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import AuthHeader from '../../../components/AuthHeader';
import AuthTitle from '../../../components/AuthTitle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getAllGender} from '../../../features/formData/FormSlice';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {customTextColor, customThemeColor} from '../../../constants/Color';
import {registerUser} from '../../../features/auth/AuthSlice';

const Signup = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [genders, setGenders] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [genderId, setGenderID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };
  const dispatch = useDispatch();
  const {allGenderData} = useSelector(state => state.formOptions);

  useEffect(() => {
    dispatch(getAllGender());
  }, [dispatch]);

  useEffect(() => {
    if (allGenderData.genders && Array.isArray(allGenderData.genders)) {
      const mappedGenderData = allGenderData.genders.map(item => ({
        label: item.name,
        value: item.gender_id,
      }));
      setGenders(mappedGenderData);
    }
  }, [0]);
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
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

  // const handleSubmit = () => {
  //   const formData = {
  //     name: name,
  //     email: email,
  //     contact: contact,
  //     gender_id: genderId,
  //     password: password,
  //     password_confirmation: confirmPassword,
  //   };
  //   dispatch(registerUser(formData));
  //   navigation.navigate('EmailVerification');
  //   showMessage({
  //     message: 'Simple message',
  //     type: 'info',
  //   });
  // };

  //Common input properties
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
        <View style={styles.inputContainer}>
          <AuthTitle title="Create an Account" />
          <View style={styles.inputWrapper}>
            <TextInput
              {...commonTextInputProps}
              label="Name"
              value={name}
              onChangeText={value => setName(value)}
              left={
                <TextInput.Icon
                  icon="account"
                  size={25}
                  color={customTextColor.darkGreen}
                />
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              {...commonTextInputProps}
              label="Emaill"
              value={email}
              onChangeText={value => setEmail(value)}
              left={
                <TextInput.Icon
                  icon="email"
                  size={25}
                  color={customTextColor.darkGreen}
                />
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              {...commonTextInputProps}
              label="Contact"
              value={contact}
              onChangeText={value => setContact(value)}
              left={
                <TextInput.Icon
                  icon="phone"
                  size={25}
                  color={customTextColor.darkGreen}
                />
              }
            />
          </View>
          <View style={styles.inputWrapper}>
            <Dropdown
              data={genders}
              placeholder="Select Gender"
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={value}
              style={[
                {
                  borderWidth: 1,
                  borderColor: customTextColor.darkGreen,
                  borderRadius: 5,
                  paddingHorizontal: 16,
                  paddingVertical: 5,
                },
                styles.input,
              ]}
              onChange={item => {
                setGenderID(item.value);
              }}
              renderLeftIcon={() => (
                <Icon
                  color={customTextColor.darkGreen}
                  name="user-edit"
                  size={20}
                  style={{marginRight: 13}}
                />
              )}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              {...commonTextInputProps}
              label="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={value => setPassword(value)}
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
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              {...commonTextInputProps}
              label="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={value => setConfirmPassword(value)}
              right={
                <TextInput.Icon
                  icon={confirmPasswordVisible ? 'eye' : 'eye-off'}
                  onPress={toggleConfirmPasswordVisibility}
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
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text style={{color: customTextColor.primary}}>
              Already have an account?
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
    bottom: '-4%',
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
  textSecondary: {
    color: customTextColor.secondary,
  },
  signupText: {
    color: customTextColor.lightGreen,
    marginLeft: 5,
  },
});

export default Signup;
