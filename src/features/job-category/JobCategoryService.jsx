import axios from 'axios';
import {base_url} from '../../utils/base_url';

// get all job category Service
const getJobCategories = async () => {
  try {
    const response = await axios.get(`${base_url}home/categories`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching job categories:', error);
    throw error;
  }
};

//   get job by category Service
const getJobByCategory = async id => {
  try {
    const response = await axios.get(`${base_url}home/jobs-by-category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching job by categories:', error);
    throw error;
  }
};

//get all job Serive
const getAllJobs = async () => {
  try {
    const response = await axios.get(`${base_url}home/view-all-jobs`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching all jobs:', error);
    throw error;
  }
};

export const jobCategoryService = {
  getJobCategories,
  getJobByCategory,
  getAllJobs,
};
