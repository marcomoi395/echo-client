import React, { useState } from 'react';
import { Task } from '../components';
import { Dropdown, Space, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const TaskPage = () => {
    const [timeFilter, setTimeFilter] = useState('monthly');

    const onClick = ({ key }) => {
        setTimeFilter(key);
    };

    const items = [
        { label: 'Today', key: 'today' },
        { label: 'Weekly', key: 'weekly' },
        { label: 'Monthly', key: 'monthly' },
        { label: 'All time', key: 'allTime' },
    ];

    // const items = [
    //     { label: 'Today', key: 'today' },
    //     { label: 'Weekly', key: 'weekly' },
    //     { label: 'Monthly', key: 'monthly' },
    //     { label: 'All time', key: 'allTime' },
    // ];


    // return (
    //     <div className="timeFilterDropdown">
    //         <Dropdown  menu={{itemsFilter}} trigger={['click']}>
    //             <a onClick={(e) => e.preventDefault()}>
    //                 <Space>
    //                     Filter By Time
    //                     <DownOutlined style={{ fontSize: '16px', color: '#343764' }} />
    //                 </Space>
    //             </a>
    //         </Dropdown>
    //     </div>
    // );

    return (
        <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
                Filter By Time
                <DownOutlined style={{ fontSize: '16px', color: '#343764' }} />
            </a>

        </Dropdown>
    );
};

export default TaskPage;
