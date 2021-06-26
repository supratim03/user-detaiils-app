import { Pagination } from 'antd';
import React, { useState } from 'react';

const PaginationComponent = props => {

    const onSizeChange = (current, size) => {
        props.updatePageSize(current, size);
    }

    const onPageChange = (page, pageSize) => {
        props.updatePageSize(page, pageSize);
    }
    return (
        <Pagination
            showSizeChanger
            pageSizeOptions={[2, 3, 5, 10]}
            onShowSizeChange={onSizeChange}
            defaultCurrent={1}
            total={props.total}
            pageSize={props.pageSize}
            current={props.currentPage}
            onChange={onPageChange}
        />
    )
}

export default PaginationComponent;