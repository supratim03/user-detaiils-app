import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAllUsers, setPaginatedUser, setAllUsers } from '../../store/actions';
import { Row, Col, Space, Tooltip } from 'antd';
import LoaderComponent from '../../components/LoaderComponent/LoaderComponent';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import { getUserListByIndex } from './../../helpers/helper';
import { SortAscendingOutlined, SortDescendingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { history } from '../../store';
import TableComponent from '../../components/TableComponent/TableComponent';

const UserListContainer = (props) => {
    const [pageSize, setPageSize] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [isNameSort, setIsNameSort] = useState(true);
    const [isEmailSort, setIsEmailSort] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        if (props.userList.length === 0) {
            props.getAllUsers()
        } else {
            let updatedArr = getUpdatedUserList(currentPage, pageSize, props.userList)
            props.setPaginatedUser(updatedArr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const columns = [
        {
            title: () => <React.Fragment>
                <span>Title</span>
                <span className="sort-icons">
                    {isNameSort ? <SortAscendingOutlined onClick={(e) => handleSortType('name')} /> : <SortDescendingOutlined onClick={(e) => handleSortType('name')} />}
                </span>
            </React.Fragment>,
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => <span className="link" onClick={(e) => handleViewUser(record.id)}>{text}</span>,
            fixed: 'left',

        },
        {
            title: 'User name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: () => <React.Fragment>
                <span>Email</span>
                <span className="sort-icons">
                    {isEmailSort ? <SortAscendingOutlined onClick={(e) => handleSortType('email')} /> : <SortDescendingOutlined onClick={(e) => handleSortType('email')} />}
                </span>
            </React.Fragment>,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip placement="top" title="Edit">
                        <span className="cursor-pointer" onClick={(e) => handleViewUser(record.id)}><EditOutlined /></span>
                    </Tooltip>
                    <Tooltip placement="top" title="Delete">
                        <span className="cursor-pointer" onClick={(e) => handleDeleteRow(record.id)}><DeleteOutlined /></span>
                    </Tooltip>

                </Space>
            ),
        }
    ]

    const handleSortType = (sortBy) => {
        let clonedArr = [...props.paginatedList];
        let isAscending = sortBy === 'name' ? isNameSort : isEmailSort;
        if (isAscending) {
            clonedArr = clonedArr.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1))
        } else {
            clonedArr = clonedArr.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1))
        }
        props.setPaginatedUser(clonedArr);
        sortBy === 'name' ? setIsNameSort(!isNameSort) : setIsEmailSort(!isEmailSort);
    }

    const handleDeleteRow = id => {
        setSelectedId(id);
        setIsModalVisible(true);
    }

    const handleViewUser = id => {
        history.push(`/view/user/${id}`)
    }

    const getUpdatedUserList = (currentPage, pageSize, data) => {
        let startIndex = pageSize * currentPage - pageSize;
        return getUserListByIndex(startIndex, startIndex + pageSize - 1, data);
    }

    const updatePageSize = (currentPage, size) => {
        let updatedArr = getUpdatedUserList(currentPage, size, props.userList)
        props.setPaginatedUser(updatedArr);
        setCurrentPage(currentPage)
        setPageSize(size);
    }

    const handleConfirm = () => {
        let clonedArr = [...props.userList];
        let index = clonedArr.findIndex(el => el.id === selectedId);
        clonedArr.splice(index, 1);
        let updatedArr = getUpdatedUserList(currentPage, pageSize, clonedArr);
        props.setPaginatedUser(updatedArr);
        props.setAllUsers(clonedArr);
        setIsModalVisible(false);


    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <Row justify="space-around">
            <ModalComponent
                isVisible={isModalVisible}
                title="Delete user"
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
            />
            <Col xs={24} sm={24} md={24} lg={24}>
                {props.showLoader ?
                    <div className="loader-wrapper">
                        <LoaderComponent />
                    </div> :
                    <TableComponent
                        columns={columns}
                        data={props.paginatedList}
                    />}

            </Col>

            <Col xs={24} sm={24} md={24} lg={24} className="padding-top-20 horizontal-center">
                <PaginationComponent
                    total={props.userList.length}
                    pageSize={pageSize}
                    updatePageSize={updatePageSize}
                    currentPage={currentPage}
                />
            </Col>
        </Row>

    )
}

const mapStateToProps = state => {
    return {
        userList: state.users.userList,
        showLoader: state.users.showLoader,
        paginatedList: state.users.paginatedUserList
    }
}

export default connect(mapStateToProps, { getAllUsers, setPaginatedUser, setAllUsers })(UserListContainer);