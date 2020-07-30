import React, { Component } from 'react';

import PostsPreview from './posts/PostsPreview';

export class Homepage extends Component {   

    render() {
        return (
            <div className="c-container-content">
                <PostsPreview />
            </div>
        )
    }
}

export default Homepage;
