import React, { useContext } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link, Outlet } from 'react-router';
import Logout from '../components/Logout';
import { AuthContext } from '../providers/AuthProvider';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
         <div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle peer" />

                {/* Top Navbar Area */}
                <div className="drawer-content flex flex-col min-h-screen">
                    <div className="flex items-center justify-between bg-base-200 p-3 shadow-md">
                        {/* ✅ Hamburger Icon */}
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-ghost text-2xl"
                        >
                            <HiMenu />
                        </label>
                    </div>

                    {/* Page Content */}
                    <div className="w-11/12 mx-auto">
                        <Outlet />
                    </div>
                </div>

                {/* Sidebar Drawer */}
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
                        {/* ✅ Cross Icon */}
                        <li className="flex justify-end ml-56">
                            <label htmlFor="my-drawer" className="btn btn-ghost text-2xl">
                                <HiX />
                            </label>
                        </li>

                        {/* Sidebar Links */}
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/users">All Users</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Logout></Logout></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;