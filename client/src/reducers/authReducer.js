import {
    USER_LOADING,     
    USER_LOADED,  
    AUTH_ERROR,  
    LOGIN_SUCCESS,    
    LOGIN_FAIL,    
    LOGOUT_SUCCESS,  
    REGISTER_SUCCESS, 
    REGISTER_FAIL,  
    GET_ALL_USERS  
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    users: null
}

export default function(state = initialState, action) {

    switch(action.type) {

        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            };
        
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:

            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            };

        case GET_ALL_USERS:

            return {
                ...state,
                users: action.payload.data,
                loading: false
            };
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            
            return {
                ...state,
                user: 'NO_USER',
                isAuthenticated: false,
                loading: false
            };

        default:
            return state;
    }
}