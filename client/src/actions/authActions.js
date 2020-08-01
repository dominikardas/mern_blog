import axios from 'axios';

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
} from './types';

import { returnErrors, clearErrors } from './errorActions';

import { trackPromise } from 'react-promise-tracker';

// Check token and load user
export const loadUser = () => (dispatch) => {

    // User loading
    dispatch(setAuthLoading());

    // Fetch the user
    trackPromise(
    axios.get('/api/auth/user')
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err =>  {
            
            dispatch(returnErrors(err.response.data.msg, err.response.data.errors, err.response.status));

            dispatch({
                type: AUTH_ERROR
            });
            
        })
    );
}

export const login = ({ username, password }) => dispatch => {
    
    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({
        username,
        password
    });

    axios.post('/api/auth', body, config)
        .then(res => {
                
            dispatch(clearErrors());

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            
            dispatch(returnErrors(err.response.data.msg, err.response.data.errors, err.response.status, 'LOGIN_FAIL'));

            dispatch({
                type: LOGIN_FAIL
            });
        })
}

export const register = ({ name, username, password, password_r }) => dispatch => {

    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ 
        name,
        username,
        password,
        password_r,
    });

    axios.post('/api/users/register', body, config) 
         .then(res => {
            
            dispatch(clearErrors());

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });

            loadUser();
         })
         .catch(err => {
             
            dispatch(returnErrors(err.response.data.msg, err.response.data.errors, err.response.status, 'REGISTER_FAIL'));

            dispatch({
                type: REGISTER_FAIL
            });
         });
}

export const logout = () => (dispatch) => {   
    
    axios.post('/api/auth/logout')
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(err => console.log(err));
}

export const setAuthLoading = () => {
    return {
        type: USER_LOADING
    }
}

// Admin actions
export const getAllUsers = (page = 1) => (dispatch) => {

    // Get all users from api
    axios.get(`/api/users?page=${page}`)
        .then(res => {
            dispatch({
                type: GET_ALL_USERS,
                payload: { data: res.data }
            })
        })
        .catch(err => 
            dispatch({
                type: GET_ALL_USERS,
                payload: { data: 'NO_USERS' }
            })
        );
}

export const deleteUser = (id) => (dispatch) => {

    // Delete a user by id
    axios.delete(`/api/users/${id}`)
        .then(res =>  {
            
            dispatch(returnErrors(res.data.msg, null, res.status, 'DELETE_USER'));

            dispatch({
                type: DELETE_USER,
                payload: { id }
            });
        })
        .catch(err => {

            dispatch(returnErrors(err.data.msg, err.data.errors, err.status, 'DELETE_USER'));

            // dispatch({
            //     type: DELETE_USER
            // });    
        });
}