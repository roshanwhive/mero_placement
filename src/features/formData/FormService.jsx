import axios from 'axios';
import { base_url } from '../../utils/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getConfigWithToken } from '../../utils/config';

// Get All Job Categories
const getAllCategories = async () => {
  try {
    const response = await axios.get(`${base_url}formOptions/getAllCategories`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching job categories:', error);
    throw error;
  }
};

//  Get All Genders
const getGender = async () => {
  try {
    const response = await axios.get(`${base_url}formOptions/getFormOptions`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching gender', error);
    throw error;
  }
};

//  Get education form data
const getEduFormData = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(`${base_url}candidate/education-add`, config);
    return response.data;
  } catch (error) {
    console.error('Error during fetching education form data', error);
    throw error;
  }
};

//  Get preference form data
const getPrefFormData = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(`${base_url}candidate/preferences/add`, config);
    return response.data;
  } catch (error) {
    console.error('Error during fetching preference form data', error);
    throw error;
  }
};

//  Get experience form data
const getExpFormData = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(`${base_url}candidate/experience-add`, config);
    return response.data;
  } catch (error) {
    console.error('Error during fetching experience form data', error);
    throw error;
  }
};

export const formService = {
  getAllCategories,
  getGender,
  getEduFormData,
  getPrefFormData,
  getExpFormData,
};
