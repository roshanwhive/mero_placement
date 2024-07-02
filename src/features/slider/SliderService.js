import axios from 'axios';
import { base_url } from '../../utils/base_url';

//get slider Image
const getSliderImage = async () => {
  try {
    const response = await axios.get(`${base_url}home/slider-image`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error('Error during fetching slider image:', error);
    throw error;
  }
};





export const sliderService = {
  getSliderImage,
};
