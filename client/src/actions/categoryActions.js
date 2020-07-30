import axios from 'axios';

import {
    GET_CATEGORIES,
    ADD_CATEGORY,
    DELETE_CATEGORY
} from './types';

export const getAllCategories = () => (dispatch) => {

    axios.get('/api/categories')
        .then(res => 
            dispatch({
                type: GET_CATEGORIES,
                payload: { data: res.data }
            })
        )

}

// Create category

// Admin actions
export const deleteCategory = (id) => (dispatch) => {

    axios.delete(`/api/categories/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_CATEGORY,
                payload: { data: res.data }
            })    
        )
        .catch(err => console.log(err));
}