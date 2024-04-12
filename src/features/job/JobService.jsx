import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { err } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getConfigWithToken } from '../../utils/config';

//get all job
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

//get single job
const getSingleJob = async slug => {
  try {
    const response = await axios.get(
      `${base_url}profile/vacancy-profile/${slug}`,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching single job:', error);
    throw error;
  }
};

// ------------------------------Category--------------------------
// get all job category
const getJobCategories = async () => {
  try {
    const response = await axios.get(`${base_url}home/categories`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching job categories:', error);
    throw error;
  }
};

//Get main Categories
const getMainCategories = async () => {
  try {
    const response = await axios.get(`${base_url}home/main-categories`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching main categories:', error);
    throw error;
  }
};

//   get job by category
const getJobByCategory = async id => {
  try {
    const response = await axios.get(`${base_url}home/jobs-by-category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching job by categories:', error);
    throw error;
  }
};

// ---------------------------Company-----------------------------
// Get company types
const getCompanyTypes = async () => {
  try {
    const response = await axios.get(`${base_url}home/company-types`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching company types:', error);
    throw error;
  }
};
//  get Job By Company Type
const getJobByCompanyTypes = async id => {
  try {
    const response = await axios.get(
      `${base_url}home/jobs-by-company-types/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during fetching job by company types:', error);
    throw error;
  }
};

// ------------------------------Employment----------------------------
// Get employment types
const getEmploymentTypes = async () => {
  try {
    const response = await axios.get(`${base_url}home/employment-types`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching employment types:', error);
    throw error;
  }
};
//  get Job By employment Type+
const getJobByEmploymentTypes = async id => {
  try {
    const response = await axios.get(
      `${base_url}home/jobs-by-employment-types/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during fetching job by employment types:', error);
    throw error;
  }
};

// ------------------------------Job Types----------------------------
// Get Job types
const getJobTypes = async () => {
  try {
    const response = await axios.get(`${base_url}home/job-types`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching job types:', error);
    throw error;
  }
};
//  get Job By Job Type
const getJobByJobTypes = async id => {
  try {
    const response = await axios.get(
      `${base_url}home/jobs-by-company-types/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during fetching job by job types:', error);
    throw error;
  }
};


export const jobService = {
  getJobCategories,
  getMainCategories,
  getJobByCategory,
  getAllJobs,
  getSingleJob,
  getCompanyTypes,
  getJobByCompanyTypes,
  getEmploymentTypes,
  getJobByEmploymentTypes,
  getJobTypes,
  getJobByJobTypes,
};
