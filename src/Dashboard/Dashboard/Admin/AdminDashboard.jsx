import { HiMenu, HiX } from 'react-icons/hi';
import { NavLink, Outlet } from 'react-router';

const AdminDashboard = () => {

    const linkClass = ({ isActive }) =>
        isActive
            ? " p-2 text-pink-700 rounded-lg hover:bg-transparent font-bold text-lg"
            : " p-2 rounded-lg hover:bg-transparent hover:text-pink-500 hover:bg-pink-300 font-bold text-lg text-blue-500";

    return (
        <div>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle peer" />

                {/* Top Navbar Area */}
                <div className="drawer-content flex flex-col min-h-screen">
                    <div className="flex items-center justify-between bg-base-200 p-3 shadow-md">
                        {/* Hamburger Icon */}
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
                        {/* Cross Icon */}
                        <li className="flex justify-end ml-56">
                            <label htmlFor="my-drawer" className="btn btn-ghost text-2xl">
                                <HiX />
                            </label>
                        </li>

                        {/* Sidebar Links */}

                        <li>
                            <NavLink to="admin-profile" className={linkClass} >
                                My Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="manage-issues" className={linkClass} >
                                Manage Issues
                            </NavLink>
                        </li> 
                        <li>
                            <NavLink to="/saved-issues" className={linkClass} >
                                Saved Issues
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="manage-users" className={linkClass} >
                                Manage Users
                            </NavLink>
                        </li>
                        <li><NavLink to="/" className="p-2 rounded-lg text-orange-500 hover:bg-transparent hover:text-pink-500 hover:bg-pink-300 font-bold text-lg text-left">Back to Home</NavLink></li>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;