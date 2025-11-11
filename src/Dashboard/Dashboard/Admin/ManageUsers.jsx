import React from 'react';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
// import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import AdminRoute from '../../../Routes/AdminRoute';

const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    // Fetch all users
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users');
            return response.data;
        },
    });

    console.log(users);


    const handleRoleChange = async (id, role) => {

        const usersRes = await axiosSecure.patch(`/user-role/${id}`, { role: role });

        console.log("Response for Role from API:", usersRes.data);


        if (usersRes.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Role changed to ${role}`,
                showConfirmButton: false,
                timer: 1500
            });


            if (role === "Fraud" && usersRes.data.deletedIssues > 0) {
                Swal.fire({
                    icon: "warning",
                    title: "The Student Marked as Fraud!",
                    text: `And his ${usersRes.data.deletedIssues} submitted issues have been removed.`,
                    confirmButtonColor: "#d33",
                    confirmButtonText: "OK"
                });
            }



        } else {
            Swal.fire({
                icon: "info",
                title: "No Changes Made",
                text: "The role was already the same.",
            });
        }

    }

    const handleDelete = (id) => {
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

                console.log("user delete from firebase.");

                axiosSecure.delete(`/remove-user/${id}`)
                    .then(res => {
                        if (res.data.success) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The student has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }


    return (
        <AdminRoute>
            <div className="container mx-auto my-10 px-4">

                <title>Manage Users | University</title>

                <h1 className="text-4xl font-bold mb-10 text-center">Manage Users</h1>

                <div className="overflow-x-auto">
                    <table className="table table-xs w-full">
                        <thead>
                            <tr>
                                <th className='text-center'>SL</th>
                                <th className='text-center'>User</th>
                                <th className='text-center'>User Email</th>
                                <th className='text-center'>Actions</th>
                                <th className='text-center'>Remove User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th className='text-center'>{index + 1}</th>
                                    <td className='flex items-center gap-2'>
                                        
                                        <img className='w-8 h-8 rounded-full' src={user.photoURL} alt={user.name} />
                                        <div>{user.name}</div>
                                    </td>
                                    <td className='text-center'>{user.email}</td>



                                    <td className='text-center flex justify-center items-center gap-3 m-1'>
                                        <div>
                                            {
                                                (user.role === "User" || user.role === !"Fraud") ?
                                                    (
                                                        <button
                                                            className='btn btn-sm bg-green-500 text-black hover:text-green-400 border-none rounded-lg whitespace-nowrap'
                                                            onClick={() => handleRoleChange(user._id, 'Admin')}>
                                                            Make Admin
                                                        </button>
                                                    )
                                                    :
                                                    (
                                                        user.role === "Admin" &&
                                                        <span className='px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700'>{user.role}</span>
                                                    )
                                            }
                                        </div>

                                        <div>
                                            {
                                                (user.role === "Admin" || user.role === !"Fraud") ?
                                                    (
                                                        <button
                                                            className='btn btn-sm bg-blue-500 text-black hover:text-blue-400 border-none rounded-lg whitespace-nowrap'
                                                            onClick={() => handleRoleChange(user._id, 'User')}>
                                                            Back as Student
                                                        </button>
                                                    )
                                                    :
                                                    (
                                                        user.role === "User" &&
                                                        <span className='px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700'>Student</span>
                                                    )
                                            }
                                        </div>


                                        <div>
                                            {
                                                (user.role === "User") ?
                                                    (
                                                        <button
                                                            className='btn btn-sm  bg-yellow-500 text-black hover:text-yellow border-none rounded-lg whitespace-nowrap'
                                                            onClick={() => handleRoleChange(user._id, 'Fraud')}>
                                                            Mark as Fraud
                                                        </button>
                                                    )
                                                    :
                                                    (
                                                        user.role === "Fraud" &&
                                                        <span className='px-3 py-1 text-xs font-semibold rounded-full text-red-600 bg-red-100'>{user.role}</span>
                                                    )
                                            }
                                        </div>
                                    </td>

                                    <td className='text-center'>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="btn btn-sm bg-red-500 text-black hover:text-red-400 border-none rounded-lg">Delete</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminRoute>

    );
};

export default ManageUsers;