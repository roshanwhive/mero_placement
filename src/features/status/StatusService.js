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
        throw error;
    }
};

//get applied job
const getAppliedJob = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/status/applied-job`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

//get followed job
const getFollowedJob = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/status/followed-company-job`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};

//get followed company
const getFollowedCompany = async () => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}candidate/status/followed-company`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        throw error;
    }
};


export const StatusService = {
    getSavedJob,
    getMatchedJob,
    getAppliedJob,
    getFollowedJob,
    getFollowedCompany,
};
