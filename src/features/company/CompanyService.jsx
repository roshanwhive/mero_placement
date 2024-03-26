import axios from 'axios';
import {base_url} from '../../utils/base_url';

//get all job
const companyProfile = async slug => {
  try {
    const response = await axios.get(
      `${base_url}profile/company-profile/${slug}`,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching company profile:', error);
    throw error;
  }
};

export const companyService = {
  companyProfile,
};
