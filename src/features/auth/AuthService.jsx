import axios from 'axios';
import {base_url} from '../../utils/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getConfigWithToken} from '../../utils/config';
import {showMessage} from 'react-native-flash-message';

// Register Service
const register = async registerData => {
  try {
    const response = await axios.post(
      `${base_url}candidate/signup?`,
      registerData,
    );
    if (response?.data?.status_code === 422) {
      Object.values(response?.data?.message).forEach(messages => {
        messages.forEach(message => {
          showMessage({
            message: JSON.stringify(message),
            type: 'danger',
            setLoading: false,
            animationDuration: 1000,
            animated: true,
          });
        });
      });
    } else if (response.data.status_code === 200) {
      //  await AsyncStorage.setItem('KeepLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem('USER', JSON.stringify(response));
      showMessage({
        message: response.data.message,
        type: 'success',
      });
    } else {
      showMessage({
        message: response.data.message,
        type: 'success',
      });
    }
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
      //  await AsyncStorage.setItem('KeepLoggedIn', JSON.stringify(true));
      await AsyncStorage.setItem(
        'USER_TOKEN',
        JSON.stringify(response.data.data.token),
      );
      showMessage({
        message: response.data.message,
        type: 'success',
      });
    } else {
      showMessage({
        message: response.data.message,
        type: 'success',
      });
    }
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    if (axios.isAxiosError(error)) {
      showMessage({
        message: 'Error during login:',
        error,
        type: 'danger',
      });
    }

    throw error;
  }
};

//Logout Service
const logout = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(`${base_url}logout`, config);
    if (response && response.data.status_code === 200) {
      await AsyncStorage.setItem('USER_TOKEN', '');
      //await AsyncStorage.setItem('KeepLoggedIn', '');

      showMessage({
        message: response.data.message,
        type: 'success',
      });
    } else {
      showMessage({
        message: response.data.message,
        type: 'success',
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error during logout:', error);
    if (axios.isAxiosError(error)) {
      showMessage({
        message: 'Error during logout. Please try again.',
        type: 'danger',
      });
    }

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
    if (axios.isAxiosError(error)) {
      showMessage({
        message: 'Error during fetching user profile',
        type: 'danger',
      });
    }
    throw error;
  }
};

//post User Profile
const updateUserAccount = async formData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/profile-setting`,
      formData,
      config,
    );

    if (response?.status_code === 200) {
      showMessage({
        message: JSON.stringify(response?.message?.message),
        type: 'success',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
    }
    return response.data;
  } catch (error) {
    console.error('Error during updating user Account Information:', error);
    if (axios.isAxiosError(error)) {
      showMessage({
        message: 'Error during updating user Account Information:',
        type: 'danger',
      });
    }
    throw error;
  }
};

//post forgot password
const forgotPassword = async emailData => {
  try {
    //const config = await getConfigWithToken();
    const response = await axios.post(`${base_url}forget-password`, emailData);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during forgot password:', error);
    throw error;
  }
};

//post set new password
const setNewPassword = async formData => {
  try {
    //const config = await getConfigWithToken();
    const response = await axios.post(`${base_url}set-new-password`, formData);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during set password:', error);
    throw error;
  }
};

//post verify otp
const postVerifyOtp = async formData => {
  try {
    //const config = await getConfigWithToken();
    const response = await axios.post(`${base_url}otp-check`, formData);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during verify otp:', error);
    throw error;
  }
};

//post verify otp
const postResendOtp = async otpData => {
  try {
    //const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}resendOtp-forget-password`,
      otpData,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during resend otp:', error);
    throw error;
  }
};

//   Email Verification Service
const emailVerification = async emailData => {
  try {
    const response = await axios.post(
      `${base_url}email_verification`,
      emailData,
    );
    if (response.data.status_code === 200) {
      //  await AsyncStorage.setItem('KeepLoggedIn', JSON.stringify(true));

      showMessage({
        message: response.data.message,
        type: 'success',
      });
    } else {
      showMessage({
        message: response.data.message,
        type: 'success',
      });
    }
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    if (axios.isAxiosError(error)) {
      showMessage({
        message: 'Error during Verification:',
        error,
        type: 'danger',
      });
    }

    throw error;
  }
};

//   FCM Token  Service
const fcmLogin = async loginData => {
  try {
    const response = await axios.post(`${base_url}fcm-token-save`, tokenData);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during login:', error);
    if (axios.isAxiosError(error)) {
      showMessage({
        message: 'Error during login:',
        error,
        type: 'danger',
      });
    }

    throw error;
  }
};

export const authService = {
  register,
  login,
  logout,
  getUserProfile,
  updateUserAccount,
  forgotPassword,
  setNewPassword,
  postVerifyOtp,
  postResendOtp,
  emailVerification,
};
