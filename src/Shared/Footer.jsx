import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { GiModernCity } from "react-icons/gi";
import { Link } from "react-router";
import city from "../../src/assets/city_logo-removebg.png"

const Footer = () => {
    return (
        <footer className="bg-pink-200 text-black">
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Company Info */}
                    <div>
                        <Link to="/" className="flex  items-center gap-2">
                            {/* <GiModernCity className="text-xl md:text-2xl text-pink-600"></GiModernCity>
                            <span className="text-xl md:text-2xl text-pink-600 font-semibold">University</span> */}
                            <img
                                className="w-[150px] object-cover"
                                src={city}
                                alt="city university logo"
                            />
                        </Link>
                        <p className="text-sm mt-2">
                            Your trusted platform for buying, selling, and managing real estate properties effortlessly and securely.
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500"
                            >
                                <FaFacebookF size={20} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                <FaTwitter size={20} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600"
                            >
                                <FaLinkedinIn size={20} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-pink-500"
                            >
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="/"
                                    className="hover:text-blue-500 transition duration-200"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/all-issues"
                                    className="hover:text-blue-500 transition duration-200"
                                >
                                    See Issues
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/faq"
                                    className="hover:text-blue-500 transition duration-200"
                                >
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                        <ul className="space-y-2 text-sm">
                            <li>Email: support@university.com</li>
                            <li>Phone: +1 (800) 123-4567</li>
                            <li>Address: 123 University Ave, Cityscape, USA</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} University. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
