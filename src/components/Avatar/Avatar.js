import './Avatar.scss'
import {Dropdown, Modal} from "antd";
import {useLogoutMutation} from "../../features/Auth/authApiSlice";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logOut, setCredentials} from "../../features/Auth/authSlice";
import {ExclamationCircleFilled} from "@ant-design/icons";
import React from "react";

const Avatar = () => {
    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [modal, modalContextHolder] = Modal.useModal();

    const handleLogout = async () => {
        try{
            const result = await logout().unwrap();
            dispatch(logOut())
            navigate('/auth/login');
        }
        catch(error){
            console.log(error)
        }
    }

    const showLogOutConfirm = () => {
        modal.confirm({
            title: 'Are you sure you want to log out?',
            icon: <ExclamationCircleFilled style={{color: '#343764'}} />,
            // content: 'Some descriptions',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                handleLogout();
            },
            onCancel() {
                // Handle cancel action if needed
            },
        });
    };

    const items = [
        {
            key: '1',
            label: (
                <Link to='/profile'>My Profile</Link>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: (
                <a onClick={showLogOutConfirm}>
                    Log out
                </a>
            ),
        },
    ];

    return (
        <>
            {modalContextHolder}
            <div className="avatar">
                <Dropdown menu={{items}} placement="bottomRight" arrow={{pointAtCenter: true}} trigger={['click']}>
                    <img src="https://www.didongmy.com/vnt_upload/news/05_2024/anh-27-meme-dang-yeu-didongmy.jpg"
                         alt="Avatar" className="avatar__img"/>
                </Dropdown>
            </div>
        </>
    )
}

export default Avatar