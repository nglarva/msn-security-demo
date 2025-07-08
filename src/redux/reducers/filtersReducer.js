import { UPDATE_FILTERS, RESET_FILTERS, UPDATE_PAGINATION_FILTERS,getToDay, getDaysAgo } from "../actions.js";

const today = new Date();
const last7Days = new Date();
last7Days.setDate(today.getDate() -7);


const filtersInitialState = {
    platformType: "all",
    startDate: getDaysAgo(7),
    endDate: getToDay(),
    keyword: "",
    period: "daily",
    sortBy: "postedAt",
    sortOrder: "desc",

};

function filtersReducer(state = filtersInitialState, action) {
    switch (action.type) {
        case UPDATE_FILTERS:
            const { key, value } = action.payload;
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        case RESET_FILTERS:
            return filtersInitialState;
        case UPDATE_PAGINATION_FILTERS:
            return {
                ...state,
                page: action.payload.page !== undefined ? action.payload.page : state.page,
                limit: action.payload.limit !== undefined ? action.payload.limit : state.limit,
                sortBy: action.payload.sortBy !== undefined ? action.payload.sortBy : state.sortBy,
                sortOrder: action.payload.sortOrder !== undefined ? action.payload.sortOrder : state.sortOrder,
            };
        default:
            return state;
    }
}

export default filtersReducer;

