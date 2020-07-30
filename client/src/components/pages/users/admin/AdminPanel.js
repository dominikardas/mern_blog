import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import PushMessage from '../../../layouts/PushMessage';

import { getAllUsers } from '../../../../actions/authActions';
import { getAllCategories } from '../../../../actions/categoryActions';
import { getAllPosts } from '../../../../actions/postActions';

import AdminPages from './AdminPages';

export class AdminPanel extends Component {
    
    componentDidMount() {
        this.props.getAllUsers();
        this.props.getAllCategories();
        this.props.getAllPosts();
    }

    toggleContent = (e) => {

        e.preventDefault();

        // List Item        
        const a = '.js-btn-admin_cats';
        const a_arr = [...document.querySelectorAll(a)];
        a_arr.forEach((a) => { a.closest('li').classList.remove('is-active'); })
        e.target.closest('li').classList.add('is-active');    // Current Item

        // Content
        const target_c = '.l-admin_' + e.target.getAttribute('data-href');
        const c = '.js-admin_container';
        const c_arr = [...document.querySelectorAll(c)];
        c_arr.forEach((t) => { t.classList.remove('is-active'); })
        document.querySelector(target_c).classList.add('is-active');
    }

    render() {

        if (!this.props.loading) {
            if (this.props.auth) {
                if (!this.props.auth.isAuthenticated ||
                    this.props.auth.user === 'NO_USER' ||
                    !this.props.auth.user.isAdmin)
                    return <Redirect to="/" />
            }
        }
        else {
            return <div></div>
        }

        let users, categories, posts, msg;
        if (this.props.users) {
            users = <AdminPages.AdminUsers users={this.props.users}/>;
        }
        if (this.props.categories) {
            categories = <AdminPages.AdminCategories categories={this.props.categories} />;
        }
        if (this.props.posts) {
            posts = <AdminPages.AdminPosts posts={this.props.posts} />;
        }
        if (this.props.msg) {
            msg = <PushMessage msg={this.props.msg} />
        }

        return (
            <div className="c-container-admin">

                { msg }

                <div className="l-admin_panel">
                    <div className="l-admin_panel_nav">
                        <nav className="l-admin_panel_nav">
                            <ul>
                                <li>
                                    <span className="ico-users-alt-3 ico-2x"></span>
                                    <a className="js-btn-admin_cats" data-href="users" onClick={ this.toggleContent }>Users</a>
                                </li>
                                <li>
                                    <span className="ico-sort ico-2x"></span>
                                    <a className="js-btn-admin_cats" data-href="categories" onClick={ this.toggleContent.bind(this) }>Categories</a>
                                </li>
                                <li className="is-active">
                                    <span className="ico-page ico-2x"></span>
                                    <a className="js-btn-admin_cats" data-href="posts" onClick={ this.toggleContent.bind(this) }>Posts</a>
                                </li>
                            </ul>
                        </nav>
                    </div>                            
                </div>

                <div className="l-admin_panel_content">
                    {users}
                    {categories}
                    {posts}
                </div>
            </div>    
        )
    }
}

AdminPanel.propTypes = {

    loading: PropTypes.bool.isRequired,
    auth: PropTypes.object.isRequired,

    users: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    posts: PropTypes.array.isRequired,

    getAllUsers: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
    getAllPosts: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    if (state.auth !== null && state.auth.users !== null && 
        state.categories.categories != null && state.posts.posts !== null) {
        return {
            auth: state.auth,
            users: state.auth.users,
            categories: state.categories.categories,
            posts: state.posts.posts,
            msg: state.errors.msg,
            loading: false
        };
    }
    else{
        return {
            loading: true
        };
    }
}

export default connect(mapStateToProps, 
    { getAllUsers,
      getAllCategories,
      getAllPosts
    }
)(AdminPanel);
