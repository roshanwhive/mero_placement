import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../../features/auth/AuthSlice';
import AuthHeader from '../../../components/AuthHeader';
import AuthTitle from '../../../components/AuthTitle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {getAllGender} from '../../../features/formData/FormSlice';

const gender = [
  {name: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
];

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

  useEffect(() => {
    dispatch(getAllGender());

    if (allGenderData.genders && Array.isArray(allGenderData.genders)) {
      const mappedGenderData = allGenderData.genders.map(item => ({
        label: item.name,
        value: item.gender_id,
      }));
      setGenders(mappedGenderData);
    }
  }, [dispatch, getAllGender]);

  const {allGenderData} = useSelector(state => state.formOptions);

  const handleSubmit = () => {
    const formData = {
      name: name,
      email: email,
      contact: contact,
      gender_id: genderId,
      password: password,
      password_confirmation: confirmPassword,
    };
    dispatch(loginUser({email, password}));
    // navigation.navigate('Test');
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
        <View style={styles.inputContainer}>
          <AuthTitle title="Create an Account" />
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Name"
              value={name}
              onChangeText={value => setName(value)}
              mode="outlined"
              outlineColor="#11401E"
              activeOutlineColor="#11401E"
              selectionColor="#11401E"
              left={<TextInput.Icon icon="account" size={25} color="#11401E" />}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Emaill"
              mode="outlined"
              outlineColor="#11401E"
              activeOutlineColor="#11401E"
              selectionColor="#11401E"
              left={<TextInput.Icon icon="email" size={25} color="#11401E" />}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              label="Contact"
              mode="outlined"
              outlineColor="#11401E"
              activeOutlineColor="#11401E"
              selectionColor="#11401E"
              left={<TextInput.Icon icon="phone" size={25} color="#11401E" />}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Dropdown
              data={gender}
              placeholder="Select Gender"
              maxHeight={300}
              labelField="label"
              valueField="value"
              searchPlaceholder="Search..."
              value={value}
              style={{
                borderWidth: 1,
                borderColor: '#11401E',
                borderRadius: 5,
                paddingHorizontal: 16,
                paddingVertical: 5,
              }}
              onChange={item => {
                setValue(item.value);
              }}
              renderLeftIcon={() => (
                <Icon
                  color="#11401E"
                  name="user-edit"
                  size={20}
                  style={{marginRight: 13}}
                />
              )}
            />
          </View>
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
                  icon={confirmPasswordVisible ? 'eye' : 'eye-off'}
                  onPress={toggleConfirmPasswordVisibility}
                  size={20}
                  color={'#11401E'}
                />
              }
              left={<TextInput.Icon icon="lock" size={25} color="#11401E" />}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text>Already have an account?</Text>
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

export default Signup;
