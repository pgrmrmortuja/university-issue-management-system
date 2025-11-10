import React from 'react';
import { jwtDecode } from "jwt-decode";
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';

const DashboardLayout = () => {

    const token = localStorage.getItem("jwt");
    let role = null;

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    console.log("role from dashboard:", role);

    return (
        <div
            // className='flex flex-col bg-no-repeat bg-cover bg-fixed'
            // style={{
            //     backgroundImage: "url('/Sprinkle.svg')",
            // }}
            className="w-full mx-auto ">
            <div>
                {role === 'Admin' && <AdminDashboard />}
                {role === 'User' && <UserDashboard />}
            </div>

        </div>
    );
};

export default DashboardLayout;
