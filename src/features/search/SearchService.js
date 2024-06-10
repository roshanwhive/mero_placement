import axios from "axios";
import { base_url } from "../../utils/base_url";
import { getConfigWithToken } from "../../utils/config";

//get saved job
const getSearchJob = async searchData => {
    try {
        const config = await getConfigWithToken();
        const response = await axios.post(`${base_url}home/search-job`, searchData,config);
        if (response) {
            return response.data;
        }
    } catch (error) {
        console.log('Error during fetching search jobs:', error);
        throw error;
    }
};


export const SearchJobService = {
    getSearchJob,
};
