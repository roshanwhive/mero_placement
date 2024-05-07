import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { getConfigWithToken } from '../../utils/config';

//get all education
const getAllEducation = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/educations`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during fetching all education:', error);
        throw error;
    }
};

//get single education
const getSingleEducation = async id => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(
            `${base_url}candidate/education/${id},config`,
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during fetching single educaiton:', error);
        throw error;
    }
};

// post education
const addEducation = async registerData => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.post(
            `${base_url}candidate/education-save-or-update`,

        );
        return response.data;
    } catch (error) {
        console.error('Error during register:', error);
        throw error;
    }
};


export const educationService = {
    getAllEducation,
    getSingleEducation,
    addEducation,
};