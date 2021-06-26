import React from 'react';
import { Table } from 'antd';

const TableComponent = props => {


    return (
        <Table 
            columns={props.columns} 
            dataSource={props.data}
            pagination={false}
            bordered={true}
        />
    )
}

export default TableComponent;