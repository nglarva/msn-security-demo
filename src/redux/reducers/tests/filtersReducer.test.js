import assert from 'assert';
//import filtersReducer from '../filtersReducer.js';
import filtersReducer from '../filtersReducer.js';
import { UPDATE_FILTERS, RESET_FILTERS, UPDATE_PAGINATION_FILTERS } from '../../actions.js';
import { type } from 'os';

const filtersInitialState = {
    platformType: "all",
    starDate: null,
    endDate: null,
    keyword: "",
    period: "daily",
    sortBy: "createdAt",
    sortOrder: "desc",
};

console.log("filtersReducer test started");
/*
//Test case 1: Initial state
let state1 = filtersReducer(undefined, {});
console.log("Initial state: ", filtersInitialState)
assert.deepStrictEqual(filtersInitialState, state1, "Test 1 failed: Should return initial state on undefined state and empty action");
console.log("Test 1 passed: Initial state is correct. ")

//Test case 2: Update filter
let state2 = filtersReducer(filtersInitialState, {
    type: UPDATE_FILTERS,
    payload: {'key':'keyword', 'value': 'winmart'}
});

assert.deepStrictEqual(state2.keyword, 'winmart', 'Test 2 failed: Should update keyword');
assert.deepStrictEqual(state2.platformType, 'all', 'Test 2 failed: other filters remains exchanged');
console.log("Test 2 Passed: Filter updated successfully", state2);
*/
// Test case 3: Update many filters
let state3 = filtersReducer(filtersInitialState, {
    type: UPDATE_FILTERS,
    payload: {key: 'platformType', value: 'Tiktok'}
})
let state3_1 = filtersReducer(state3, {
    type: UPDATE_FILTERS,
    payload: {key: 'period', value:'monthly'}
})

assert.deepStrictEqual(state3_1.platformType, "Tiktok", "Test 3 Failed: Should be updated");
assert.deepStrictEqual(state3_1.period, "monthly", "Test 3 Failed: Should be updated");
assert.deepStrictEqual(state3_1.keyword,"", "Test 3 Failed: Others filters should remain unchanged");
console.log("Test 3 passed", state3_1)

//Test 4 reset filters
let state4_modified = {...filtersInitialState, keyword:'test', page: 2};
let state4 = filtersReducer(state4_modified,{type: RESET_FILTERS});
assert.deepStrictEqual(state4, filtersInitialState, 'Test 4 Failed: should reset filters');
console.log("Test 4 passed", state4);

// Test 5: Cập nhật phân trang
let state5 = filtersReducer(filtersInitialState, {type: UPDATE_PAGINATION_FILTERS, payload: {page: 2, limit: 30}});
assert.deepStrictEqual(state5.page, 2, "Test 5 Failed: should update page");
assert.deepStrictEqual(state5.limit, 30, 'Test 5 Failed: should update limit');
assert.deepStrictEqual(state5.sortBy, "createdAt", "Test 5 Failed: Sortby should be default");
console.log("Test 5 passed: update pagnition filters", state5)

//Test 6 Update sortBy
let state6 = filtersReducer(filtersInitialState, {
    type: UPDATE_PAGINATION_FILTERS,
    payload: {sortBy: 'createdAt', sortOrder: 'asc'}

});
assert.deepStrictEqual(state6.sortBy, 'createdAt', "Test 6 Failed: Should update sortBy");
assert.deepStrictEqual(state6.sortOrder, 'asc', "Test 6 Failed: Should update sortOrder");
console.log("Test 6 Passed: Sort filters updated correctly", state6);
