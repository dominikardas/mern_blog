import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { register } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';

import Errors from '../../Errors';

export class Register extends Component {
    
    constructor(props) {
        super(props);
        this.state = { array: [] };
    }

    componentDidMount() {
        document.title = 'Register - MERN Blog';
    }

    componentDidUpdate(prevProps) {

        const { error } = this.props;

        if (error !== prevProps.error) {
            // Check for register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            }
            else {
                this.setState({ msg: null });
            }
        }
    }

    onSubmit = (e) => {

        e.preventDefault();

        this.props.clearErrors();

        if (!this.state) return;

        const { name, username, password, password_r } = this.state;

        // Create a user obj
        const newUser = {
            name,
            username,
            password,
            password_r
        };

        console.log(newUser);

        // Attempt to register
        this.props.register(newUser);
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

                <div className="l-form-container l-form-register">
                    <form onSubmit={this.onSubmit} className="l-form">
                        <h1>Register</h1>

                        { errors }

                        <div className="l-form_input">
                            <label htmlFor="name">Full Name</label>
                            <input onChange={this.onChange} type="text" name="name" />
                        </div>

                        <div className="l-form_input">
                            {/* <span class="ico-ui-user ico-1x"></span> */}
                            <label htmlFor="name">Username</label>
                            <input onChange={this.onChange} type="text" name="username" />
                        </div>

                        <div className="l-form_input">
                            {/* <span class="ico-ui-password ico-1x"></span> */}
                            <label htmlFor="name">Password</label>
                            <input onChange={this.onChange} type="password" name="password" />
                        </div>

                        <div className="l-form_input">
                            <label htmlFor="name">Repeat password</label>
                            <input onChange={this.onChange} type="password" name="password_r" />
                        </div>

                        <div className="l-form_input">
                            <button type="submit" class="btn btn-register">Register</button>
                        </div>
                    </form>
                    <a href="/users/login">Already have an account? Login here!</a>
                </div>
                
            </div>
        )
    }
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.errors
});

export default connect(mapStateToProps, { register, clearErrors })(Register);


