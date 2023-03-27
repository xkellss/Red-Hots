import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashHeader from './DashHeader';
import NavBar from './NavBar';
import SupportDialog from './SupportDialog';
import Loaded from './Loaded';
import './css/dashboard.css';

const Dashboard = () => {
    const [supportOpen, setSupportOpen] = useState(false);
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className='Dashboard'>
            <Loaded />
            <NavBar navOpen={navOpen} />
            <div className='Dashboard_Content'>
                <DashHeader name='Anthony Salerno' setSupportOpen={setSupportOpen} navOpen={navOpen} setNavOpen={setNavOpen} />
                <SupportDialog supportOpen={supportOpen} setSupportOpen={setSupportOpen} />
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard;