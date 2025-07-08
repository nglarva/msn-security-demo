import {FETCH_MENTIONS_TREND_SUCCESS, FETCH_MENTIONS_TREND_FAILURE } from "../actions.js";

const mentionsInitialState = {
    totalMentions: 0,
    totalMentionsLastPeriod: 0,
    trendData: [],
};

function mentionsReducers(state = mentionsInitialState, action) {
    switch (action.type){
        case FETCH_MENTIONS_TREND_SUCCESS:
            console.log("mentionsReducers : Handling FETCH_MENTIONS_TREND_SUCCESS");
            return {
                ...state,
                totalMentions: action.payload.totalMentions,
                totalMentionsLastPeriod: action.payload.totalMentionsLastPeriod,
                trendData: action.payload.trendData,
            };
        case FETCH_MENTIONS_TREND_FAILURE:
            console.log("mentionsReducers: Handling FETCH_MENTIONS_TREND_FAILURE")
            return {
                ...mentionsInitialState
            };
        default:
            return state;

    }
}
export default mentionsReducers;