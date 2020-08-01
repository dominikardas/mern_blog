import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { submitPost } from '../../../actions/postActions';
import { getAllCategories } from '../../../actions/categoryActions';

export class Designer extends Component {

    constructor(props) {
        super(props);
        this.state = { category: 'News' };
    }

    componentDidMount() {
        this.props.getAllCategories();
        document.title = 'Post Designer - MERN Blog';

        if (!this.props.loading) {
            // console.log(this.props.categories);
            // this.setState({ category: this.props.categories[0].categoryName });
        }
    }

    contentEditableAction = (action) => {

        // e.preventDefault();

        console.log(action);

        if (action === 'h1' || action === 'h2' || action === 'h3') {
            document.execCommand('formatBlock', false, action);
        }
        else if (action === 'createlink') {
            var url = prompt('Enter the link here: ', 'http://');
            document.execCommand(action, false, url);
        }
        else {
            document.execCommand(action, false, null);
        }
    }

    submitPost = (e) => {

        e.preventDefault();
        console.log("posting");

        /*
        !data.title     || !data.slug       || !data.smallDesc || !data.content || 
        !data.postImage || !data.authorName || !data.categoryName
        */

        var tags = [];

        if (this.state.tags !== undefined && this.state.tags !== '') {
            tags = this.state.tags.split(',');
            tags.forEach((tag, index, tags) => tags[index] = tag.trim());    
            console.log(tags);
        }

        const newPost = {
            title: this.state.title,
            content: document.getElementById('content_editable').innerHTML,
            postImage: 'test',
            authorName: this.props.auth.user.name,
            categoryName: this.state.category,
            tags
        }

        console.log(newPost);

        this.props.submitPost(newPost);
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        if (!this.props.loading) {
            if (this.props.auth) {
                if (!this.props.auth.isAuthenticated ||
                    this.props.auth.user === 'NO_USER')
                    return <Redirect to="/" />
            }
        }
        else {
            return <div></div>
        }          

        return (
            <div className="c-container-content">
                <div className="c-container-designer">
    
                    <form className="l-form-designer" onSubmit={ this.submitPost }>

                        <div className="l-post-content_input">
                                {/* <label for="content">Post Content</label> */}

                                <div className="l-designer_buttons">
                                    <div className="l-buttons-undo">
                                        <a onClick={this.contentEditableAction.bind(this, 'undo')} title="Undo"><span className="ico ico-undo ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'redo')} title="Redo"><span className="ico ico-redo ico-l"></span></a>
                                    </div>

                                    <div className="l-buttons-text">
                                        <a onClick={this.contentEditableAction.bind(this, 'bold')} title="Bold"><span className="ico ico-bold ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'italic')} title="Italic"><span className="ico ico-italic ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'underline')} title="Underline"><span className="ico ico-underline ico-l"></span></a>
                                    </div>

                                    <div className="l-buttons-links">
                                        <a onClick={this.contentEditableAction.bind(this, 'createlink')} title="Create link"><span className="ico ico-link ico-l"></span></a>
                                    </div>

                                    <div className="l-buttons-align">
                                        <a onClick={this.contentEditableAction.bind(this, 'justifyLeft')} title="Align left"><span className="ico ico-align-left ico-l"></span></a> 
                                        <a onClick={this.contentEditableAction.bind(this, 'justifyCenter')} title="Align center"><span className="ico ico-align-center ico-l"></span></a> 
                                        <a onClick={this.contentEditableAction.bind(this, 'justifyRight')} title="Align right"><span className="ico ico-align-right ico-l"></span></a>
                                    </div>

                                    <div className="l-buttons-lists">
                                        <a onClick={this.contentEditableAction.bind(this, 'insertUnorderedList')} title="Unordered list"><span className="ico ico-listing-number ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'insertOrderedList')} title="Ordered list"><span className="ico ico-listine-dots ico-l"></span></a>
                                    </div>

                                    <div className="l-buttons-headers">
                                        <a onClick={this.contentEditableAction.bind(this, 'h1')} title="Header 1"><span className="ico ico-heading ico-lg"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'h2')}  title="Header 2"><span className="ico ico-heading ico-md"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'h3')}  title="Header 3"><span className="ico ico-heading ico-x1"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'p')} title="Paragraph"><span className="ico ico-paragraph ico-l"></span></a>
                                    </div>
                                </div>

                                <div className="l-designer_input">
                                    {/* <label for="title">Post Title</label> */}
                                    <input onChange={this.onChange} id="title" name="title" placeholder="Post Title" />
                                </div>
                        
                                <div id="content_editable" className="l-content_editable" name="content" contentEditable="true"></div>
                        </div>               

                        <div className="l-post-settings_input">

                            <div className="l-designer_input">
                                    <label htmlFor="submit">Category</label>
                                    {/* <label for="category">Post Category</label> */}
                                    <select onChange={this.onChange} value={this.state.category} id="category" name="category">
                                        { this.props.categories.map( (category) => {
                                            return (
                                                <option key={category._id} value={category.categoryName}>{category.categoryName}</option>
                                            );
                                        })}
                                    </select>
                            </div>

                            <div className="l-designer_input">
                                <label htmlFor="tags">Tags</label>
                                <input onChange={this.onChange} id="tags" type="text" name="tags" />
                            </div>

                            <div className="l-designer_input">
                                <button type="submit" name="submit" value="Submit post" className="btn btn-login">Submit Post</button>                            
                            </div>  
                        </div>                  
                    </form>
                
                </div>
            </div>
        )
    }
}

Designer.propTypes = {

    loading: PropTypes.bool.isRequired,

    auth: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,

    submitPost: PropTypes.func.isRequired,
    getAllCategories: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    if (state.auth.user !== null && state.categories.categories != null) {
        return {
            auth: state.auth,
            categories: state.categories.categories,
            loading: false
        };
    }
    else{
        return {
            loading: true
        };
    }
}

export default connect(mapStateToProps, 
    { submitPost,
      getAllCategories,
    }
)(Designer);