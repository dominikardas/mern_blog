import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {
    msg: null,
    validationErrors: null,
    status: null,
    id: null
}

export default function(state = initialState, action) {

    switch(action.type) {

        case GET_ERRORS:
            return {
                ...state,
                msg: action.payload.msg,
                validationErrors: action.payload.errors,
                status: action.payload.status,
                id: action.payload.id
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                msg: null,
                validationErrors: null,
                status: null,
                id: null
            };
        
        default:
            return state;
    }
}