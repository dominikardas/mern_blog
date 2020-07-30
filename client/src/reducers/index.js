import { combineReducers } from 'redux';

import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    posts: postReducer,
    categories: categoryReducer,
    auth: authReducer,
    errors: errorReducer
});