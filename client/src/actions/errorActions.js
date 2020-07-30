import { GET_ERRORS, CLEAR_ERRORS } from './types';

// Return errors
export const returnErrors = (msg, errors, status, id = null) => dispatch => {

    dispatch({
        type: GET_ERRORS,
        payload: { msg, errors, status, id }
    });
}

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}