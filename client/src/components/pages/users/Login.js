import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { login } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

import Errors from '../../Errors';

export class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = { array: [] };
    }

    componentDidUpdate(prevProps) {

        const { error } = this.props;

        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            }
            else {
                this.setState({ msg: null });
            }
        }

        if (this.props.isAuthenticated)
            return <Redirect to="/" />

    }

    onSubmit = (e) => {

        e.preventDefault();

        this.props.clearErrors();

        if (!this.state) return;

        const { username, password } = this.state;

        // Create a user obj
        const user = {
            username,
            password
        };

        // console.log(newUser);

        // Attempt to register
        this.props.login(user);
    }

    onChange = (e) => {
        this.setState( { [e.target.name]: e.target.value} );
    }

    render() {
        
        if (this.props.isAuthenticated)
            return <Redirect to="/" />

        let errors;
        if (this.props.errors.validationErrors) {
            errors = <Errors errors={this.props.errors.validationErrors} />
        }
        
        return (
            
            <div className="c-container-content">

                <div className="l-form-container l-form-login">
                    <form onSubmit={this.onSubmit} className="l-form">

                        <h1>Log In</h1>
                        
                        { errors }

                        <div className="l-form_input">
                            <span class="ico-ui-user ico-1x"></span>
                            <input onChange={this.onChange} type="text" name="username" placeholder="Username" />
                        </div>
                        <div className="l-form_input">
                            <span class="ico-ui-password ico-1x"></span>
                            <input onChange={this.onChange} type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="l-form_input">
                            <input type="submit" name="submit" value="Login" class="btn-login" />
                        </div>
                    </form>
                    <a href="/users/register">Don't have an account? Register here!</a>
                </div>
                
            </div>
        )
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.errors
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
