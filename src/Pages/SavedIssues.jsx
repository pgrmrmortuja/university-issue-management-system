import React, { useContext, useEffect, useState } from "react";
import { FaTrashAlt, FaBookmark } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router";
import BackButton from "../Shared/BackButton";

const SavedIssues = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    const { data: issues = [], refetch } = useQuery({
        queryKey: ['issues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/saved/${user.email}`);
            return res.data;
        }
    });
    console.log(issues);

    console.log("issue from savecollection", issues)

 
    const handleDelete = (savedId) => {
        if (!user?.email) return alert('Please login first');

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/delete-saved/${savedId}?email=${user.email}`);

                    if (res.data.success) {
                        refetch(); // saved issues list refetch
                        Swal.fire({
                            title: "Deleted!",
                            text: res.data.message,
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: res.data.message,
                            icon: "error"
                        });
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the saved post.",
                        icon: "error"
                    });
                }
            }
        });
    };

    console.log("after delete saved issues: ", issues)

    return (
        <div>
            <div className="m-6">
                <BackButton />
            </div>

            <div className="min-h-screen py-6 px-4">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-semibold mb-5 text-gray-800 flex items-center gap-2">
                        <FaBookmark className="text-blue-600" /> Saved Issues
                    </h1>

                
                    {issues.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">
                            You haven’t saved any issues yet.
                        </p>
                    ) : (
                
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {issues.map((issue) => (
                                <div
                                    key={issue._id}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
                                >
                                
                                    {issue.issue_image && (
                                        <img
                                            src={issue.issue_image}
                                            alt="Issue"
                                            className="w-full h-48 object-cover"
                                        />
                                    )}

                               
                                    <div className="p-4">
                                        <h2 className="font-semibold text-gray-800 mb-1">
                                            {issue.issue_title || "Untitled Issue"}
                                        </h2>
                                    </div>

                                    {/* Remove / Unsave Button */}
                                    <div className="flex justify-end p-3 border-t">
                                        <Link to={`/details-issue/${issue._id}`}>
                                            <button className='btn btn-link btn-sm ml-2'>See Details</button>
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(issue.savedId)}
                                            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <FaTrashAlt /> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedIssues;
