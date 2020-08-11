import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

export class Settings extends Component {

    saveUserInfo = (e) => {

    }

    changePassword = (e) => {

    }

    render() {
        return (
            <div className="c-container-content">
                <div className="c-container-settings">
                    <h1>Account Settings</h1>
                    <div className="l-form-settings">
                        <div className="l-form-settings_col">
                            <h3>User Info</h3>
                            <form>                        
                                <div className="l-form_input">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" />
                                </div>
                                <div className="l-form_input">
                                    <label htmlFor="username">Username</label>
                                    <input type="username" name="username" />                            
                                </div>
                                <button type="submit" className="btn btn-save">Save</button>
                            </form>                            
                        </div>
                        <div className="l-form-settings_col">
                            <h3>Change Password</h3>
                            <form>    
                                <div className="l-form_input">
                                    <label htmlFor="old_password">Old Password</label>
                                    <input type="password" name="old_password" />
                                </div>        
                                <div className="l-form_input">
                                    <label htmlFor="name">New Password</label>
                                    <input type="password" type="new_password" />
                                </div>
                                <button type="submit" className="btn btn-change">Change Password</button>
                            </form>
                        </div>   
                    </div>             
                </div>
            </div>
        )
    }
}

export default Settings;
