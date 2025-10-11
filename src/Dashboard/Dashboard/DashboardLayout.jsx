import React, { useState, useEffect } from 'react';
import AdminNavbar from './Admin/AdminNavbar';
import { jwtDecode } from "jwt-decode";
import UserDashboard from './User/UserDashboard';

const DashboardLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const token = localStorage.getItem("jwt");
    let role = null;

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    return (
        <div className="w-full mx-auto">
            <div>
                {role === 'Admin' && <AdminNavbar isOpen={isOpen} setIsOpen={setIsOpen} />}
                {role === 'User' && <UserDashboard/>}
            </div>

        </div>
    );
};

export default DashboardLayout;
