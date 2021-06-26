import React from 'react';
import { Spin, Alert } from 'antd';

const LoaderComponent = props => {
    return (
        <Spin tip="Loading..." size="large">
        </Spin>
    )
}

export default LoaderComponent;