import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, GET_DETAILS } from './actionTypes';
import axios from 'axios';
export const loginUserRequest = (payload) => ({
    type: LOGIN_USER_REQUEST,
    payload
});

export const loginUserSuccess = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload
});

export const loginUserFailure = (payload) => ({
    type: LOGIN_USER_FAILURE,
    payload
});

export const logoutUser = (payload) => ({
    type: LOGOUT_USER,
    payload
});

export const getDetails = (payload) => ({
    type: GET_DETAILS,
    payload
});
export const userlogin = (payload) => async (dispatch) => {
    console.log(payload);
    dispatch(loginUserRequest());
    const { email, password } = payload;
    console.log(email, password);

    try {
        let res = await axios({
            method: 'post',
            url: 'http://localhost:5000/user/login',
            data: {
                email,
                password
            }
        });
        console.log(res.data);
        dispatch(loginUserSuccess(res.data));
        return true;
    } catch (err) {
        dispatch(loginUserFailure(err));
        return false;
    }
};

export const getEmployeeData = (payload) => async (dispatch) => {
    axios
        .get(
            `http://localhost:5000/api/employee?page=${payload.page}&limit=${payload.perPage}&date=${payload.date}&gender=${payload.gender}&name=${payload.name}`
        )
        .then((res) => dispatch(getDetails(res.data)));
};
