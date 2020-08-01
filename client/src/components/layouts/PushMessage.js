import React, { Component } from 'react';

export class PushMessage extends Component {
    
    render() {

        return (
            <div key={Math.random()} id="push-message">
                { this.props.msg }
            </div>
        )
    }
}

export default PushMessage;
