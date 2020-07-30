import { 
    GET_POSTS, 
    GET_POSTS_BY_CAT, 
    GET_POST_BY_SLUG, 
    POSTS_LOADING,
    GET_ALL_POSTS,
    GET_POST_BY_ID,
    SUBMIT_POST,
    PUBLISH_POST,
    UNPUBLISH_POST,
    DELETE_POST
} from '../actions/types';

const initialState = {
    posts: [],
    loading: false
}

export default function(state = initialState, action) {

    switch (action.type) {

        case GET_POSTS:
        case GET_ALL_POSTS:
            return {
                ...state,
                posts: action.payload.data,
                loading: false
            };

        case GET_POSTS_BY_CAT:
            return {
                ...state,
                posts: action.payload.data,
                loading: false
            };

        case GET_POST_BY_SLUG:
        case GET_POST_BY_ID:
            return {
                ...state,
                posts: action.payload.data,
                loading: false
            };

        case SUBMIT_POST:
            return {
                ...state,
                loading: false
            }

        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            };

        case PUBLISH_POST:
        case UNPUBLISH_POST:
            return {
                ...state,
                posts: state.posts.map(
                    post => post.id === action.payload.id 
                            ? { ...post, published: action.payload.published } 
                            : post
                ) 
            }

        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload.id)
            };

        default:
            return state;


    }
}