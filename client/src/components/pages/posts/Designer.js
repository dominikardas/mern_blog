import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { submitPost } from '../../../actions/postActions';
import { getAllCategories } from '../../../actions/categoryActions';

export class Designer extends Component {

    componentDidMount() {
        this.props.getAllCategories();

        document.title = 'Post Designer - MERN Blog';
    }

    contentEditableAction = (action) => {

        console.log(action);
        if (action == 'h1' || action == 'h2' || action == 'h3') {
            document.execCommand('formatBlock', false, action);
        }
        else if (action == 'createlink') {
            var url = prompt('Enter the link here: ','http:\/\/');
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

        const newPost = {
            title: document.getElementById('title').value,
            smallDesc: 'test',
            content: document.getElementById('content_editable').innerHTML,
            postImage: 'test',
            authorName: this.props.auth.user.name,
            categoryName: document.getElementById('category').value,
            tags: ['News', 'Tech']
        }

        this.props.submitPost(newPost);
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
                                    <div class="l-buttons-undo">
                                        <a onClick={this.contentEditableAction.bind(this, 'undo')} title="Undo"><span class="ico ico-undo ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'redo')} title="Redo"><span class="ico ico-redo ico-l"></span></a>
                                    </div>

                                    <div class="l-buttons-text">
                                        <a onClick={this.contentEditableAction.bind(this, 'bold')} title="Bold"><span class="ico ico-bold ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'italic')} title="Italic"><span class="ico ico-italic ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'underline')} title="Underline"><span class="ico ico-underline ico-l"></span></a>
                                    </div>

                                    <div class="l-buttons-links">
                                        <a onClick={this.contentEditableAction.bind(this, 'createlink')} title="Create link"><span class="ico ico-link ico-l"></span></a>
                                    </div>

                                    <div class="l-buttons-align">
                                        <a onClick={this.contentEditableAction.bind(this, 'justifyLeft')} title="Align left"><span class="ico ico-align-left ico-l"></span></a> 
                                        <a onClick={this.contentEditableAction.bind(this, 'justifyCenter')} title="Align center"><span class="ico ico-align-center ico-l"></span></a> 
                                        <a onClick={this.contentEditableAction.bind(this, 'justifyRight')} title="Align right"><span class="ico ico-align-right ico-l"></span></a>
                                    </div>

                                    <div class="l-buttons-lists">
                                        <a onClick={this.contentEditableAction.bind(this, 'insertUnorderedList')} title="Unordered list"><span class="ico ico-listing-number ico-l"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'insertOrderedList')} title="Ordered list"><span class="ico ico-listine-dots ico-l"></span></a>
                                    </div>

                                    <div class="l-buttons-headers">
                                        <a onClick={this.contentEditableAction.bind(this, 'h1')} title="Header 1"><span class="ico ico-heading ico-lg"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'h2')}  title="Header 2"><span class="ico ico-heading ico-md"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'h3')}  title="Header 3"><span class="ico ico-heading ico-x1"></span></a>
                                        <a onClick={this.contentEditableAction.bind(this, 'p')} title="Paragraph"><span class="ico ico-paragraph ico-l"></span></a>
                                    </div>
                                </div>

                                <div className="l-designer_input">
                                    {/* <label for="title">Post Title</label> */}
                                    <input id="title" name="title" placeholder="Post Title" />
                                </div>
                        
                                <div id="content_editable" class="l-content_editable" name="content" contentEditable="true"></div>
                        </div>               

                        <div className="l-post-settings_input">

                            <div className="l-designer_input">
                                    <label for="submit">Category</label>
                                    {/* <label for="category">Post Category</label> */}
                                    <select id="category" name="category">
                                        { this.props.categories.map( (category) => {
                                            return (
                                                <option value={category.categoryName}>{ category.categoryName }</option>
                                            );
                                        })}
                                    </select>
                            </div>

                            <div className="l-designer_input">
                                <button type="submit" name="submit" value="Submit post" class="btn btn-login">Submit Post</button>                            
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