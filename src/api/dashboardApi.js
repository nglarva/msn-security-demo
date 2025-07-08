import axios from "axios";

const API_BASE_URL = "http://localhost:3333/api/dashboard";

const buildUrlWithParams = (endpoint, filters) => {
    const params = new URLSearchParams(filters).toString();
    return `${API_BASE_URL}/${endpoint}?${params}`;
}

const dashboardApi = {
    fetchMentionsTrend: async (filters) => {
        const url = buildUrlWithParams("mentions/trend", filters);
        console.log(`API Call: GET ${url}`);
        try{
            const response = await axios.get(url);
            console.log("Status code: ", response.status);
            console.log("Response data: ", response.data);
            return response.data;
        } catch(error) {
            console.error("Error in fetchMentionsTrend: ", error);
            return []
        }
        
        //return response.data;
    },

    fetchOverallSentiment: async (filters) => {
        const url = buildUrlWithParams("sentiment/overall", filters);
        console.log(`API Call: GET ${url}`);
        const response = await axios.get(url);
        return response.data;
    },

    fetchNegativePosts: async (filters) => {
        const url = buildUrlWithParams("alerts/negative-posts", filters);
        console.log(`API Call: GET ${url}`);
        const response = await axios.get(url);
        return response.data;
    },

    fetchAllPosts: async (filters) => {
        const url = buildUrlWithParams("posts", filters);
        console.log(`API Call: GET ${url}`);
        const response = await axios.get(url);
        return response.data;
    }
};

export default dashboardApi;