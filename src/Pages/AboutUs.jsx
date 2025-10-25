// AboutUs.jsx
import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen px-5 md:px-20 py-16">
            {/* Heading Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
                    About Us
                </h1>
                <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                    Our University Issue Management System is designed to streamline the reporting
                    and resolution of campus issues. We aim to provide a seamless platform for
                    students to report their problems and for administrators to manage and solve
                    them efficiently.
                </p>
            </div>

            {/* Features / Values Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Feature 1 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                    <h2 className="text-2xl font-semibold text-red-600 mb-3">Efficiency</h2>
                    <p className="text-gray-600">
                        Students can submit issues quickly, and admins can manage them efficiently,
                        reducing delays in problem-solving.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                    <h2 className="text-2xl font-semibold text-red-600 mb-3">Transparency</h2>
                    <p className="text-gray-600">
                        The status of each submitted issue is visible to the student, ensuring transparency
                        in the resolution process.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                    <h2 className="text-2xl font-semibold text-red-600 mb-3">Reliability</h2>
                    <p className="text-gray-600">
                        Our system guarantees that all reported issues are tracked properly, and no concern
                        goes unnoticed.
                    </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                    <h2 className="text-2xl font-semibold text-red-600 mb-3">User-Friendly</h2>
                    <p className="text-gray-600">
                        Both students and admins enjoy a simple and intuitive interface for reporting
                        and managing issues effortlessly.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            {/* <div className="mt-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
                    To empower the university community by providing a platform where students
                    can voice their concerns and the administration can resolve them efficiently,
                    fostering a better, safer, and more organized campus environment.
                </p>
            </div> */}

            {/* Team / Contact Section */}
            {/* <div className="mt-20 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-red-700 mb-6">Our Team</h2>
                <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
                    Our team consists of dedicated developers and university staff working together
                    to ensure that every student issue is addressed promptly and professionally.
                </p>
            </div> */}
        </div>
    );
};

export default AboutUs;