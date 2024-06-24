import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {getConfigWithToken} from '../../utils/config';
import {showMessage} from 'react-native-flash-message';

//get all Trainig
const getAllTraining = async () => {
  try {
    const response = await axios.get(`${base_url}home/trainings`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching all training:', error);
    throw error;
  }
};

//get single job
const getSingleTraining = async slug => {
  try {
    const response = await axios.get(
      `${base_url}home/training-details/${slug}`,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching single training:', error);
    throw error;
  }
};

// post training inquiry
const postTrainingInquiry = async trainingData => {
  try {
    //const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}home/training-enquiry`,
      trainingData,
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
    console.error('Error during training inquiry:', error);
    throw error;
  }
};

export const trainingService = {
  getAllTraining,
  getSingleTraining,
  postTrainingInquiry,
};
