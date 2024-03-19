import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
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
import {registerUser, resetState} from '../../../features/auth/AuthSlice';

const Signup = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [genders, setGenders] = useState([]);
  const [genderID, setGenderID] = useState('');
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
  const {message, isSuccess, isError, statusCode} = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    dispatch(getAllGender());
    setTimeout(() => {
      if (allGenderData.genders && Array.isArray(allGenderData.genders)) {
        const mappedGenderData = allGenderData.genders.map(item => ({
          label: item.name,
          value: item.gender_id,
        }));
        setGenders(mappedGenderData);
      }
    }, 100);
  }, [dispatch, getAllGender]);

  useEffect(() => {
    if (allGenderData.genders && Array.isArray(allGenderData.genders)) {
      const mappedGenderData = allGenderData.genders.map(item => ({
        label: item.name,
        value: item.gender_id,
      }));
      setGenders(mappedGenderData);
    }
  }, [allGenderData]);

  useEffect(() => {
    if (isError && statusCode !== 200 && statusCode !== 0) {
      showMessage({
        message: JSON.stringify(message),
        type: 'danger',
      });
    } else if (isSuccess && statusCode === 200) {
      navigation.navigate('EmailVerification');
      showMessage({
        message: JSON.stringify(message),
        type: 'success',
      });
    }
    setTimeout(() => {
      dispatch(resetState());
    }, 15000);
    console.log(isError, isSuccess, statusCode, message);
  }, [isError, isSuccess, statusCode, message]);

  // useEffect(() => {
  //   if (isSuccess && statusCode === '200')
  // }, [isSuccess, statusCode]);

  const schema = yup.object().shape({
    name: yup.string().required('Name is Required'),
    email: yup.string().required('Email is required').email('Invalid email'),
    contact: yup
      .string()
      .required('Contact is required')
      .min(10, 'Must be equal to 10')
      .max(10, 'Must be Equal to 10'),
    gender_id: yup.string(),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords does not matched')
      .required('Confirm Password is required'),
  });
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      password: '',
      password: '',
      password_confirmation: '',
      gender_id: '',
    },
  });

  //Common input properties
  const onPressSend = formData => {
    dispatch(registerUser(formData));
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
        <View style={styles.inputContainer}>
          <AuthTitle title="Create an Account" />
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({field: {onChange, value}}) => (
                <TextInput
                  {...commonTextInputProps}
                  label="Name"
                  value={value}
                  onChangeText={onChange}
                  left={
                    <TextInput.Icon
                      icon="account"
                      size={25}
                      color={customTextColor.darkGreen}
                    />
                  }
                />
              )}
              name="name"
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
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
                  label="Contact"
                  value={value}
                  onChangeText={onChange}
                  left={
                    <TextInput.Icon
                      icon="phone"
                      size={25}
                      color={customTextColor.darkGreen}
                    />
                  }
                />
              )}
              name="contact"
            />
            {errors.contact && (
              <Text style={styles.errorText}>{errors.contact.message}</Text>
            )}
          </View>
          <View style={styles.inputWrapper}>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({field: {onChange, value}}) => (
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
                    onChange(item.value);
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
              )}
              name="gender_id"
            />
            {errors.gender_id && (
              <Text style={styles.errorText}>{errors.gender_id.message}</Text>
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
                  secureTextEntry={!confirmPasswordVisible}
                  value={value}
                  onChangeText={onChange}
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
              )}
              name="password_confirmation"
            />
            {errors.password_confirmation && (
              <Text style={styles.errorText}>
                {errors.password_confirmation.message}
              </Text>
            )}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              onPress={handleSubmit(onPressSend)}
              style={styles.button}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text style={{color: customTextColor.primary}}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('EmailVerification')}>
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
  errorText: {
    color: 'red',
    margin: 0,
    padding: 0,
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
