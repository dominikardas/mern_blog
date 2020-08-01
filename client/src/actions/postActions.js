import { 
    GET_POSTS, 
    GET_POSTS_BY_CAT, 
    GET_POST_BY_SLUG, 
    POSTS_LOADING,
    GET_ALL_POSTS,
    GET_POST_BY_ID,
    DELETE_POST,
    PUBLISH_POST,
    UNPUBLISH_POST,
    SUBMIT_POST
} from './types';

import axios from 'axios';

import { trackPromise } from 'react-promise-tracker';

import { returnErrors } from './errorActions';

export const getPosts = (page = 1) => dispatch => {

    dispatch(setPostsLoading());

    // Get data from local API
    axios
        .get(`/api/posts/published?page=${page}`)
        .then( res =>
            dispatch({
                type: GET_POSTS,
                payload: { data: res.data }
            })  
        );

    // return {
    //     type: GET_POSTS
    // };
}
export const getPostsByCategory = (categoryName, page = 1) => dispatch => {

    dispatch(setPostsLoading());

    // var category = categoryName[0].toUpperCase() + categoryName.toLowerCase().slice(1);
    // console.log(category);

    // Get data from local API
    axios
        .get(`/api/posts/findByCategory/${categoryName}/?page=${page}`)
        .then( res => 
            dispatch({
                type: GET_POSTS_BY_CAT,
                payload: { data: res.data }
            })    
        );
}

export const getPostBySlug = (slug) => dispatch => {
    
    axios
        .get(`/api/posts/findBySlug/${slug}`)
        .then ( res => 
            dispatch({
                type: GET_POST_BY_SLUG,
                payload: { data: res.data }
            })
        );

}

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    }
}

export const submitPost = (post) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    };

    // Request body
    const body = JSON.stringify({ 
        title: post.title,
        smallDesc: post.smallDesc,
        content: post.content,
        postImage: post.postImage,
        authorName: post.authorName,
        categoryName: post.categoryName,
        tags: post.tags
    });

    axios.post('/api/posts', body, config)
        .then(res => {
                console.log(res);
                dispatch({
                    type: SUBMIT_POST
                })    
            }
        )
        .catch(err => console.log(err));

}

// Admin actions
export const getAllPosts = (page = 1) => (dispatch) => {

    axios.get(`/api/posts?page=${page}`)
        .then(res => {console.log(res)
            dispatch({
                type: GET_ALL_POSTS,
                payload: { data: res.data }
            })}
        )
        .catch(err => console.log(err));

}

export const getPostById = (id) => (dispatch) => {
    
    axios.get(`/api/posts/findById/${id}`)
        .then(res => {
            dispatch({
                type: GET_POST_BY_ID,
                payload: { data: res.data }
            })
        })
        .catch(err => console.log(err));
}

export const deletePost = (id) => (dispatch) => {

    axios.delete(`/api/posts/${id}`)
        .then(res => {

            console.log(res);

            dispatch(returnErrors(res.data.msg, null, res.status, 'DELETE_POST'));

            dispatch({
                type: DELETE_POST,
                payload: { id }
            });

        })
        .catch(err => {

            console.log(err);

            dispatch(returnErrors(err.data.msg, err.data.errors, err.status, 'DELETE_POST'));

            // dispatch({
            //     type: DELETE_POST,
            //     payload: { id }
            // })
        });
}

export const publishPost = (id) => (dispatch) => {

    axios.post(`/api/posts/publish/${id}`)
        .then(res => {

            console.log(res);

            dispatch(returnErrors(res.data.msg, null, res.status, 'PUBLISH_POST'));

            dispatch({
                type: PUBLISH_POST,
                payload: {
                    id,
                    published: true
                }
            });

        })
        .catch(err => {

            console.log(err);
            
            dispatch(returnErrors(err.data.msg, err.data.errors, err.status, 'PUBLISH_POST'));

            // dispatch({
            //     type: PUBLISH_POST,
            //     payload: {
            //         id,
            //         published: true
            //     }
            // })
        });
}

export const unpublishPost = (id) => (dispatch) => {

    axios.post(`/api/posts/unpublish/${id}`)
    .then(res => {

        console.log(res);

        dispatch(returnErrors(res.data.msg, null, res.status, 'UNPUBLISH_POST'));

        dispatch({
            type: UNPUBLISH_POST,
            payload: {
                id,
                published: false
            }
        });

    })
    .catch(err => {

        console.log(err);
        
        dispatch(returnErrors(err.data.msg, err.data.errors, err.status, 'UNPUBLISH_POST'));

        // dispatch({
        //     type: UNPUBLISH_POST,
        //     payload: {
        //         id,
        //         published: false
        //     }
        // })
    });
}