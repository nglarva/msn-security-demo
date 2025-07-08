import { FETCH_OVERALL_SENTIMENT_SUCCESS, FETCH_OVERALL_SENTIMENT_FAILURE } from "../actions.js";

const sentimentInitalState = {
    overallNetSentiment: 0,
    sentimentDistribution: {
        positiveCount: 0, negativeCount: 0, neutralCount: 0,
        positivePercentage: 0, negativePercentage: 0, neutralPercentage: 0
    },
};

function sentimentReducer(state = sentimentInitalState, action) {
    switch (action.type) {
        case FETCH_OVERALL_SENTIMENT_SUCCESS:
            console.log("sentimentReducer: Handling FETCH_OVERALL_SENTIMENT_SUCCESS");
            return {
                ...state,
                overallNetSentiment: action.payload.overallNetSentiment,
                sentimentDistribution: action.payload.sentimentDistribution
            };
        case FETCH_OVERALL_SENTIMENT_FAILURE:
            console.log("sentimentReducer: Handling FETCH_OVERALL_SENTIMENT_FAILURE");
            return {
                ...sentimentInitalState
            };
        default:
            return state;
    }
};

export default sentimentReducer;