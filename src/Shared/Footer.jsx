import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { Link } from "react-router";
import city from "../../src/assets/city_logo-removebg.png"

const Footer = () => {
    return (
        <footer className="bg-red-200 text-black">
            <div className="max-w-[1200px] mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Company Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <img
                                className="w-[200px] md:w-[250px] object-cover"
                                src={city}
                                alt="City University Logo"
                            />
                        </Link>

                        <p className="text-sm mt-2">
                            University Issue Management System – A reliable platform for students and staff to report, track, and resolve university-related issues. Easily submit issues, track their progress and get support efficiently.
                        </p>

                        <p className="text-sm mt-4">
                            Office Hours: Fri - Tue, 9:00 AM - 4:00 PM
                        </p>

                        <div className="flex items-center gap-3 mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-600">
                                <FaLinkedinIn size={20} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-red-500">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                        <ul className="space-y-2 text-sm">
                            <li><strong>Phone:</strong></li>
                            <li>Telephone: 09643-234234</li>
                            <li>Cell: +8801322917670, +8801322917671</li>
                            <li>Cell: +8801322917672, +8801322917673</li>
                            <li className="mt-2"><strong>Email:</strong></li>
                            <li>registrar@cityuniversity.ac.bd</li>
                            <li>admin@cityuniversity.ac.bd</li>
                            <li className="mt-2"><strong>Location:</strong></li>
                            <li>Khagan, Ashulia, Birulia, Savar, Dhaka, Bangladesh</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} City University. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
