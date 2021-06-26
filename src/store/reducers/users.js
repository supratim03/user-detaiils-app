import * as actionTypes from "./../types";

const initialState = {
    userList: [],
    showLoader: true,
    paginatedUserList: [],
    fetchUserMap: {}
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_USERS:
            return {
                ...state,
                userList: [...action.payload.data]
            }
        case actionTypes.SET_SHOW_LOADER:
            return {
                ...state,
                showLoader: action.payload.data
            }
        case actionTypes.SET_PAGINATED_USERS:
            return {
                ...state,
                paginatedUserList: [...action.payload.data]
            }
        case actionTypes.SET_FETCHED_USERS:
            return {
                ...state,
                fetchUserMap: {...action.payload.data}
            }
        default:
            return state;
    }
}

export default users;