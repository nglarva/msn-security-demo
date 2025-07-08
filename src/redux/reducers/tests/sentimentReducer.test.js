import assert from 'assert';
import { FETCH_OVERALL_SENTIMENT_FAILURE, FETCH_OVERALL_SENTIMENT_SUCCESS } from '../../actions.js';
import sentimentReducer from '../sentimentReducer.js';
import { unicode } from '@fortawesome/free-solid-svg-icons/fa0';


const sentimentInitalState = {
    overallNetSentiment: 0,
    sentimentDistribution: {
        positiveCount: 0, negativeCount: 0, neutralCount: 0,
        positivePercentage: 0, negativePercentage: 0, neutralPercentage: 0
    },
};

console.log("Start unit tests for sentimentReducer");
//Test initial state
let state1 = sentimentReducer(undefined, {});
assert.deepStrictEqual(state1, sentimentInitalState, 'Test 1 Failed: Should return initial state on undefined state');
console.log("Test 1 Passed: initial state is correct. ", state1);

//Test case 2: FETCH_OVERALL_SENTIMENT_SUCCESS
const successPayload = {
    overallNetSentiment: 0.75,
    sentimentDistribution: {
        positiveCount: 75, negativeCount: 65, neutralCount: 55, positivePercentage: 45, negativePercentage: 15, neutralPercentage: 10 
    }
};
let state2 = sentimentReducer(sentimentInitalState, {
    type: FETCH_OVERALL_SENTIMENT_SUCCESS,
    payload: successPayload
});

assert.deepStrictEqual(state2.overallNetSentiment, 0.75, 'Test 2 Failed: Should update overallNetSentiment');
assert.deepStrictEqual(state2.sentimentDistribution, successPayload.sentimentDistribution, "Test 2 Failed: Should update sentimentDistribution");
console.log("Test 2 Passed: Data updated correctly on success.", state2);

//Test case 3: FETCH_OVERALL_SENTIMENT_FAILURE
let state3_modified = { ...sentimentInitalState, overallNetSentiment: 0.5};
let state3 = sentimentReducer(state3_modified, {
    type: FETCH_OVERALL_SENTIMENT_FAILURE,
    payload: 'Error fetching sentiment'
});

assert.deepStrictEqual(state3, sentimentInitalState, 'Test3 Failed: should reset');
console.log("Test 3 Passed: state reset correctly on failure. ",state3);








