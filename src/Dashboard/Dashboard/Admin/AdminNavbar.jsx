import React from 'react';
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from 'react-router';

const AdminNavbar = ({ isOpen, setIsOpen }) => {

    const linkClass = ({ isActive }) =>
        isActive
            ? "p-2 text-pink-700 rounded-lg hover:bg-transparent font-bold text-lg text-left"
            : "p-2 rounded-lg text-blue-500 hover:bg-transparent hover:text-pink-500 hover:bg-pink-300 font-bold text-lg text-left";

    return (
        <div>
            {/* Hamburger Icon */}
            <button
                className="p-3 fixed top-4 left-4 z-50 bg-pink-600 text-white rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-pink-300 text-white p-5 transition-transform duration-300 
                    ${isOpen ? "translate-x-0" : "-translate-x-64"}`}
            >
                <h2 className={`text-2xl font-bold mb-6 mt-14 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                    Admin Dashboard
                </h2>
                <ul className={``}>
                    <li><NavLink to="admin-profile" className={linkClass}>Admin Profile</NavLink></li>
                    <li><NavLink to="manageProperties" className={linkClass}>Manage Properties</NavLink></li>
                    <li><NavLink to="manageUsers" className={linkClass}>Manage Users</NavLink></li>
                    <li><NavLink to="manageReviews" className={linkClass}>Manage Reviews</NavLink></li>
                    <li><NavLink to="advertise" className={linkClass}>Advertise Properties</NavLink></li>
                    {/* <li><NavLink to="visitor" className={linkClass}>Visitor</NavLink></li> */}
                    <li><NavLink to="/" className="p-2 rounded-lg text-orange-500 hover:bg-transparent hover:text-pink-500 hover:bg-pink-300 font-bold text-lg text-left">Back to Home</NavLink></li>
                </ul>
            </div>
        </div>
    );
};

export default AdminNavbar;
