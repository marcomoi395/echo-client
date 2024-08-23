import React, {useEffect, useState} from 'react';
import {Col, Row, Pagination, Dropdown, Space, message, Checkbox, Modal} from "antd";
import './BudgetTracker.scss'
import {
    useDeleteBudgetTrackerMutation, useGetBudgetTrackerQuery
} from "./budgetTrackerApiSlice";
import ButtonCustom from "../../components/Button/Button"
import {
    CaretDownOutlined, CaretUpOutlined, DownOutlined, ExclamationCircleFilled
} from "@ant-design/icons";
import formatDataUtil from "../../utils/formatData.util";


const BudgetTrackerTable = () => {
    // State
    const pageSize = 6;
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
    const [page, setPage] = useState(1);
    const [type, setType] = useState("");
    const [sort, setSort] = useState({key: "Date", value: -1});
    const [timeFilter, setTimeFilter] = useState("monthly");
    const [checkedList, setCheckedList] = useState([]);
    const [messageApi, messageContextHolder] = message.useMessage();
    const [modal, modalContextHolder] = Modal.useModal();

    // API
    const {data, isLoading} = useGetBudgetTrackerQuery({page, pageSize, type, sort, timeFilter});
    const [deleteBudgetTracker, {isLoading: isLoadingDelete}] = useDeleteBudgetTrackerMutation();

    // For checkbox
    const idList = data?.result.map(item => item._id);
    const checkedAll = idList?.length === checkedList?.length && idList?.length !== 0;
    const indeterminate = checkedList.length > 0 && checkedList.length < idList.length;

    // Format Data
    const dataAfterFormat = formatDataUtil(data);


    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 576);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Handle
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? idList : []);
    };

    const onCheckChange = (e, _id) => {
        if (e.target.checked) {
            setCheckedList([...checkedList, _id])
        } else {
            const newCheckedList = checkedList.filter(item => item !== _id);
            setCheckedList(newCheckedList)
        }
    }

    const handleChangeTypeFilter = (e) => {
        if ((e?.target?.innerText.split(" ")[0]).toLowerCase() === type) {
            setType('')
        } else {
            setType((e?.target?.innerText.split(" ")[0]).toLowerCase());
        }
    }

    const handlePagination = (page) => {
        setPage(page);
    }

    const handleSortBy = (sortKey) => {
        if (sortKey === sort.key) {
            setSort({key: sort.key, value: sort.value * -1});
        } else {
            setSort({key: sortKey, value: -1});
        }
    }

    const handleChangeTimeFilter = (timeFilter) => {
        setTimeFilter(timeFilter);
    }

    const onClick = ({key}) => {
        setTimeFilter(key);
    };

    const handleDeleteItem = async () => {
        const key = 'delete';

        if (!checkedList || checkedList.length === 0) {
            messageApi.info('Minimum selection of one item is required');
            return;
        }

        // Open loading message
        messageApi.open({
            key, type: 'loading', content: 'Loading...',
        });

        try {
            const deleteItems = await deleteBudgetTracker(checkedList);
            setCheckedList([]);

            // Close loading message and open success message
            messageApi.open({
                key, type: 'success', content: 'Items deleted successfully', duration: 2,
            });
        } catch (error) {
            // Close loading message and open error message
            messageApi.open({
                key, type: 'error', content: 'Error deleting budget tracker', duration: 2,
            });
            console.error('Error deleting budget tracker:', error);
        }
    }

    const showDeleteConfirm = () => {
        modal.confirm({
            title: 'Are you sure you want to delete these items?',
            icon: <ExclamationCircleFilled style={{color: '#343764'}}/>, // content: 'Some descriptions',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                handleDeleteItem();
            },
            onCancel() {
                // Handle cancel action if needed
            },
        });
    };

    const itemsFilter = [{
        label: 'Today', key: 'today',
    }, {
        label: 'Weekly', key: 'weekly',
    }, {
        label: 'Monthly', key: 'monthly',
    }, {
        label: 'All time', key: 'allTime',
    }];

    return (<>
        {isLoading ? (<p>"Loading..."</p>) : (<>
                {messageContextHolder}
                {modalContextHolder}
                <div className="container">
                    <div className={"filter"}>
                        <div className={"timeFilterButton"}>
                            <ButtonCustom title={"Today"}
                                          type={timeFilter === 'today' ? "button__time--active" : "button__time--outline"}
                                          handleButton={() => handleChangeTimeFilter("today")}/>
                            <ButtonCustom title={"Weekly"}
                                          type={timeFilter === 'weekly' ? "button__time--active" : "button__time--outline"}
                                          handleButton={() => handleChangeTimeFilter("weekly")}/>
                            <ButtonCustom title={"Monthly"}
                                          type={timeFilter === 'monthly' ? "button__time--active" : "button__time--outline"}
                                          handleButton={() => handleChangeTimeFilter("monthly")}/>
                            <ButtonCustom title={"All Time"}
                                          type={timeFilter === 'allTime' ? "button__time--active" : "button__time--outline"}
                                          handleButton={() => handleChangeTimeFilter("allTime")}/>
                        </div>
                        <div className={"timeFilterDropdown"}>
                            <Dropdown menu={{
                                itemsFilter,
                                }}
                            >
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        Filter By Time
                                        <DownOutlined style={{
                                            fontSize: '16px', color: '#343764', paddingLeft: '0px'
                                        }}/>
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                        <div className="filterType">
                            <ButtonCustom title={"Expense"}
                                          type={type === 'expense' ? "button--active" : "button--outline"}
                                          handleButton={handleChangeTypeFilter}
                                          count={data?.totalItems - data?.totalIncomeItems}/>
                            <ButtonCustom title={"Income"}
                                          type={type === 'income' ? "button--active" : "button--outline"}
                                          handleButton={handleChangeTypeFilter} count={data?.totalIncomeItems}/>
                        </div>
                    </div>

                    <ul className="table">
                        <li className="table__header">
                            <Row>
                                <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}
                                     className="table__col table__col--delete">
                                    <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange}
                                              checked={checkedAll}/>
                                </Col>
                                <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2} className="table__col table__col--no">
                                    <p>No</p>
                                </Col>
                                <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4} className="table__col table__col--type">
                                    <p>Type</p>
                                </Col>
                                <Col xxl={8} xl={8} lg={8} md={10} sm={10} xs={10}
                                     className="table__col table__col--description">
                                    <div onClick={() => handleSortBy("Description")} style={{cursor: "pointer"}}>
                                        <p>
                                            Description
                                            {sort.key === "Description" ? (sort.value === 1 ? (<span>
                                            <CaretUpOutlined style={{
                                                fontSize: '16px', color: '#343764', paddingLeft: '8px'
                                            }}/></span>) : (<span>
                                            <CaretDownOutlined style={{
                                                fontSize: '16px', color: '#343764', paddingLeft: '8px'
                                            }}/></span>)) : []}
                                        </p>
                                    </div>
                                </Col>
                                <Col xxl={5} xl={5} lg={5} md={7} sm={7} xs={7}
                                     className="table__col table__col--amount">
                                    <div onClick={() => handleSortBy("Amount")} style={{cursor: "pointer"}}>
                                        <p>
                                            Amount
                                            {sort.key === "Amount" ? (sort.value === 1 ? (<span>
                                            <CaretUpOutlined style={{
                                                fontSize: '16px',
                                                color: '#343764',
                                                paddingLeft: '8px',
                                                cursor: "pointer"
                                            }}/></span>) : (<span>
                                            <CaretDownOutlined style={{
                                                fontSize: '16px',
                                                color: '#343764',
                                                paddingLeft: '8px',
                                                cursor: "pointer"
                                            }}/></span>)) : []}
                                        </p>
                                    </div>
                                </Col>
                                <Col xxl={4} xl={4} lg={4} md={0} sm={0} xs={0} className="table__col table__col--date">
                                    <div onClick={() => handleSortBy("Date")} style={{cursor: "pointer"}}>
                                        <p>
                                            Date
                                            {sort.key === "Date" ? (sort.value === 1 ? (<span>
                                            <CaretUpOutlined style={{
                                                fontSize: '16px',
                                                color: '#343764',
                                                paddingLeft: '8px',
                                                cursor: "pointer"
                                            }}/></span>) : (<span>
                                            <CaretDownOutlined style={{
                                                fontSize: '16px',
                                                color: '#343764',
                                                paddingLeft: '8px',
                                                cursor: "pointer"
                                            }}/></span>)) : []}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </li>
                        {dataAfterFormat.map((item, index) => {
                            return (<li key={item._id} className="table__row table__row--expense">
                                <Row>
                                    <Col xxl={1} xl={1} lg={1} md={1} sm={1} xs={1}
                                         className="table__col table__col--delete">
                                        <Checkbox onChange={(e) => onCheckChange(e, item._id)}
                                                  checked={checkedList.includes(item._id)}/>
                                    </Col>
                                    <Col xxl={2} xl={2} lg={2} md={2} sm={2} xs={2}
                                         className="table__col table__col--no">
                                        <p>{index + 1}</p>
                                    </Col>
                                    <Col xxl={4} xl={4} lg={4} md={4} sm={4} xs={4}
                                         className={item.type === 'Expense' ? 'table__col table__col--expense' : 'table__col table__col--income'}>
                                        <p>{isSmallScreen ? item.type.charAt(0) : item.type}</p>
                                    </Col>
                                    <Col xxl={8} xl={8} lg={8} md={10} sm={10} xs={10}
                                         className="table__col table__col--description">
                                        <p>{item.description}</p>
                                    </Col>
                                    <Col xxl={5} xl={5} lg={5} md={7} sm={7} xs={7}
                                         className="table__col table__col--amount">
                                        <p>{item.amount}</p>
                                    </Col>
                                    <Col xxl={4} xl={4} lg={4} md={0} sm={0} xs={0}
                                         className="table__col table__col--date">
                                        <p>{item.date}</p>
                                    </Col>
                                </Row>
                            </li>)
                        })}
                    </ul>
                    <div className={'budget-tracker-table__footer'}>
                        <div>
                            <ButtonCustom
                                title={"Delete"}
                                type="button__delete"
                                handleButton={showDeleteConfirm}
                            />
                        </div>
                        <div>
                            <Pagination align="end" defaultCurrent={1} total={data?.totalItems} pageSize={pageSize}
                                        responsive={true}
                                        onChange={handlePagination} page={page}/>
                        </div>
                    </div>
                </div>
            </>)}
    </>)
}

export default BudgetTrackerTable;
