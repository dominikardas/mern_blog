import React, { Component } from 'react';

export class PushMessage extends Component {
    
    render() {

        return (
            <div id="push-message">
                { this.props.msg }
            </div>
        )
    }
}

export default PushMessage;
