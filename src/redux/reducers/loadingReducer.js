import {
  FETCH_MENTIONS_TREND_REQUEST,
  FETCH_MENTIONS_TREND_SUCCESS,
  FETCH_MENTIONS_TREND_FAILURE,
  FETCH_ALL_POSTS_REQUEST,
  FETCH_ALL_POSTS_SUCCESS,
  FETCH_ALL_POSTS_FAILURE,
  FETCH_NEGATIVE_POSTS_REQUEST,
  FETCH_NEGATIVE_POSTS_SUCCESS,
  FETCH_NEGATIVE_POSTS_FAILURE,
  
  FETCH_OVERALL_SENTIMENT_SUCCESS,
  FETCH_OVERALL_SENTIMENT_REQUEST,
  FETCH_OVERALL_SENTIMENT_FAILURE,
  
} from "../actions.js";

const loadingInitialState = {
    mentionsTrend: false,
    overallSentiment: false,
    negativePosts: false,
    allPosts: false,
};

function loadingReducer(state = loadingInitialState, action) {
    switch (action.type){
        case FETCH_MENTIONS_TREND_REQUEST:
            console.log("loadingReducer: Handling FETCH_MENTIONS_TREND_REQUEST");
            return {...state, mentionsTrend: true};
        case FETCH_MENTIONS_TREND_SUCCESS:
        case FETCH_MENTIONS_TREND_FAILURE:
            console.log("loadingReducer: Handling FETCH_MENTIONS_TREND_SUCCESS/FAILURE");
            return {...state, mentionsTrend: false};

        case FETCH_OVERALL_SENTIMENT_REQUEST:
            console.log("loadingReducer: Handling FETCH_OVERALL_SENTIMENT_REQUEST");
            return {...state, overallSentiment: true};
        case FETCH_OVERALL_SENTIMENT_SUCCESS:
        case FETCH_OVERALL_SENTIMENT_FAILURE:
            console.log("loadingReducer: Handling FETCH_OVERALL_SENTIMENT_SUCCESS/FAILURE");
            return {...state, overallSentiment: false};

        case FETCH_NEGATIVE_POSTS_REQUEST:
            console.log("loadingReducer: Handling FETCH_NEGATIVE_POSTS_REQUEST");
            return {...state, negativePosts: true};
        case FETCH_NEGATIVE_POSTS_SUCCESS:
        case FETCH_NEGATIVE_POSTS_FAILURE:
            console.log("loadingReducer: Handling FETCH_NEGATIVE_POSTS_SUCCESS/FAILURE");
            return {...state, negativePosts: false};

        case FETCH_ALL_POSTS_REQUEST:
            console.log("loadingReducer: Handling FETCH_ALL_POSTS_REQUEST");
            return {...state, allPosts: true};
        case FETCH_ALL_POSTS_SUCCESS:
        case FETCH_ALL_POSTS_FAILURE:
            console.log("loadingReducer: Handling FETCH_ALL_POSTS_SUCCESS/FAILURE");
            return {...state, allPosts: false};  
        default: 
            return state; 
    }
}
export default loadingReducer;