import axios from 'axios';
import {base_url} from '../../utils/base_url';

// Register Service
const getEmploymentTypes = async () => {
  try {
    const response = await axios.get(`${base_url}home/company-types`);
    return response.data;
  } catch (error) {
    console.error('Error during fetching employment types:', error);
    throw error;
  }
};

//   Login Service
const getJobByEmploymentTypes = async id => {
  try {
    const response = await axios.get(
      `${base_url}home/jobs-by-company-types/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error during fetching job by employment types:', error);
    throw error;
  }
};

export const jobCategoryService = {
  getEmploymentTypes,
  getJobByEmploymentTypes,
};
