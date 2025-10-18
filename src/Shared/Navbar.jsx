import React, { useContext } from "react";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Providers/AuthProvider";
import userIcon from "../assets/user.png";
// import city from "../assets/city.jpg";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { GiModernCity } from "react-icons/gi";


const Navbar = () => {



    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const token = localStorage.getItem("jwt");
    let role = null;

    if (token) {
        const decoded = jwtDecode(token);
        role = decoded.role;
    }

    const getDashboardLink = () => {
        if (role === 'Admin') return '/dashboard/admin-profile';
        if (role === 'User') return '/dashboard/user-profile';
        return '/login';
    };



    const linkClass = ({ isActive }) =>
        isActive
            ? " p-2 text-pink-700 rounded-lg hover:bg-transparent font-bold text-lg"
            : " p-2 rounded-lg hover:bg-transparent hover:text-pink-500 hover:bg-pink-300 font-bold text-lg text-black";

    const links = (
        <>
            <NavLink to="/" className={linkClass} >
                Home
            </NavLink>
            {
                user &&
                (
                    <NavLink to={getDashboardLink()} className={linkClass} >
                        Dashboard
                    </NavLink>
                )
            }
            {
                user &&
                (
                    <NavLink to="/all-issues" className={linkClass} >
                        All Issues
                    </NavLink>
                )
            }

            {user && (
                <NavLink to="/contact-us" className={linkClass} >
                    Contact Us
                </NavLink>
            )}

        </>
    );

    const signOut = () => {
        logOut();
        navigate("/login");
        toast.success("Logout successfully!");
    };

    return (
        <nav className="bg-pink-200">
            <div className="container px-4 mx-auto navbar">
                {/* Start Section */}
                <div className="navbar-start">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost lg:hidden"
                            role="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </label>
                        <div
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] shadow rounded-box w-52 bg-pink-100"
                        >

                            {/*==========================================================  */}
                            
                            {/*==========================================================  */}

                            {links}

                            <div className="mb-2">
                                {user && user?.email ? (
                                    <button
                                        onClick={signOut}
                                        className="w-full text-black bg-pink-500 border-none rounded-lg btn btn-neutral hover:bg-pink-700" data-tooltip-id="my-tooltip"
                                        data-tooltip-content={"You Can Logout"}
                                        data-tooltip-place="top"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <div>
                                        <Link
                                            to="/login"
                                            className="mr-2 text-black bg-pink-500 border-none rounded-lg btn btn-neutral hover:bg-pink-700"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content={"Please Login"}
                                            data-tooltip-place="top"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="text-black bg-pink-500 border-none rounded-lg btn btn-neutral hover:bg-pink-700"
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content={"Register If Not Account"}
                                            data-tooltip-place="top"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <Link to="/" className="flex items-center justify-center gap-2">
                        <GiModernCity className="text-xl text-pink-600 md:text-2xl"></GiModernCity>
                        <span className="text-xl font-semibold text-pink-600 md:text-2xl">University</span>
                        {/* <img
                                    className="w-16 h-14 object-cover"
                                    src={city}
                                    alt="city university logo"
                                /> */}
                    </Link>
                </div>

                {/* Center Section */}
                <div className="hidden navbar-center lg:flex">
                    <div className="px-1 space-x-4 menu menu-horizontal">
                        {links}

                        {/*==========================================================  */}
                        {/*==========================================================  */}
                    </div>
                </div>

                {/* End Section */}
                <div className="navbar-end ">
                    <div className="dropdown">
                        <div tabIndex={0} role="" className="m-1">
                            {user && user?.email ? (
                                <img
                                    className="w-10 h-10 border-2 border-pink-500 rounded-full"
                                    src={user?.photoURL}
                                    alt=""

                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={user?.displayName || "User"}
                                    data-tooltip-place="top"
                                />
                            ) : (
                                <img
                                    className="w-10 h-10 rounded-full my-tooltip"
                                    src={userIcon}
                                    alt=""

                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content={"No Logged User"}
                                    data-tooltip-place="top"
                                />
                            )}
                        </div>
                        
                    </div>

                    <div className="hidden lg:ml-2 lg:flex lg:items-center lg:gap-3">
                        <div>
                            {user && user?.email ? (
                                <button
                                    onClick={signOut}
                                    className="text-black bg-pink-500 border-none rounded-lg btn btn-neutral hover:bg-pink-700" data-tooltip-id="my-tooltip"
                                    data-tooltip-content={"You Can Logout"}
                                    data-tooltip-place="top"
                                >
                                    Logout
                                </button>
                            ) : (
                                <div>
                                    <Link
                                        to="/login"
                                        className="mr-2 text-black bg-pink-500 border-none rounded-lg btn btn-neutral hover:bg-pink-700"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={"Please Login"}
                                        data-tooltip-place="top"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="text-black bg-pink-500 border-none rounded-lg btn btn-neutral hover:bg-pink-700"
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={"Register If Not Account"}
                                        data-tooltip-place="top"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>


                </div>
                <Tooltip id="my-tooltip" />

            </div>
        </nav>

    );
};

export default Navbar;

