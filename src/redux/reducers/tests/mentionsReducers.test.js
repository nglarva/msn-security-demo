import mentionsReducers from "../mentionsReducer.js";

import assert from 'assert';
//import mentionsReducers from "../mentionsReducer.js";

const FETCH_MENTIONS_TREND_SUCCESS = 'FETCH_MENTIONS_TREND_SUCCESS';
const FETCH_MENTIONS_TREND_FAILURE = 'FETCH_MENTIONS_TREND_FAILURE';

const mentionsInitialState = {
    totalMentions: 0,
    totalMentionsLastPeriod: 0,
    trendData: [],
};

console.log("Starting Unit Tests for mentionsReducer");
/*
//Test case 1: Initial state
let state1 = mentionsReducers(undefined, {});
assert.deepStrictEqual(state1, mentionsInitialState, "Test 1 Failed: Should return initial state on undefined state and empty action");
console.log("Test 1 Passed: Initial state is correct.",state1);

//Test case 2: FETCH_MENTIONS_TREND_SUCCESS
const successPayload = {
    totalMentions: 300,
    totalMentionsLastPeriod: 500,
    trendData: [{date: "2025-02-15", count: 100}],
};

let state2 = mentionsReducers(mentionsInitialState, {
    type: FETCH_MENTIONS_TREND_SUCCESS,
    payload: successPayload
})

assert.deepStrictEqual(state2.totalMentions, 300, "Test 2 Failed: Should update totalMentions");
assert.deepStrictEqual(state2.trendData, successPayload.trendData, "Test 2 Failed: Should update trendData");
console.log("Test 2 Passed: Data updated correctly on success.");
*/
//Test case 3: FETCH_MENTIONS_TREND_FAILURE
let state3_modified = {...mentionsInitialState, totalMentions: 1000, trendData: [{date: "old", count: 10}]};
let state3 = mentionsReducers(state3_modified, {
    type: FETCH_MENTIONS_TREND_FAILURE,
    payload: "Error message",
});
console.log("State 3: ", state3);
assert.deepStrictEqual(state3, mentionsInitialState, "Test 3 Failed: Should reset state on failure");
console.log("Test 3 Passed: State reset correctly on failure.", state3);



