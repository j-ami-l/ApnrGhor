import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';
import Sidebar from '../../components/Sidebar/Sidebar';

const Dashboard = () => {
    return (
        <div className="lg:grid grid-cols-8">
            <div className="mb-30 lg:mb-0 col-span-1">
                <Sidebar />
            </div>
            <div className='col-span-7 lg:p-10 mx-2'>
                <Outlet />
            </div>
            {/* <Toaster position="top-center" reverseOrder={false} /> */}
        </div>

    );
};

export default Dashboard;