const { configureStore } = window.RTK;
const { combineReducers } = window.Redux;

import filtersReducer from "./reducers/filtersReducer.js";
import sentimentReducer from "./reducers/sentimentReducer.js";
import mentionsReducer from "./reducers/mentionsReducer.js";
import postsReducer from "./reducers/postsReducer.js";
import loadingReducer from "./reducers/loadingReducer.js";
import errorReducer from "./reducers/errorReducer.js";

const rootReducer = combineReducers({
  filters: filtersReducer,
  mentions: mentionsReducer,
  sentiment: sentimentReducer,
  posts: postsReducer,
  loading: loadingReducer,
  errors: errorReducer,
});


const store = configureStore({
  reducer: rootReducer,
});
export default store;
