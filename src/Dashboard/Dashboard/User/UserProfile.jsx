import React, { useContext } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";

const UserProfile = () => {
   const { user, updateUserProfile, setUser } = useContext(AuthContext);


    const axiosSecure = useAxiosSecure();

    const { data: userInfo = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-email/${user?.email}`);
            return response.data;
        },
    });

    const info = userInfo[0] || {}; // for easier access

    console.log("User Info from MongoDB:", info);

    console.log("user information from userprofile:", info)

    console.log("role of user:", info?.role);

    return (
        <div className="container mx-auto flex flex-col justify-center items-center min-h-screen px-4">
            <title>User Profile | University</title>

            <h2 className="text-3xl font-semibold text-center mb-8">
                My Profile
            </h2>

            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md border">
                <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-blue-400 shadow-md"
                />

                <h3 className="text-2xl font-medium mt-4">
                    {user?.displayName || "No Name"}
                </h3>
                <p className="text-gray-600">{user?.email}</p>

                <span className="px-5 py-2 mt-3 text-lg font-semibold bg-blue-600 text-white rounded-full">
                    {info.role || "Student"}
                </span>

                {/* 🔹 MongoDB Additional Info */}
                <div className="mt-8 border-t pt-6 w-full text-left text-lg space-y-2">
                    <p>
                        <strong>University ID:</strong> {info.universityID || "Not Provided"}
                    </p>
                    <p>
                        <strong>Department:</strong> {info.department || "Not Provided"}
                    </p>
                    <p>
                        <strong>Joining Date:</strong>{" "}
                        {user?.metadata?.creationTime
                            ? new Date(user.metadata.creationTime).toLocaleString()
                            : "N/A"}
                    </p>
                    <p>
                        <strong>Last Sign-in:</strong> {user?.metadata?.lastSignInTime ? new Date(user.metadata.creationTime).toLocaleString()
                            : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
