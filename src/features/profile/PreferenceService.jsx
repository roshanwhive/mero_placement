import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {getConfigWithToken} from '../../utils/config';

//get all Preference
const getAllPreference = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(
      `${base_url}candidate/preferences`,
      config,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching all preferences:', error);
    throw error;
  }
};

//get single Preference
const getSinglePreference = async id => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(
      `${base_url}candidate/preferences/${id}`,
      config,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching single preferences:', error);
    throw error;
  }
};

// add pref
const addPreference = async prefData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/preferences`,
      prefData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Error during addPref:', error);
    throw error;
  }
};

//del single Experience
const delPreference = async id => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.delete(
      `${base_url}candidate/preferences/${id}`,
      config,
    );
    if (response) {
      console.log('responsepref', id);
      return id;
    }
  } catch (error) {
    console.error('Error during deleting single preference:', error);
    throw error;
  }
};

// Update pref
const updatePreference = async prefData => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.post(
      `${base_url}candidate/preferences`,
      prefData,
      config,
    );
    return response.data;
  } catch (error) {
    console.error('Error during updatePref:', error);
    throw error;
  }
};

export const preferenceService = {
  getAllPreference,
  getSinglePreference,
  addPreference,
  delPreference,
  updatePreference,
};
