import React, { Component } from 'react';

import Posts from './posts/PostsPreview';

export class Category extends Component {
    render() {
        let { categoryName } = this.props.match.params;
        categoryName = categoryName[0].toUpperCase() + categoryName.toLowerCase().slice(1);
        return (
            <div className="c-container-content">
                <Posts category={ categoryName } />
            </div>
        )
    }
}

export default Category;
