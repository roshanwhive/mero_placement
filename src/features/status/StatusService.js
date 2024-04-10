import axios from "axios";
import { base_url } from "../../utils/base_url";
import { getConfigWithToken } from "../../utils/config";

//get saved job
const getSavedJob = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/status/saved-job`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('Error during fetching saved jobs:', error);
        throw error;
    }
};

//get matched job
const getMatchedJob = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/status/matching-job`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('Error during fetching matched jobs:', error);
        throw error;
    }
};

//get applied job
const getAppliedJob = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/status/matching-job`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('Error during fetching matched jobs:', error);
        throw error;
    }
};

export const StatusService = {
    getSavedJob,
    getMatchedJob,
    getAppliedJob,
};
