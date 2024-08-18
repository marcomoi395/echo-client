import React from 'react';
import {Dashboard} from '../components';
import './Page.scss'
import CardItem from '../components/CardItem/CardItem'
import {Col, Divider, Row} from "antd";
import BudgetTrackerTable from "../features/BudgetTracker/BudgetTrackerTable";
import BudgetTrackerAdd from "../features/BudgetTracker/BudgetTrackerAdd";

const DashboardPage = () => {
    return (<>
            <div>
                <h1>Dashboard</h1>
                <Row gutter={16}>
                    <Col xxl={18} xl={18} lg={24} md={24} sm={24} xs={24}>
                        <CardItem>
                            <BudgetTrackerTable/>
                        </CardItem>
                    </Col>
                    <Divider className={"dashboard__divider"}/>
                    <Col xxl={6} xl={6} lg={24} md={24} sm={24} xs={24}>
                        <div className={'dashboard__budget-tracker-add'}>
                            <CardItem className="budget-tracker-add" >
                                <BudgetTrackerAdd/>
                            </CardItem>
                        </div>
                    </Col>
                </Row>
            </div>
        </>

    );
};

export default DashboardPage;
