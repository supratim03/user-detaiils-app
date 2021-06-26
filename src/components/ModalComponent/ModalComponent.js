import React from 'react';
import {Modal, Row, Col} from 'antd';

const ModalComponent = props => {

    const confirm = () => {
        props.handleConfirm();
    }

    const cancel = () => {
        props.handleCancel();
    }
    return (
        <Modal
            title={props.title}
            visible={props.isVisible}
            onOk={() => confirm()}
            onCancel={() => cancel()}
        >
            <Row>
                <Col xs={24} sm={24} md={24} lg={24}>
                    <span>Are you sure to delete this record?</span>
                </Col>
            </Row>
        </Modal>
    )
}

export default ModalComponent;