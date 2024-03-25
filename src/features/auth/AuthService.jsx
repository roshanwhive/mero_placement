import axios from 'axios';
import {base_url} from '../../utils/base_url';
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
    await AsyncStorage.setItem('USER_ID', JSON.stringify(response));
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
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
      await AsyncStorage.removeItem('jwtToken');
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
