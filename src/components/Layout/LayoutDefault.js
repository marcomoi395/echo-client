import React, {useEffect, useState} from 'react';
import {Divider, Layout, Menu} from 'antd';
import {Link, Outlet, useLocation} from "react-router-dom";
import './LayoutDefault.scss';
import {
    BankOutlined,
    CalendarOutlined,
    HeartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import Loading from "../Loading";

const {Header, Sider, Content} = Layout;

const items = [{
    key: '/task', label: <Link to='/task'>Task</Link>, icon: <UnorderedListOutlined/>,
}, {
    key: '/schedule', label: <Link to='/schedule'>Schedule</Link>, icon: <CalendarOutlined/>,
}, {
    key: '/budget-tracker', label: <Link to='/budget-tracker'>Budget Tracker</Link>, icon: <BankOutlined/>,
}, {
    key: '/confession', label: <Link to='/confession'>Confession</Link>, icon: <HeartOutlined/>,
}, {
    key: '/setting', label: <Link to='/setting'>Setting</Link>, icon: <SettingOutlined/>,
}];

const LayoutDefault = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [widthScreen, setWidthScreen] = useState(window.innerWidth);
    const location = useLocation();
    const selectedKey = location.pathname;

    useEffect(() => {
        const handleResize = () => {
            setWidthScreen(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const siderStyle = {
        position: 'fixed',
    };

    return (<Layout>
        <Sider
            style={siderStyle}
            width={widthScreen <= 992 ? widthScreen : 300}
            collapsed={collapsed}
            theme={'light'}
            className={'sider'}
            collapsedWidth={widthScreen <= 768 ? 0 : undefined}
        >
            <div className='sider__top'>
                <Link to='/' className="sider__logo">
                    {collapsed ? 'M' : 'MARCO'}
                </Link>

                {!collapsed && widthScreen <= 992 ? (
                    <button className="sider__button--collapsed" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <MenuUnfoldOutlined style={{fontSize: '28px'}}/> :
                            <MenuFoldOutlined style={{fontSize: '28px'}}/>}
                    </button>) : ''}
            </div>

            <Divider className={'sider__divider'}/>
            <Menu
                mode="inline"
                items={items}
                className={'sider__menu'}
                selectedKeys={[selectedKey]}
            />
        </Sider>

        <Layout style={{
            marginInlineStart: collapsed ? (widthScreen < 768 ? 0 : 80) : (300),
            transition: "all 0.2s"
        }}>
            {!collapsed && widthScreen <= 768 ? [] : (
                <Header className={'header'}>
                    <div className="header__left">
                        <button className="header__button--collapsed" onClick={() => setCollapsed(!collapsed)}>
                            {collapsed ? <MenuUnfoldOutlined style={{fontSize: '28px'}}/> :
                                <MenuFoldOutlined style={{fontSize: '28px'}}/>}
                        </button>
                    </div>
                    <div className="header__right">
                        infor
                    </div>
                </Header>)}

            {!collapsed && widthScreen <= 992 ? [] : (
                <Content className={'content'}>
                    <Outlet/>
                    {/*<Loading loading={true}/>*/}
                </Content>)}

        </Layout>
    </Layout>);
};

export default LayoutDefault;
