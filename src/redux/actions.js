import axios from "axios";

import dasboardApi from "../api/dashboardApi.js";

export const FETCH_MENTIONS_TREND_REQUEST = "FETCH_MENTIONS_TREND_REQUEST";
export const FETCH_MENTIONS_TREND_SUCCESS = "FETCH_MENTIONS_TREND_SUCCESS";
export const FETCH_MENTIONS_TREND_FAILURE = "FETCH_MENTIONS_TREND_FAILURE";

export const FETCH_OVERALL_SENTIMENT_REQUEST = "FETCH_OVERALL_SENTIMENT_REQUEST";
export const FETCH_OVERALL_SENTIMENT_SUCCESS = "FETCH_OVERALL_SENTIMENT_SUCCESS";
export const FETCH_OVERALL_SENTIMENT_FAILURE = "FETCH_OVERALL_SENTIMENT_FAILURE";

export const FETCH_NEGATIVE_POSTS_REQUEST = "FETCH_NEGATIVE_POSTS_REQUEST";
export const FETCH_NEGATIVE_POSTS_SUCCESS = "FETCH_NEGATIVE_POSTS_SUCCESS";
export const FETCH_NEGATIVE_POSTS_FAILURE = "FETCH_NEGATIVE_POSTS_FAILURE";

export const FETCH_ALL_POSTS_REQUEST = "FETCH_ALL_POSTS_REQUEST";
export const FETCH_ALL_POSTS_SUCCESS = "FETCH_ALL_POSTS_SUCCESS";   
export const FETCH_ALL_POSTS_FAILURE = "FETCH_ALL_POSTS_FAILURE";

export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const RESET_FILTERS = "RESET_FILTERS";
export const UPDATE_PAGINATION_FILTERS = "UPDATE_PAGINATION_FILTERS";

// Calculate date
const formatDate = (date) => date.toISOString().split("T")[0];

export const getToDay = () => formatDate(new Date());

export const getDaysAgo = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return formatDate(date);

}
export const getWeeksAgo = (weeks) => {
    const date = new Date();
    date.setDate(date.getDate() - (weeks * 7));
    return formatDate(date);

}
export const getMonthsAgo = (months) => {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return formatDate(date);

}

export const getFirstDateOfWeekFromYearWeek = (year, week) => {
  // Create a date object set to the first Sunday of the year
  const firstDayOfYear = new Date(year, 0, 1); // Jan 1
  const dayOfWeek = firstDayOfYear.getDay(); // 0 (Sun) to 6 (Sat)
  
  // Get the first Sunday of the year
  const firstSunday = new Date(firstDayOfYear);
  firstSunday.setDate(firstDayOfYear.getDate() + (7 - dayOfWeek) % 7);
  
  // Add weeks to get to the correct week
  const dateInWeek = new Date(firstSunday);
  dateInWeek.setDate(firstSunday.getDate() + (week * 7));

  // Get the first day of the month of this date
  return new Date(dateInWeek.getFullYear(), dateInWeek.getMonth(), dateInWeek.getDate());
}

export const groupByDateAndPlatform = (data) => {
    const result = {};
    data.forEach(item => {
        const {date, platform, count} = item;
        if(!result[date]){
            result[date] = {
                date,
                Facebook: 0,
                Tiktok: 0,
                Threads: 0,
                Youtube: 0
            };
        };
        result[date][platform] += count;
    });
    return Object.values(result);
}


// Action creators
export const updateFilter = (key, value) => {
    console.log(`Update filter: ${key} = ${value}`);
    return {
        type: UPDATE_FILTERS,
        payload: { key, value }
    };
};

export const resetFilters = () => {
    console.log("Reset filters");
    return {
        type: RESET_FILTERS
    };
};

export const updatePaginationFilters = (paginationUpdates) => {
    console.log(`Update pagination filters: page = ${page}, pageSize = ${pageSize}`);
    return {
        type: UPDATE_PAGINATION_FILTERS,
        payload: paginationUpdates
    };
}

