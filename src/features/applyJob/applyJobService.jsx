import axios from "axios";
import { base_url } from "../../utils/base_url";
import { getConfigWithToken } from "../../utils/config";

//get job confirm data
const getapplyJobData = async slug => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}home/apply-job/${slug}`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during fetching job review data:', error);
        throw error;
    }
};

//get job apply 
const getapplyJobConfirm = async (data) => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.get(`${base_url}home/apply-job/${data?.slug}/${data?.resume}`, config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.error('Error during fetching job apply:', error);
        throw error;
    }
};

export const applyJobService = {
    getapplyJobData,
    getapplyJobConfirm,
};