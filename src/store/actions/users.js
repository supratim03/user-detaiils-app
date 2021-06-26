import * as actionTypes from "./../types";
import { addressHelper, getUserListByIndex } from './../../helpers/helper';

export const getAllUsers = (pageSize = 2) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}users`
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res.statusText || "Error while fetching users.";
                }
            })
            .then((res) => {
                res.forEach(element => {
                    let addr = addressHelper(element.address);
                    element.address = addr;
                    element.company = element.company.name;
                });
                let arr = getUserListByIndex(0, pageSize - 1, res);
                dispatch(setPaginatedUser(arr));
                dispatch(setAllUsers(res));
                dispatch(setShowLoader(false));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export const setAllUsers = (data) => {
    return {
        type: actionTypes.SET_ALL_USERS,
        payload: {
            data: data
        }
    }
}

export const setShowLoader = (data) => {
    return {
        type: actionTypes.SET_SHOW_LOADER,
        payload: {
            data: data
        }
    }
}

export const setPaginatedUser = (data) => {
    return {
        type: actionTypes.SET_PAGINATED_USERS,
        payload: {
            data: data
        }
    }
}


export const getUserById = (userId, prevState) => {
    return (dispatch) => {
        let url = `${process.env.REACT_APP_API_URL}users/${userId}`
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res.statusText || "Error while fetching users.";
                }
            })
            .then((res) => {
                console.log(prevState);
                let addr = addressHelper(res.address);
                res.address = addr;
                res.company = res.company.name;
                let obj = {};
                obj[res.id] = res;
                let newState = { ...prevState, ...obj };
                console.log(newState);
                dispatch(setfetchedUsermap(newState))
                dispatch(setShowLoader(false));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


export const setfetchedUsermap = (data) => {
    return {
        type: actionTypes.SET_FETCHED_USERS,
        payload: {
            data: data
        }
    }
}

