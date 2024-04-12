import axios from 'axios';
import {base_url} from '../../utils/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getConfigWithToken} from '../../utils/config';

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
    if (response.data.status_code === 200) {
      await AsyncStorage.setItem('KeepLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem(
        'USER_TOKEN',
        JSON.stringify(response.data.data.token),
      );
    }
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

//Get User Profile
const getUserProfile = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(`${base_url}candidate/profile`, config);

    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching user profile:', error);
    throw error;
  }
};

//post User Profile
const updateUserProfile = async formData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/profile-setting`,
      formData,
      config,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during updating user profile:', error);
    throw error;
  }
};

export const authService = {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
};
