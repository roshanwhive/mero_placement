import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {getConfigWithToken} from '../../utils/config';

//get all Experience
const getAllExperience = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(
      `${base_url}candidate/experiences`,
      config,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching all experience:', error);
    throw error;
  }
};

//get single Experience
const getSingleExperience = async id => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(
      `${base_url}candidate/experience/${id}`,
      config,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching single experience:', error);
    throw error;
  }
};

// post Experience
const addExperience = async experienceData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/experience-save-or-update`,
      experienceData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Error during addExperience:', error);
    throw error;
  }
};

//del single Experience
const delExperience = async id => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.delete(
      `${base_url}candidate/experience/${id}`,
      config,
      console.log('experiencedel'),
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during deleting single experience:', error);
    throw error;
  }
};

// update Experience
const updateExperience = async experienceData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/experience-save-or-update`,
      experienceData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Error during updateExperience:', error);
    throw error;
  }
};

export const experienceService = {
  getAllExperience,
  getSingleExperience,
  addExperience,
  delExperience,
  updateExperience,
};
