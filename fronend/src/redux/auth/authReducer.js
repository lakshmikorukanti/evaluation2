import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER, GET_DETAILS } from './actionTypes';

let initState = {
    isLoading: false,
    email: '',
    error: false,
    message: '',
    isAuth: false,
    accessToken: '',
    employeeData: '',
    totalPages: 0
};

const authReducer = (state = initState, { type, payload }) => {
    console.log(payload);
    switch (type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: false
            };

        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                email: payload.auth,
                isLoading: false,
                error: false,
                isAuth: true,
                message: 'SIGNIN Successful!',
                accessToken: payload.accessToken
            };

        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
                message: 'Something went wrong...'
            };
        case LOGOUT_USER:
            return {
                ...state,
                email: '',
                isAuth: false,
                error: false,
                message: 'Logout Successful!',
                city: '',
                Name: '',
                email: ''
            };
        case GET_DETAILS:
            console.log(payload, 'het');
            return {
                ...state,
                employeeData: payload.data,
                totalPages: payload.finalPage
            };
        default:
            return state;
    }
};

export default authReducer;
