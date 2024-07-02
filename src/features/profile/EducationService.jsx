import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {getConfigWithToken} from '../../utils/config';
import {showMessage} from 'react-native-flash-message';

//get all education
const getAllEducation = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(`${base_url}candidate/educations`, config);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching all education:', error);
    throw error;
  }
};

//get single education
const getSingleEducation = async id => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(
      `${base_url}candidate/education/${id}`,
      config,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching single educaiton:', error);
    throw error;
  }
};

// post education
const addEducation = async eduData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/education-save-or-update`,
      eduData,
      config,
    );
    if (response?.data?.status_code === 422) {
      Object.values(response?.data?.message.error).forEach(messages => {
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
    } else if (response?.status_code === 200) {
      showMessage({
        message: JSON.stringify(response?.data?.message),
        type: 'success',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
    } else {
      showMessage({
        message: JSON.stringify(response?.data?.message),
        type: 'success',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error during register:', error);
    throw error;
  }
};

//del single Education
const delEducation = async id => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.delete(
      `${base_url}candidate/education/${id}`,
      config,
    );
    if (response?.status_code === 200) {
      showMessage({
        message: JSON.stringify('this is delete', response?.data?.message),
        type: 'success',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
    }
    // } else {
    //   showMessage({
    //     message: JSON.stringify('this is else', response?.data?.message),
    //     type: 'success',
    //     setLoading: false,
    //     animationDuration: 1000,
    //     animated: true,
    //   });
    // }
    return id;
  } catch (error) {
    console.error('Error during deleting single education:', error);
    throw error;
  }
};

// update Education
const updateEducation = async eduUpdateData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/education-save-or-update`,
      eduUpdateData,
      config,
    );
    if (response?.status_code === 200) {
      showMessage({
        message: JSON.stringify(response?.data?.message),
        type: 'success',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
    } else {
      showMessage({
        message: JSON.stringify(response?.data?.message),
        type: 'success',
        setLoading: false,
        animationDuration: 1000,
        animated: true,
      });
      return response.data;
    }
  } catch (error) {
    console.error('Error during updateEducation:', error);
    throw error;
  }
};

export const educationService = {
  getAllEducation,
  getSingleEducation,
  addEducation,
  delEducation,
  updateEducation,
};
