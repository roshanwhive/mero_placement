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
            `${base_url}candidate/education/${id}`, config
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
const addEducation = async eduData => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.post(
            `${base_url}candidate/education-save-or-update`, eduData, config

        );
        return response.data;
    } catch (error) {
        console.error('Error during register:', error);
        throw error;
    }
};

//del single Education
const delEducation = async id => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.delete(
            `${base_url}candidate/education/${id}`, config,
        );
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during deleting single education:', error);
        throw error;
    }
};

// update Education
const updateEducation = async (eduUpdateData) => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.post(
            `${base_url}candidate/education-save-or-update`, eduUpdateData, config,
        );
        return response.data;
    } catch (error) {
        console.error('Error during updateEducation:', error);
        throw error;
    }
};


export const educationService = {
    getAllEducation,
    getSingleEducation,
    addEducation,
    delEducation,
    updateEducation,
};