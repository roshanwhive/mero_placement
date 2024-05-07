import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { getConfigWithToken } from '../../utils/config';

//get all Experience
const getAllExperience = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/experiences`, config);
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
            `${base_url}candidate/education/${id}`, config,
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during fetching single educaiton:', error);
        throw error;
    }
};

// post Experience
const addExperience = async registerData => {
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


export const experienceService = {
    getAllExperience,
    getSingleExperience,
    addExperience,
};