import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';

const ManageIssues = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all products
    const { data: issues = [], refetch } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const response = await axiosSecure.get('/get-issues');
            return response.data;
        },
    });

    console.log(issues);


    const handleStatusChange = async (id, verification_status) => {

        const issueRes = await axiosSecure.patch(`/verification/${id}`, { verification_status: verification_status });

        console.log("Response for status from API:", issueRes.data);


        if (issueRes.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Status changed to ${verification_status}`,
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "No Changes Made",
                text: "The status was already the same.",
            });
        }

    }




    return (
        <div className="container mx-auto my-10 px-4">

            <title>Manage Issues | University</title>

            <h1 className="text-4xl font-bold mb-10 text-center">Manage Issues</h1>

            <div className="overflow-x-auto">
                <table className="table table-xs w-full">
                    <thead>
                        <tr>
                            <th className='text-center'>SL</th>
                            <th className='text-center'>Issue Title</th>
                            <th className='text-center'>Location</th>
                            <th className='text-center'>Student Name</th>
                            <th className='text-center'>Student Email</th>
                            <th className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, index) => (
                            <tr key={issue._id}>
                                <th className='text-center'>{index + 1}</th>
                                <td className='text-center'>{issue.issue_title}</td>
                                <td className='text-center'>{issue.issue_location}</td>
                                <td className='text-center'>{issue.student_name}</td>
                                <td className='text-center'>{issue.student_email}</td>
                                <td className='text-center'>
                                    {issue.verification_status === "pending" ? (
                                        <>
                                            <button onClick={() => handleStatusChange(issue._id, 'verified')} className='btn btn-success btn-sm mr-2'>Verify</button>
                                            <button onClick={() => handleStatusChange(issue._id, 'rejected')} className='btn btn-sm btn-error'>Reject</button>
                                        </>
                                    ) : (
                                        <span className={`font-bold ${issue.verification_status === 'verified' ? 'text-green-500' : 'text-red-500'}`}>{issue.verification_status}</span>
                                    )}
                                    <Link to={`/details-issue/${issue._id}`}>
                                        <button className='btn btn-link btn-sm ml-2'>Details</button>
                                    </Link>
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageIssues;