import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Logout from '../pages/users/Logout';
import { getAllCategories } from '../../actions/categoryActions';

export class Header extends Component {

    componentDidMount() {
        this.props.getAllCategories();
    }

    toggleMenu = (e) => {
        document.querySelector('.l-navbar').classList.toggle('is-active');
    }

    render() {

        let isAuthenticated, user, isAdmin;
        if (this.props.auth) {
            isAuthenticated = this.props.auth.isAuthenticated;
            user = this.props.auth.user;
            isAdmin = (user !== null && user.isAdmin);
        }
        // const { isAuthenticated, user } = this.props.auth;
        // var isAdmin = (user !== null && user.isAdmin);

        const authLinks = (
            <React.Fragment>
                <li>
                    <span>User Panel</span>

                    <ul className="submenu">
                        <li>
                            <a href="/designer">Create post</a>
                        </li>
                        <li>
                            <a href="#">Settings</a>
                        </li>
                        <li>
                            <Logout />
                        </li>
                    </ul>
                </li>
            </React.Fragment>
        ); 

        const guestLinks = (
            <React.Fragment>  
                <li>
                    <a href="/users/login" className="btn btn-navbar btn-login">Sign In</a>
                </li>
            </React.Fragment>
        );

        const adminLinks = (
            <React.Fragment>   
                <li>             
                    <a href="/admin">Admin Panel</a>
                </li>
            </React.Fragment>
        );

        return (
            <div className="c-container-header">
                <nav className="l-header">
                    <a href="/"><img src="/logo.png" className="l-logo" /></a>
                    <div className="l-navbar">
                        <ul>
                            { !this.props.loading ?
                                this.props.categories.map( (category) => {
                                    return (
                                        <li key={ category._id }>
                                            <a href={ "/category/" + category.categoryURI }>{category.categoryName}</a>
                                        </li>
                                    )
                                }) : null
                            }
                            { isAdmin ? adminLinks : null }
                            { isAuthenticated ? authLinks : guestLinks }
                        </ul>
                    </div>
                    { isAuthenticated ? <span className="l-name">Welcome {user.username}!</span> : <span></span>  }
                    <div className="l-menu-btn"><button onClick={this.toggleMenu}><span className="ico-navigation-menu ico-3x"></span></button></div>
                </nav>
            </div>
        )
    }
}

Header.propTypes = {
    auth: PropTypes.object,
    categories: PropTypes.array,

    getAllCategories: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    if (state.auth !== null && state.categories.categories !== null) {
        return {            
            auth: state.auth,
            categories: state.categories.categories,
            loading: false
        };
    }
    else {
        return {
            loading: true
        }
    }
}

export default connect(mapStateToProps, { getAllCategories })(Header);
