import {
    GET_CATEGORIES,
    ADD_CATEGORY,
    DELETE_CATEGORY
} from '../actions/types';

const initialState = {
    categories: null,
    loading: false
}

export default function(state = initialState, action) {

    switch(action.type) {

        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload.categories,
                loading: false
            }

        case ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload.data], //state.categories.push(action.payload.data),
                loading: false
            }
            
        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category._id !== action.payload.id),
                loading: false
            }

        default:
            return {
                ...state
            }
    }

}