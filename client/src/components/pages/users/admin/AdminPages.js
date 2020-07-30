import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { getAllUsers, deleteUser } from '../../../../actions/authActions';
import { getAllCategories, deleteCategory } from '../../../../actions/categoryActions';
import { getAllPosts, publishPost, unpublishPost, deletePost } from '../../../../actions/postActions';


export class AdminUsers extends Component {

    action(type, id) {

        // e.preventDefault();

        console.log(type, id);

        if (type === 'DELETE_USER') {

            this.props.deleteUser(id);
            
            setTimeout(
                function() {
                    this.props.getAllUsers();
                }
                .bind(this),
                250
            );
        }
    }

    render() {
        return (
            <div className="js-admin_container l-admin_container l-admin_users">
                        
                <h2>Users</h2>
            
                <div class="l-admin_component">

                    { this.props.users.map( (user) => {      
                        
                        return (

                            <div class="l-admin_component_item">                                        
                                <div class="l-admin_item_info">
                                    <div class="l-user_info_isAdmin">
                                        { user.isAdmin ?
                                            'Site Admin'
                                            :
                                            'User'
                                        }
                                    </div>
                                    <div class="l-user_info_name">{ user.name }</div>
                                    <div class="l-user_info_username">{ user.username }</div>
                                </div>
                                
                                <div class="l-admin_item_actions">                                  
                                    <button className="btn btn-remove" onClick={this.action.bind(this, 'DELETE_USER', user._id)}>
                                        Delete
                                    </button>
                                </div>                                      
                            </div>
                        );

                    })}
                </div>
            </div> 
        )
    }
}

export class AdminCategories extends Component {

    action(type, id) {

        // e.preventDefault();

        console.log(type, id);

        if (type === 'DELETE_CAT') {

            this.props.deleteCategory(id);
            
            setTimeout(
                function() {
                    this.props.getAllCategories();
                }
                .bind(this),
                250
            );
        }
    }

    render() {
        return (
            <div className="js-admin_container l-admin_container l-admin_categories">
                        
                <h2>Categories</h2>
            
                <div class="l-admin_component">

                    { this.props.categories.map( (category) => {      
                        
                        return (

                            <div class="l-admin_component_item">                                        
                                <div class="l-admin_item_info">
                                    <div class="l-category_info_name">
                                        { category.categoryName }
                                    </div>
                                </div>
                                
                                <div class="l-admin_item_actions">                                   
                                    <button className="btn btn-remove" onClick={this.action.bind(this, 'DELETE_CAT', category._id)}>
                                        Delete
                                    </button>
                                </div>                                      
                            </div>
                        );

                    })}
                </div>
            </div>
        )
    }
}

export class AdminPosts extends Component {

    action(type, id) {

        console.log(type, id);

        if (type === 'PUBLISH_POST' || type === 'UNPUBLISH_POST' || type === 'DELETE_POST') {

            if      (type === 'PUBLISH_POST')   this.props.publishPost(id);
            else if (type === 'UNPUBLISH_POST') this.props.unpublishPost(id);  
            else if (type === 'DELETE_POST')    this.props.deletePost(id);  
            

            // setTimeout(
            //     function() {
            //         this.props.getAllPosts();
            //     }
            //     .bind(this),
            //     250
            // );
        }
    }

    render() {
        return (
            <div className="js-admin_container is-active l-admin_container l-admin_posts">
                        
                <h2>Posts</h2>
            
                <div className="l-admin_component">

                    { this.props.posts.map( (post) => {      
                        
                        return (

                            <div className={ "l-admin_component_item" + (post.published ? " l_post_published" : "") }>
                                <div className="l-admin_item_info">
                                    <div className="l-post_info_category">{ post.categoryName }</div>
                                    <div className="l-post_info_title">
                                        <a href={ "/posts/id/" + post._id} target="_blank">{ post.title }</a>
                                    </div>
                                    <div className="l-post_info_author">Written by { post.authorName }</div>
                                </div>
                                
                                <div className="l-admin_item_actions">           
                                    { post.published ?                                  
                                        <button className="btn btn-unpublish" onClick={this.action.bind(this, 'UNPUBLISH_POST', post._id)}>
                                            Unpublish
                                        </button>
                                        :       
                                        <button className="btn btn-publish" onClick={this.action.bind(this, 'PUBLISH_POST', post._id)}>
                                            Publish
                                        </button>   
                                    }        
                                    <button className="btn btn-remove" onClick={this.action.bind(this, 'DELETE_POST', post._id)}>
                                        Remove
                                    </button>   
                                </div>                                      
                            </div>
                        );

                    })}
                </div>
            </div> 
        )
    }
}



AdminUsers.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
}

AdminCategories.propTypes = {
    deleteCategory: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired
}


AdminPosts.propTypes = {
    deletePost: PropTypes.func.isRequired,
    publishPost: PropTypes.func.isRequired,
    unpublishPost: PropTypes.func.isRequired,
    getAllPosts: PropTypes.func.isRequired
}



// function mapStateToProps(state) {
// }

// export default connect(null, { deleteUser } )(AdminUsers);
// export default connect(null, { deleteCategory } )(AdminCategories);
// export default connect(null, { deletePost,publishPost,unpublishPost } )(AdminPosts);

export default {
    AdminUsers: connect(null, { deleteUser, getAllUsers })(AdminUsers), // null : mapStateToProps
    AdminCategories: connect(null, { deleteCategory, getAllCategories })(AdminCategories),
    AdminPosts: connect(null, { deletePost, publishPost, unpublishPost, getAllPosts })(AdminPosts)
}