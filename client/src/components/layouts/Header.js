import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import Logout from '../pages/users/Logout';

export class Header extends Component {

    componentDidMount() {     

    }

    render() {

        const { isAuthenticated, user } = this.props.auth;
        var isAdmin = (user !== null && user.isAdmin);

        const authLinks = (
            <React.Fragment>
                <li>
                    <a href="/designer">Create post</a>
                </li>
                <li>
                    <Logout />
                </li>
            </React.Fragment>
        ); 

        const guestLinks = (
            <React.Fragment>  
                <li>
                    <a href="/users/login" className="btn btn-navbar btn-login">Sign In</a>
                </li> 
                {/* <li>
                    <a href="/users/register" className="btn btn-navbar btn-register">Register</a>
                </li> */}
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
                    <ul>
                        <li>
                            <a href="/category/news">News</a>
                        </li>
                        <li>
                            <a href="/category/lifestyle">Lifestyle</a>
                        </li>
                        <li>
                            <a href="/category/bussiness">Bussiness</a>
                        </li>
                        <li>
                            <a href="/category/tech">Tech</a>
                        </li>
                        { isAdmin ? adminLinks : null }
                        { isAuthenticated ? authLinks : guestLinks }
                        {/* <li>
                            { isAuthenticated ? <span className="l-name">Welcome {user.username}!</span> : <span></span>  }
                        </li> */}
                    </ul>
                    { isAuthenticated ? <span className="l-name">Welcome {user.username}!</span> : <span></span>  }
                    {/* <img src="/logo.png" className="l-user-logo" /> */}
                    <div className="l-menu-btn"><span className="ico-navigation-menu ico-3x"></span></div>
                </nav>
            </div>
        )
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Header);
