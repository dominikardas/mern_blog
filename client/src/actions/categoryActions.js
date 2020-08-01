import axios from 'axios';

import {
    GET_CATEGORIES,
    ADD_CATEGORY,
    DELETE_CATEGORY
} from './types';

import { returnErrors } from './errorActions';
import { trackPromise } from 'react-promise-tracker';

export const getAllCategories = () => (dispatch) => {

    trackPromise(
    axios.get('/api/categories')
        .then(res => 
            dispatch({
                type: GET_CATEGORIES,
                payload: { 
                    categories: res.data
                }
            })
        )
        .catch(err => console.log(err))
    );
}

// Admin actions

export const createCategory = ({ categoryName }) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    const body = JSON.stringify({
        name: categoryName
    });
    
    axios.post('/api/categories', body, config)
        .then(res => 
            dispatch({
                type: ADD_CATEGORY,
                payload: { data: res.data }
            })
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data.msg, err.response.data.errors, err.response.status, 'ADD_CATEGORY'))
        );
}

export const deleteCategory = (id) => (dispatch) => {

    axios.delete(`/api/categories/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_CATEGORY,
                payload: { id }
            })    
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data.msg, err.response.data.errors, err.response.status, 'DELETE_CATEGORY'))
        );
}