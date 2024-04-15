import axios from 'axios';
import {base_url} from '../../utils/base_url';

//get all Trainig
const getAllTraining = async () => {
  try {
    const response = await axios.get(`${base_url}home/view-all-trainings`);
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
      `${base_url}profile/training-profile/${slug}`,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching single training:', error);
    throw error;
  }
};

export const trainingService = {
  getAllTraining,
  getSingleTraining,
};