export const fetchMentionsTrend = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_MENTIONS_TREND_REQUEST });
    console.log("Thunk: FETCH_MENTIONS_TREND_REQUEST dispatched");
    try {
        const { filters } = getState();
        console.log("Current filters:", filters);
        const {sortBy, sortOrder, ...apiFilters} = filters;
        console.log("API filters:", apiFilters);
        const response = await dasboardApi.fetchMentionsTrend(apiFilters);
        console.log("Data in file actions: ", response);
        dispatch({
            type: FETCH_MENTIONS_TREND_SUCCESS,
            payload: response
        });
        console.log("Thunk: FETCH_MENTIONS_TREND_SUCCESS dispatched with data:", response);
    }
    catch (error) {
        console.error("Error in fetchMentionsTrend:", error);
        dispatch({
            type: FETCH_MENTIONS_TREND_FAILURE,
            payload: error.message || "An error occurred while fetching mentions trend"
        });
    }
}

export const fetchOverallSentiment = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_OVERALL_SENTIMENT_REQUEST });
    console.log("Thunk: FETCH_OVERALL_SENTIMENT_REQUEST dispatched");
    try {
        const { filters } = getState();
        console.log("Current filters:", filters);
        const {sortBy, sortOrder, ...apiFilters} = filters;
        console.log("API filters:", apiFilters);
        const response = await dasboardApi.fetchOverallSentiment(apiFilters);
        dispatch({
            type: FETCH_OVERALL_SENTIMENT_SUCCESS,
            payload: response
        });
        console.log("Thunk: FETCH_OVERALL_SENTIMENT_SUCCESS dispatched with data:", response);
    }
    catch (error) {
        console.error("Error in fetchOverallSentiment:", error);
        dispatch({
            type: FETCH_OVERALL_SENTIMENT_FAILURE,
            payload: error.message || "An error occurred while fetching overall sentiment"
        });
    }
};

export const fetchNegativePosts = (page = 1, limit = 20) => async (dispatch, getState) => {
    dispatch({ type: FETCH_NEGATIVE_POSTS_REQUEST });
    console.log("Thunk: FETCH_NEGATIVE_POSTS_REQUEST dispatched");
    try {
        const { filters } = getState();
        console.log("Current filters:", filters);
        const { ...apiFilters} = filters;
        
        apiFilters.page = page;
        apiFilters.limit = limit;
        console.log("API filters negative:", apiFilters);
        const response = await dasboardApi.fetchNegativePosts(apiFilters);
        dispatch({
            type: FETCH_NEGATIVE_POSTS_SUCCESS,
            payload: response
        });
        console.log("Thunk: FETCH_NEGATIVE_POSTS_SUCCESS dispatched with data:", response);
    }
    catch (error) {
        console.error("Error in fetchNegativePosts:", error);
        dispatch({
            type: FETCH_NEGATIVE_POSTS_FAILURE,
            payload: error.message || "An error occurred while fetching negative posts"
        });
    }
};

export const fetchAllPosts = () => async (dispatch, getState) => {
    dispatch({ type: FETCH_ALL_POSTS_REQUEST });
    console.log("Thunk: FETCH_ALL_POSTS_REQUEST dispatched");
    try {
        const { filters } = getState();
        console.log("Current filters:", filters);
        const {platformType, ...apiFilters} = filters;
        console.log("API filters:", apiFilters);
        const response = await dasboardApi.fetchAllPosts(apiFilters);
        dispatch({
            type: FETCH_ALL_POSTS_SUCCESS,
            payload: response
        });
        console.log("Thunk: FETCH_ALL_POSTS_SUCCESS dispatched with data:", response);
    }
    catch (error) {
        console.error("Error in fetchAllPosts:", error);
        dispatch({
            type: FETCH_ALL_POSTS_FAILURE,
            payload: error.message || "An error occurred while fetching all posts"
        });
    }
};