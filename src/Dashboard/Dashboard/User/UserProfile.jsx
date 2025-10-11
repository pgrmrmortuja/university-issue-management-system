import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const { data: userInfo = [] } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-email/${user?.email}`);
            return response.data;
        },
    });

    console.log(userInfo[0]?.role);

    return (
        <div className="container mx-auto flex flex-col justify-center items-center min-h-screen">
          
                <title>User Profile | University</title>
       
            <h2 className="text-3xl font-semibold text-center mb-8">My Profile</h2>
            <div className="flex flex-col items-center">
                <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-md"
                />
                <h3 className="text-2xl font-medium mt-4">{user?.displayName || "No Name"}</h3>
                <p className="text-lg ">{user?.email}</p>
                {userInfo[0]?.role && userInfo[0]?.role !== "User" && (
                    <span className="px-5 py-2 mt-3 text-lg font-semibold bg-blue-600 rounded-full">
                        {userInfo[0]?.role}
                    </span>
                )}
            </div>
            <div className="mt-8 border-t pt-6  text-lg">
                <p><strong>Joining Date:</strong> {user?.metadata?.creationTime || "N/A"}</p>
                <p><strong>Last Sign-in:</strong> {user?.metadata?.lastSignInTime || "N/A"}</p>
            </div>

        </div>
    );
};

export default UserProfile;
