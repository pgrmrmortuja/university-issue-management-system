import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import StudentRoute from '../../../../src/Routes/StudentRoute'

const MyIssues = () => {

    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();

    const { data: issues = [], refetch } = useQuery({
        queryKey: ['issues', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-issues/${user?.email}`);
            return res.data;
        }
    });
    console.log(issues);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axiosSecure.delete(`/delete-issue/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The issue has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <StudentRoute>
            <div className="container mx-auto px-4 py-10">

                <title>My Submitted Issues | University</title>

                <h1 className="text-3xl md:text-4xl font-bold mb-14 text-center">My Submitted Issues</h1>

                {issues.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                        <p className="text-xl md:text-2xl text-red-600 font-semibold">No Issues Added Yet</p>
                        <p className="text-md md:text-lg text-gray-600">It seems you haven't submitted any issue yet. If you face problem, add your first issue!</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                        {issues.map(item => (
                            <div key={item._id} className="card border border-gray-300 bg-white shadow-lg rounded-lg">
                                {/* <div className='relative'>
                                <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
                                    <img
                                        src={item.agent_image}
                                        alt={item.agent_name}
                                        className="rounded-full border-4 border-pink-400 w-16 h-16 sm:w-20 sm:h-20 object-cover" />
                                </div>
                            </div> */}

                                <figure className="px-6 pt-10 mt-4">
                                    <img
                                        src={item.issue_image}
                                        alt={item.issue_title}
                                        className="rounded-xl w-full h-48 object-cover" />
                                </figure>
                                <div className="p-6 text-gray-800">
                                    <h2 className="text-lg md:text-xl font-semibold mb-2">{item.issue_title}</h2>
                                    <p><span className='font-bold'>Location:</span> {item.issue_location}</p>
                                    <p><span className='font-bold'>Category:</span> {item.issue_category}</p>
                                    <p><span className='font-bold'>Verification Status:</span> <span className={`font-bold ${item.verification_status === 'verified' ? 'text-green-500' : 'text-red-500'}`}>{item.verification_status}</span></p>
                                    <div className="flex justify-between mt-4">
                                        <Link to={`/dashboard/update-issue/${item._id}`}>
                                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Update</button>
                                        </Link>
                                        <button onClick={() => handleDelete(item._id)} className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-600 transition">Delete</button>

                                        <Link to={`/details-issue/${item._id}`}>
                                            <button className='btn border-blue-600 rounded-lg border-2 ml-2'>See Details</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentRoute>

    );
};

export default MyIssues;