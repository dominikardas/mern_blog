import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts, getPostsByCategory } from '../../../actions/postActions';
import PropTypes from 'prop-types';

export class PostsPreview extends Component {
    
    componentDidMount() {

        if (this.props.category)
            this.props.getPostsByCategory(this.props.category);
        else
            this.props.getPosts();
    }

    render() {

        // const { posts } = this.props.item;

        return (            
            <React.Fragment>
            <div className="c-container-posts">
                { this.props.posts.map( ({ _id, postImage, tags, title, authorName, publishedAt, slug } ) => (
                    <div className="l-post-preview" key={_id}>

                        <a href={"/post/" + slug}>
                            <div>

                            <div className="l-post-preview_image">
                                <span>
                                    <img loading="lazy" alt="Image not found" src={postImage} />
                                </span>
                            </div>

                            <div className="l-post-preview_desc">

                                <div className="l-desc-tags">
                                    {tags.map((tag, i) => {
                                        return ( <span key={i} className={"l-tag l-tag-" + tag}>{tag}</span> );
                                    })}
                                </div>

                                <div className="l-desc-title">
                                    {title}
                                </div>

                                <div className="l-desc-details">
                                    <div>By <span className="l-details_author">{authorName}</span></div>
                                    &nbsp;:&nbsp;
                                    <div className="l-details_published">{publishedAt}</div>
                                </div>

                            </div>

                        </div>
                        </a>
                    </div>
                ))}
            </div>
            </React.Fragment>
        )
    }
}

PostsPreview.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    posts: state.posts.posts
});

export default connect(mapStateToProps, { getPosts, getPostsByCategory })(PostsPreview);
