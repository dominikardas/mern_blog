import {
    USER_LOADING,     
    USER_LOADED,  
    AUTH_ERROR,  
    LOGIN_SUCCESS,    
    LOGIN_FAIL,    
    LOGOUT_SUCCESS,  
    REGISTER_SUCCESS, 
    REGISTER_FAIL,  
    GET_ALL_USERS,
    DELETE_USER
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: false,

    user: null,
    users: null,

    usersCount: null,
    usersPerPage: null
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
                users: action.payload.data.users,
                usersCount: action.payload.data.usersCount,
                usersPerPage: action.payload.data.usersPerPage,
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

        case DELETE_USER:
            
            return {
                ...state, 
                users: state.users.filter(user => user._id !== action.payload.id)
            }

        default:
            return state;
    }
}