import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import InputComponent from '../../components/InputComponent/InputComponent';
import { history } from '../../store';
import { getUserById, setShowLoader } from './../../store/actions'
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';

const UserDetailsContainer = (props) => {
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        props.setShowLoader(true);
        if (!props.fetchedUsers || !props.fetchedUsers[props.match.params.userId]) {
            props.getUserById(props.match.params.userId, props.fetchedUsers)
        }else {
            props.setShowLoader(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.fetchedUsers) {
            let user = props.fetchedUsers[props.match.params.userId];
            setSelectedUser(user);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.fetchedUsers])


    const handleBack = () => {
        history.push('/')
    }


    const prepareUserView = selectedUser && Object.keys(selectedUser) && Object.keys(selectedUser)?.map((key, index) => {
        return (
            <React.Fragment >
                <Col xs={24} sm={24} md={6} lg={6} >
                    <label>{key}</label>
                    <InputComponent
                        value={selectedUser[key]}
                    />
                </Col >
            </React.Fragment >
        )
    })


    return (
        <Row className="padding-20">
            {props.showLoader ? <div className="loader-wrapper" style={{width: '100%'}}>
                        <LoaderComponent />
                    </div> : <React.Fragment><Col xs={24} sm={24} md={24} lg={24}>
                <Button type="primary" icon={<ArrowLeftOutlined />} size="large" onClick={handleBack}>
                    Back
                </Button>
            </Col>
            <div style={{ width: '100%' }}>
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={24} className="padding-top-20">
                        <h3>View Details</h3>
                    </Col>

                    {prepareUserView}
                    
                </Row>

            </div></React.Fragment>}

        </Row>

    )
}

const mapStateToProps = state => {
    return {
        fetchedUsers: state.users.fetchUserMap,
        showLoader: state.users.showLoader,
    }
}

export default connect(mapStateToProps, { getUserById,setShowLoader })(UserDetailsContainer);