import assert from 'assert';

import { FETCH_ALL_POSTS_FAILURE, FETCH_ALL_POSTS_SUCCESS, FETCH_NEGATIVE_POSTS_FAILURE, FETCH_NEGATIVE_POSTS_SUCCESS } from '../../actions.js';

import postsReducers from '../postsReducer.js';
const postsInitialState = {
    negativePosts: {
        data: [],
        page: 1,
        limit: 10,
        totalPages: 0,
        totalItems: 0,
    },
    allPosts: {
        data: [],
        page: 1,
        limit: 20,
        totalPages: 0,
        totalItems: 0,
    },
};

console.log("Starting unit tests for postsReducer");

//Test case 1: Inital state
let state1 = postsReducers(undefined, {});
assert.deepStrictEqual(state1, postsInitialState, 'Test 1 Failed: Should return initial state and empty actions');
console.log("Test 1 Passed: Initial state is correct", state1);

//Test Case 2 : FETCH_NEGATIVE_POSTS_SUCCESS
const negativePostsPayload = {
    data: [{id: '1', content: 'Bad post'}],
    page: 1, limit: 1, totalPages: 1, totalItems: 1
};

let state2 = postsReducers(postsInitialState, {
    type: FETCH_NEGATIVE_POSTS_SUCCESS,
    payload: negativePostsPayload
});
assert.deepStrictEqual(state2.negativePosts, negativePostsPayload, 'Test 2 Failed: Should update negativePosts');
console.log("Test 2 Passed: fetchNegativePosts updated correctly");
