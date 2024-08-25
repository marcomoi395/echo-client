import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux Tookit
import {Provider} from 'react-redux'
import {store} from "./app/store";

// Routering
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// AntDesign
import {ConfigProvider} from 'antd';

const configAnt = {
    components: {
        Menu: {
            itemActiveBg: '#8371A3',
            itemSelectedBg: '#FCEEE5',
            itemSelectedColor: '#8371A3',
            itemHoverBg: 'rgba(0,0,0,0.1)',
            itemColor: '#EAEBEC',
            itemHoverColor: '#8371A3',
            itemBorderRadius: 100,
            itemHeight: 47,
            itemMarginInline: 16,
            itemMarginBlock: 10,
        }, Layout: {
            bodyBg: '#FFF6F1',
        },
        Pagination:{
            itemActiveBg: '#FCEEE5',
            itemBg: '#FFF6F1',
        },
        DatePicker: {
            activeBorderColor: '#343764',
            colorBgContainer: '#FFF6F1',
            colorBgElevated: '#FFF6F1',
            colorBorder: '#343764',
            colorTextPlaceholder: '#343764',
            colorIcon: '#343764',
        },
        Radio: {

        },
        Checkbox:{
            colorBgContainer: '#FFF6F1',
            controlInteractiveSize	: 20,
        },
        Modal: {
            contentBg: '#FFF6F1',
            titleColor: '#343764',
        },
        Notification: {
        },
        Dropdown: {
            colorBgElevated: '#FFF6F1',
            colorText: '#343764',
            fontFamily: 'Montserrat',
            fontSize: 16,
            paddingXS: 8,
            paddingXXS: 8,
        },
        Message: {
            contentBg: '#FFF6F1',
        }
    },
    token: {
        colorPrimary: '#343764',
        colorPrimaryHover: '#343764',
        colorPrimaryBorder: '#343764',
        colorBgContainer: '#FFF6F1',
        colorInfo: '#343764',
        colorSuccess: '#64e3af',
        colorError: '#e16b6b',
        colorText: '#343764',
        // colorSplit: '#515151',
        colorBgElevated: '#FFF6F1',
    }
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <ConfigProvider theme={configAnt}>
                    <App/>
                </ConfigProvider>
            </Router>
        </Provider>
    </StrictMode>);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
