import React from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.css';

const Pagination = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={onPageChange}
            containerClassName={'pagination-container'}
            activeClassName={'active'}
            previousLabel={'◀'}
            nextLabel={'▶'}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            breakLabel={null}
        />
    );
};

export default Pagination;