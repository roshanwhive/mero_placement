import axios from 'axios';
import { getConfigWithToken } from '../../utils/config';
import { base_url } from '../../utils/base_url';

//get all content
const getAllContent = async () => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(`${base_url}home/contents`, config);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching all content:', error);
    throw error;
  }
};

//get single content
const getSingleContent = async slug => {
  try {
    const config = await getConfigWithToken();
    const response = await axios.get(
      `${base_url}home/contents/${slug}`,
      config,
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching single content:', error);
    throw error;
  }
};




export const allcontentService = {
  getAllContent,
  getSingleContent,
};
