import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getPosts, getPostsByCategory } from '../../../actions/postActions';
import PropTypes from 'prop-types';

import moment from 'moment';

import PaginationExt from '../../layouts/PaginationExt';

export class PostsPreview extends Component {
    
    constructor(props) {
        super(props);
        this.state = { activePage: 1 }

        document.title = this.props.category ? this.props.category + ' - MERN Blog' : 'All Posts - MERN Blog';
    }

    componentDidMount() {

        if (this.props.category)
            this.props.getPostsByCategory(this.props.category, this.state.activePage);
        else
            this.props.getPosts();
    }

    render() {

        let pagination;
        if (!this.props.loading) {
            if (this.props.postsPerPage && this.props.postsCount) {            
                pagination = <PaginationExt 
                                itemsPerPage={this.props.postsPerPage}
                                totalItems={this.props.postsCount}
                                action={this.props.category ? this.props.getPostsByCategory : this.props.getPosts}
                                category={this.props.category}
                             />
            }
        }
        return (            
            <React.Fragment>
            <div className="c-container-posts">
                { this.props.posts.map( ({ _id, postImage, tags, title, authorName, publishedAt, slug } ) => (
                    <div className="l-post-preview" key={_id}>

                        <a href={"/post/" + slug}>
                            <div>

                            <div className="l-post-preview_image">
                                <span>
                                    <img loading="lazy" alt="Not Found" src={postImage} onError={(e)=>{e.target.onerror = null; e.target.src='/assets/img/not-found.png'}} />
                                </span>
                            </div>

                            <div className="l-post-preview_desc">

                                {/* <div className="l-desc-tags">
                                    {tags.map((tag, i) => {
                                        return ( <span key={i} className={"l-tag l-tag-" + tag}>{tag}</span> );
                                    })}
                                </div> */}

                                <div className="l-desc-title">
                                    {title}
                                </div>

                                <div className="l-desc-details">
                                    <div>By <span className="l-details_author">{authorName}</span></div>
                                    &nbsp;:&nbsp;
                                    <div className="l-details_published">{ moment(publishedAt).format('DD.MM.yyyy') }</div>
                                </div>

                            </div>

                        </div>
                        </a>
                    </div>
                ))}
            </div>
            {pagination}
            </React.Fragment>
        )
    }
}

PostsPreview.propTypes = {
    getPosts: PropTypes.func.isRequired,
    getPostsByCategory: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,

    postsPerPage: PropTypes.number.isRequired,
    postsCount: PropTypes.number.isRequired
}

// const mapStateToProps = (state) => ({
//     posts: state.posts.posts
// });

function mapStateToProps(state) {
    if (state.posts.posts !== null && state.postsPerPage !== null && state.postsCount !== null) {
        return {
            posts: state.posts.posts,
            postsPerPage: state.posts.postsPerPage,
            postsCount: state.posts.postsCount,
            loading: false
        };
    }
    else {
        return {
            loading: false
        };
    }
}


export default connect(mapStateToProps, { getPosts, getPostsByCategory })(PostsPreview);
