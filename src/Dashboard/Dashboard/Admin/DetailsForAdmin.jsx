import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { FaThumbsUp, FaCommentAlt, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import BackButton from '../../../Shared/BackButton';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const DetailsForAdmin = () => {
    const { id } = useParams();
    const [issue, setIssue] = useState({});
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    // ইস্যু ডেটা ফেচ
    useEffect(() => {
        const fetchIssue = async () => {
            const res = await axiosSecure.get(`/issue-id/${id}`);
            setIssue(res.data);
        };
        fetchIssue();
    }, [id, axiosSecure]);

    // লাইক সংখ্যা ফেচ
    useEffect(() => {
        const fetchLikes = async () => {
            const res = await axiosSecure.get(`/likes/${id}`);
            setLikes(res.data.count);
            // যদি এই ইউজার আগেই লাইক করে থাকে
            if (res.data.likedUsers?.includes(user?.email)) {
                setIsLiked(true);
            }
        };
        fetchLikes();
    }, [id, user, axiosSecure]);

    // ✅ লাইক হ্যান্ডলার (Updated Version)
    const handleLike = async () => {
        if (!user) return alert('Please login first');

        try {
            // backend এ request পাঠানো
            const res = await axiosSecure.post(`/likes/${id}`, {
                email: user.email,
            });

            // response data destructure করা
            const { success, action, totalLikes } = res.data;

            if (success) {
                // action অনুযায়ী state update
                setIsLiked(action === 'liked');
                setLikes(totalLikes);
            }
        } catch (err) {
            console.error('Like error:', err);
        }
    };

    // page load এ check করবো
    useEffect(() => {
        const checkSaved = async () => {
            if (!user?.email) return;
            try {
                const res = await axiosSecure.get(`/saved/check/${id}?email=${user.email}`);
                setIsSaved(res.data.isSaved);
            } catch (err) {
                console.error(err);
            }
        };

        checkSaved();
    }, [id, user, axiosSecure]);

    // Save / Unsave handler
    const handleSave = async () => {
        if (!user) return alert('Please login first');

        try {
            const res = await axiosSecure.post(`/saves/${id}`, { email: user.email });

            // Toggle state based on backend response
            if (res.data.message.includes('unsaved')) {
                setIsSaved(false);
            } else {
                setIsSaved(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const {
        student_name,
        student_image,
        issue_title,
        issue_location,
        issue_details,
        issue_image,
        issue_date,
        issue_time,
        verification_status,
        isSolved,
    } = issue;

    // ✅ TanStack style function for status change
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ id, verification_status }) => {
            const res = await axiosSecure.patch(`/verification/${id}`, { verification_status });
            return res.data;
        },
        onSuccess: (data, variables) => {
            if (data.modifiedCount > 0) {
                queryClient.invalidateQueries(["issues"]);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: `Status changed to ${variables.verification_status}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
    });

    // ✅ TanStack style function for solve
    const { mutateAsync: markSolved } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/solve/${id}`, { isSolved: true });
            return res.data;
        },
        onSuccess: (data) => {
            if (data.modifiedCount > 0) {
                queryClient.invalidateQueries(["issues"]);
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: "Issue marked as Solved",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
    });

    // ✅ এখন তোমার ফাংশনগুলো হবে useQuery-এর মতো clean
    const handleStatusChange = async (id, verification_status) => {
        await updateStatus({ id, verification_status });
    };

    const handleSolve = async (id) => {
        await markSolved(id);
    };



    return (

        <div>
            <div className="m-6">
                <BackButton />
            </div>
            <div className="flex justify-center w-full min-h-screen bg-white mb-16">

                <title>Issue Details | University</title>


                <div className="w-full max-w-xl p-4 mt-10 bg-white rounded-2xl shadow-md">
                    {/* পোস্ট হেডার */}
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={student_image}
                            alt="User"
                            className="w-12 h-12 rounded-full border"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-900">{student_name}</h2>
                            <p className="text-sm text-gray-500">
                                {issue_date} • {issue_time}
                            </p>
                        </div>
                    </div>

                    {/* পোস্ট টাইটেল */}
                    <h3 className="mb-2 text-lg font-semibold text-gray-800">{issue_title}</h3>

                    {/* লোকেশন */}
                    {issue_location && (
                        <p className="text-sm text-gray-500 mb-2">📍 {issue_location}</p>
                    )}

                    {/* বিস্তারিত */}
                    <p className="mb-3 text-gray-700">{issue_details}</p>

                    {/* ইমেজ */}
                    {issue_image && (
                        <div className="overflow-hidden rounded-xl">
                            <img
                                src={issue_image}
                                alt="Issue"
                                className="object-cover w-full max-h-[500px] rounded-xl"
                            />
                        </div>
                    )}

                    {/* স্ট্যাটাস ব্যাজ */}
                    {/* <div className="flex items-center gap-2 mt-3">
                        {verification_status && (
                            <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${verification_status === 'verified'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}
                            >
                                {verification_status}
                            </span>
                        )}
                        {isSolved ? (
                            <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                                solved
                            </span>
                        ) : (
                            <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                                not solved
                            </span>
                        )}
                    </div> */}


                    <div className='mt-3'>
                        {/* ✅ Solve / Solved Button */}
                        {issue.isSolved ? (
                            <span className='px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mr-2'>solved</span>
                        ) : (
                            issue.verification_status !== "rejected" && (
                                <button
                                    onClick={() => handleSolve(issue._id)}
                                    className='btn btn-neutral btn-sm mr-2'>
                                    Solve
                                </button>
                            )
                        )}

                        {/* ✅ Verify / Reject Section */}
                        {issue.verification_status === "pending" ? (
                            <>
                                <button
                                    onClick={() => handleStatusChange(issue._id, 'verified')}
                                    className='btn btn-success btn-sm mr-2'>
                                    Verify
                                </button>
                                <button
                                    onClick={() => handleStatusChange(issue._id, 'rejected')}
                                    className='btn btn-sm btn-error'>
                                    Reject
                                </button>
                            </>
                        ) : (
                            <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${issue.verification_status === 'verified'
                                    ? 'bg-green-100 text-green-700'
                                    : 'text-red-600 bg-red-100'
                                    }`}>
                                {issue.verification_status}
                            </span>
                        )}
                    </div>





                    {/* লাইক কাউন্ট */}
                    <p className="mt-3 text-sm text-gray-500">
                        👍 {likes} {likes === 1 ? 'Like' : 'Likes'}
                    </p>

                    {/* রিঅ্যাকশন বাটন */}
                    <div className="flex items-center justify-between mt-3 border-t border-gray-200">
                        <button
                            onClick={handleLike}
                            className={`flex items-center justify-center w-1/3 py-2 mt-1 rounded-xl ${isLiked ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                        >

                            <FaThumbsUp className="mr-2 text-lg" />
                            Like
                        </button>

                        {/* <button className="flex items-center justify-center w-1/3 py-2 mt-1 text-gray-600 hover:bg-gray-100 rounded-xl">
                        <FaCommentAlt className="mr-2 text-lg" /> Comment
                    </button> */}

                        <button
                            onClick={handleSave}
                            className="flex items-center justify-center w-1/3 py-2 mt-1 text-gray-600 hover:bg-gray-100 rounded-xl"
                        >
                            {isSaved ? (
                                <FaBookmark className="mr-2 text-lg text-blue-600" />
                            ) : (
                                <FaRegBookmark className="mr-2 text-lg" />
                            )}
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsForAdmin;