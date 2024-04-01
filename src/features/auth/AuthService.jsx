import axios from 'axios';
import { base_url } from '../../utils/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Register Service
const register = async registerData => {
  try {
    const response = await axios.post(
      `${base_url}candidate/signup?`,
      registerData,
    );
    await AsyncStorage.setItem('USER', JSON.stringify(response));
    return response.data;
  } catch (error) {
    console.error('Error during register:', error);
    throw error;
  }
};

//   Login Service
const login = async loginData => {
  try {
    const response = await axios.post(`${base_url}login`, loginData);
    console.log("this is " + JSON.stringify(response.data.data.token));
    await AsyncStorage.setItem('KeepLoggedIn', JSON.stringify(true));
    await AsyncStorage.setItem('USER_TOKEN', JSON.stringify(response.data.data.token));
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

//Logout Serive
const logout = async () => {
  try {
    const response = await axios.post(`${base_url}logout`);
    if (response) {
      await AsyncStorage.setItem('USER_TOKEN', '');
      await AsyncStorage.setItem('KeepLoggedIn', '');
      return response.data;
    }
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

export const authService = {
  register,
  login,
  logout,
};
