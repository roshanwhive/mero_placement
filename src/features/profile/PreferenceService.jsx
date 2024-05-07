import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { getConfigWithToken } from '../../utils/config';

//get all Preference
const getAllPreference = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/preferences`, config);
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
            `${base_url}candidate/education/${id}`, config,
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during fetching single preferences:', error);
        throw error;
    }
};

// post education
const addPreference = async registerData => {
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


export const preferenceService = {
    getAllPreference,
    getSinglePreference,
    addPreference,
};