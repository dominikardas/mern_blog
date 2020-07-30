import React, { Component } from 'react';

import Posts from './posts/PostsPreview';

export class Category extends Component {
    render() {
        const { categoryName } = this.props.match.params;
        return (
            <div className="c-container-content">
                <Posts category={ categoryName } />
            </div>
        )
    }
}

export default Category;
