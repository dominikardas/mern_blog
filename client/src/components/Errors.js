import React, { Component } from 'react';

export class Errors extends Component {
    
    render() {

        console.log(this.props.errors); 
        
        let errors;
        if (this.props.errors) {
            console.log(this.props.errors);
            errors = this.props.errors.map(error => {
                        return <div>{error.msg}</div>;
                    });
        }
            
        return (
            <div className="l-form-errors">
                { errors }
            </div>
        )
    }
}

export default Errors;
