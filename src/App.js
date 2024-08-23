import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import LayoutDefault from './components/Layout/LayoutDefault';
import Login from './features/Auth/Login/Login';
import {selectCurrentToken} from "./features/Auth/authSlice";
import {useSelector} from "react-redux";
import RequireAuth from "./features/Auth/RequireAuth";
import {ConfessionPage, DashboardPage, SchedulePage, SettingPage, TaskPage} from "./pages";
import BudgetTrackerPage from "./pages/BudgetTrackerPage";



const App = () => {
    return (<Routes>
        {/* Public routes */}
        <Route path="/auth/login" element={<Login/>}/>

        {/* Protected routes */}
        <Route element={<LayoutDefault/>}>
            <Route path="/" element={<Navigate to="/dashboard"/>}/>
            <Route path="/dashboard" element={<RequireAuth><DashboardPage/></RequireAuth>}/>
            <Route path="/budget-tracker" element={<RequireAuth><BudgetTrackerPage/></RequireAuth>}/>
            <Route path="/task" element={<RequireAuth><TaskPage/></RequireAuth>}/>
            <Route path="/schedule" element={<RequireAuth><SchedulePage/></RequireAuth>}/>
            <Route path="/confession" element={<RequireAuth><ConfessionPage/></RequireAuth>}/>
            <Route path="/setting" element={<RequireAuth><SettingPage/></RequireAuth>}/>
        </Route>
    </Routes>);
};

export default App;
