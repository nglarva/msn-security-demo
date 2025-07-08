import { FETCH_ALL_POSTS_FAILURE, FETCH_ALL_POSTS_SUCCESS, FETCH_NEGATIVE_POSTS_FAILURE, FETCH_NEGATIVE_POSTS_SUCCESS } from "../actions.js";

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

function postsReducer(state = postsInitialState, action){
    switch (action.type){
        case FETCH_NEGATIVE_POSTS_SUCCESS:
            console.log("postsReducer: Handling FETCH_NEGATIVE_POSTS_SUCCESS");
            return { ...state, negativePosts: action.payload};
        case FETCH_ALL_POSTS_SUCCESS:
            console.log("postsReducer: Handing FETCH_ALL_POSTS_SUCCESS");
            return {...state, allPosts: action.payload};
        case FETCH_NEGATIVE_POSTS_FAILURE:
            console.log("postsReducer: Handling FETCH_NEGATIVE_POSTS_FAILURE");
            return {...state, negativePosts: {...postsInitialState.negativePosts}};
        case FETCH_ALL_POSTS_FAILURE:
            console.log("postsReducers: Handling FETCH_ALL_POSTS_FAILURE");
            return {...state, allPosts: {...postsInitialState.allPosts}};
        default: 
            return state;
    }
}

export default postsReducer;
