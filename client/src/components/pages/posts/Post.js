import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPostBySlug, getPostById } from '../../../actions/postActions';
import PropTypes from 'prop-types';

export class Post extends Component {

    componentDidMount() {

        const { slug } = this.props.match.params;
        const { id } = this.props.match.params;

        if (slug)
            this.props.getPostBySlug(slug);
        else if (id)
            this.props.getPostById(id);

        // document.title = this.props.posts.posts.title + ' - MERN Blog';
    }
    
    createMarkup(html) {
        return {__html: html};
    }

    render() {

        const { posts } = this.props.posts;

        console.log(posts);

        return (
            <div className="c-container-content">                
                { posts.map( ({  _id, postImage, tags, title, authorName, publishedAt, content  }) => (
                    <div key={_id} className="c-container-post">
                        <div className="l-post-container">

                            <div className="l-post_title">{title}</div>

                            <div className="l-post-info">  
                                <div className="l-info_author">{authorName}</div>
                                <div className="l-info_date">{publishedAt}</div>
                            </div>

                            <div>
                                <span>
                                    <img loading="lazy" alt="..." src={postImage} />
                                </span>
                            </div>

                            {/* <div className="l-post-content">
                                {content}
                            </div> */}
                            <div dangerouslySetInnerHTML={this.createMarkup(content)} className="l-post-content" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

Post.propTypes = {
    getPostBySlug: PropTypes.func.isRequired,
    getPostById: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    posts: state.posts
});

export default connect(mapStateToProps, { getPostBySlug, getPostById })(Post);
