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

const errorsInitialState = {
    mentionsTrend: null,
    overallSentiment: null,
    negativePosts: null,
    allPosts: null,
};

function errorReducer(state = errorsInitialState, action) {
    switch (action.type){
        case FETCH_MENTIONS_TREND_FAILURE:
            console.log("errorReducer: Handling FETCH_MENTIONS_TREND_FAILURE");
            return {...state, mentionsTrend: action.payload};
        case FETCH_MENTIONS_TREND_SUCCESS:
        case FETCH_MENTIONS_TREND_REQUEST:
            console.log("errorReducer: Clearing mentionsTrend error");
            return {...state, mentionsTrend: null};

        case FETCH_OVERALL_SENTIMENT_FAILURE:
            console.log("loadingReducer: Handling FETCH_OVERALL_SENTIMENT_FAILURE");
            return {...state, overallSentiment: action.payload};
        case FETCH_OVERALL_SENTIMENT_REQUEST:
        case FETCH_OVERALL_SENTIMENT_SUCCESS:
            console.log("loadingReducer: clearing overallSentiment error");
            return {...state, overallSentiment: null};

        case FETCH_NEGATIVE_POSTS_FAILURE:
            console.log("loadingReducer: Handling FETCH_NEGATIVE_POSTS_FAILURE");
            return {...state, negativePosts: action.payload};
        case FETCH_NEGATIVE_POSTS_REQUEST:
        case FETCH_NEGATIVE_POSTS_SUCCESS:
            console.log("loadingReducer: Clearing negativePosts error");
            return {...state, negativePosts: null};

        case FETCH_ALL_POSTS_FAILURE:
            console.log("loadingReducer: Handling FETCH_ALL_POSTS_FAILURE");
            return {...state, allPosts: action.payload};
        case FETCH_ALL_POSTS_REQUEST:
        case FETCH_ALL_POSTS_SUCCESS:
            console.log("loadingReducer: Handling FETCH_ALL_POSTS_SUCCESS/FAILURE");
            return {...state, allPosts: null};  
        default:
            return state 
    }
}
export default errorReducer;

