import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { getAllUsers, deleteUser } from '../../../../actions/authActions';
import { createCategory, getAllCategories, deleteCategory } from '../../../../actions/categoryActions';
import { getAllPosts, publishPost, unpublishPost, deletePost } from '../../../../actions/postActions';

import PaginationExt from '../../../layouts/PaginationExt';

export class AdminUsers extends Component {

    action(type, id) {
        if (type === 'DELETE_USER') this.props.deleteUser(id);
    }

    render() {

        let pagination;
        if (!this.props.loading) {
            if (this.props.usersPerPage && this.props.usersCount) {            
                pagination = <PaginationExt 
                                itemsPerPage={this.props.usersPerPage}
                                totalItems={this.props.usersCount}
                                action={this.getAllUsers}
                             />
            }
        }
        return (
            <div className="js-admin_container l-admin_container l-admin_users">
                        
                <h2>Users</h2>
            
                <div className="l-admin_component">

                    { this.props.users.map( (user) => {      
                        
                        return (

                            <div key={ user._id } className="l-admin_component_item">                                        
                                <div className="l-admin_item_info">
                                    <div className="l-user_info_isAdmin">
                                        { user.isAdmin ?
                                            'Site Admin'
                                            :
                                            'User'
                                        }
                                    </div>
                                    <div className="l-user_info_name">{ user.name }</div>
                                    <div className="l-user_info_username">{ user.username }</div>
                                </div>
                                
                                <div className="l-admin_item_actions">                                  
                                    <button className="btn btn-remove" onClick={this.action.bind(this, 'DELETE_USER', user._id)}>
                                        Delete
                                    </button>
                                </div>                                      
                            </div>
                        );

                    })}
                </div>
                {pagination}
            </div> 
        )
    }
}

export class AdminCategories extends Component {

    action(type, id) {
        console.log(type, id);
        if (type === 'DELETE_CAT')  this.props.deleteCategory(id);
    }

    submitNewCategory = (e) => {

        e.preventDefault();

        const { categoryName } = this.state;
        const newCategory = { categoryName };
        this.props.createCategory(newCategory);
        console.log(newCategory);
    }    

    onChange = (e) => {
        this.setState( { [e.target.name]: e.target.value} );
    }

    render() {
        return (
            <div className="js-admin_container l-admin_container l-admin_categories">
                        
                <h2>Categories</h2>

                <div className="l-extended-content">
                    <button className="btn btn-add" onClick={ this.props.toggleExtendedContent.bind(this) }>
                        <span className="ico-ui-add"></span>
                        Create Category
                    </button>
                    <div>
                        <form className="l-form-admin" onSubmit={(e) => this.submitNewCategory(e)}>
                            <div className="l-form-admin_input">
                                <label htmlFor="categoryName">Category Name</label>
                                <input onChange={this.onChange} id="categoryName" type="text" name="categoryName" />
                            </div>
                            <button type="submit" className="btn btn-submit">Submit</button>
                        </form>
                    </div>
                </div>
            
                <div className="l-admin_component">

                    { this.props.categories.map( (category) => {      
                        
                        return (

                            <div key={ category._id } className="l-admin_component_item">                                        
                                <div className="l-admin_item_info">
                                    <div className="l-category_info_name">
                                        { category.categoryName }
                                    </div>
                                </div>
                                
                                <div className="l-admin_item_actions">                                   
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
        }
    }

    render() {

        let pagination;
        if (!this.props.loading) {
            if (this.props.postsPerPage && this.props.postsCount) {
                pagination = <PaginationExt 
                                itemsPerPage={this.props.postsPerPage} 
                                totalItems={this.props.postsCount} 
                                action={this.props.getAllPosts}
                             />                
            }
        }
        return (
            <div className="js-admin_container is-active l-admin_container l-admin_posts">
                        
                <h2>Posts</h2>

                <a href="/designer" target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-add">
                        <span className="ico-ui-add"></span>
                        Create Post
                    </button>
                </a>
            
                <div className="l-admin_component">

                    { this.props.posts.map( (post) => {      
                        
                        return (

                            <div key={ post._id } className={ "l-admin_component_item" + (post.published ? " l_post_published" : "") }>
                                <div className="l-admin_item_info">
                                    <div className="l-post_info_category">{ post.categoryName }</div>
                                    <div className="l-post_info_title">
                                        <a href={ "/posts/id/" + post._id} target="_blank" rel="noopener noreferrer">{ post.title }</a>
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
                {pagination}
            </div> 
        )
    }
}

AdminUsers.propTypes = {
    deleteUser: PropTypes.func.isRequired,
    getAllUsers: PropTypes.func.isRequired
}

AdminCategories.propTypes = {
    createCategory: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
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

function mapStateToPropsUsers(state) {
    if (state.auth.users !== null && state.auth.usersCount !== null && state.auth.usersPerPage !== null) {
        return {
            usersCount: state.auth.usersCount,
            usersPerPage: state.auth.usersPerPage,
            loading: false
        };
    }
    else {
        return {
            loading: true
        }
    }
}

function mapStateToPropsPosts(state) {
    if (state.posts !== null && state.posts.postsCount !== null && state.posts.postsPerPage !== null) {
        return {
            postsCount: state.posts.postsCount,
            postsPerPage: state.posts.postsPerPage,
            loading: false
        };
    }
    else {
        return {
            loading: true
        };
    }
}

export default {
    AdminUsers: connect(mapStateToPropsUsers, { deleteUser, getAllUsers })(AdminUsers),
    AdminCategories: connect(null, { createCategory, deleteCategory, getAllCategories })(AdminCategories),
    AdminPosts: connect(mapStateToPropsPosts, { deletePost, publishPost, unpublishPost, getAllPosts })(AdminPosts)
}