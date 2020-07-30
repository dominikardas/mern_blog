import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { logout } from '../../../actions/authActions';

export class Logout extends Component {
    render() {
        return (
            <React.Fragment>
                <a onClick={this.props.logout} href="#">Logout</a>
            </React.Fragment>
        )
    }
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout);
