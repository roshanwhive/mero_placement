import axios from 'axios';
import {base_url} from '../../utils/base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const formService = {
  getAllCategories,
  getGender,
};
