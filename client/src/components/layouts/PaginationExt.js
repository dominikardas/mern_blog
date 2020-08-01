import React, { Component } from 'react';
import Pagination from 'react-js-pagination';

export class PaginationExt extends Component {
    
    constructor(props) {
        super(props);
        this.state = { activePage: 1 };
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        if (this.props.category) this.props.action(this.props.category, pageNumber); //getAllPosts(pageNumber);
        else                     this.props.action(pageNumber);
    };

    render() {
        return (
            <div className="l-pagination">
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.props.itemsPerPage}
                    totalItemsCount={this.props.totalItems}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        )
    }
}

export default PaginationExt;
