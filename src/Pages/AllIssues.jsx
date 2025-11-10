import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { FaSearch, FaFilter } from 'react-icons/fa';
import BackButton from '../Shared/BackButton';
import PrivateRoute from '../../src/Routes/PrivateRoute'

const AllIssues = () => {
    const axiosSecure = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const { data: issues = [] } = useQuery({
        queryKey: ['issues'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/status/verified`);
            return res.data;
        }
    });

    // Filtered and searched issues
    const filteredIssues = issues.filter(item => {
        const matchesSearch = item.issue_title.toLowerCase().includes(searchQuery.toLowerCase())
            || item.issue_location.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter ? item.issue_category === categoryFilter : true;
        const matchesStatus = statusFilter
            ? (statusFilter === 'solved' ? item.isSolved === true : item.isSolved === false)
            : true;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <PrivateRoute>
            <div className='container mx-auto px-4 py-6'>

                <title>All Issues | University</title>

                <div className="mb-6">
                    <BackButton />
                </div>

                <h1 className="text-4xl font-bold mb-10 text-center text-red-500">All Issues</h1>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
                    {/* Search */}
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search by title or location..."
                            className="input input-bordered w-full pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-500" />
                    </div>

                    {/* Category Filter */}
                    <div className="relative w-full md:w-1/4">
                        <select
                            className="input input-bordered w-full pl-10"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Academic">Academic</option>
                            <option value="Classroom">Classroom</option>
                            <option value="Finance">Finance</option>
                            <option value="Hall">Hall</option>
                            <option value="IT">IT</option>
                            <option value="Library">Library</option>
                            <option value="Canteen">Canteen</option>
                            <option value="Transport">Transport</option>
                        </select>
                        <FaFilter className="absolute left-3 top-3 text-gray-500" />
                    </div>

                    {/* Status Filter */}
                    <div className="relative w-full md:w-1/4">
                        <select
                            className="input input-bordered w-full pl-10"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Status</option>
                            <option value="solved">Solved</option>
                            <option value="not solved">Not Solved</option>
                        </select>
                        <FaFilter className="absolute left-3 top-3 text-gray-500" />
                    </div>
                </div>

                {/* No Data Message */}
                {filteredIssues.length === 0 && (
                    <p className="text-center text-red-500 text-lg font-semibold">No issues found. Try a different search or filter option.</p>
                )}

                {/* Issues Grid */}
                <div className='shadow-2xl shadow-red-400 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filteredIssues.map(item => (
                        <div key={item._id} className="card border border-gray-200 bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">

                            <figure className="px-5 pt-5">
                                <img
                                    src={item.issue_image}
                                    alt={item.issue_title}
                                    className="rounded-lg w-full h-52 object-cover"
                                />
                            </figure>

                            <div className="card-body px-5 py-4">
                                <h2 className="text-xl font-semibold text-gray-800">{item.issue_title}</h2>
                                <p className="text-gray-600"><span className='font-medium'>Category:</span> {item.issue_category}</p>
                                <p className="text-gray-600"><span className='font-medium'>Location:</span> {item.issue_location}</p>
                                <p className="text-gray-600"><span className='font-medium'>Issue Date:</span> {item.issue_date}</p>

                                <div className='flex gap-2'>
                                    <p className="font-medium text-green-500 bg-green-100 rounded-full text-center px-3 py-1 inline-block text-sm">
                                        Admin Verified
                                    </p>

                                    <p className={`font-medium text-center px-3 py-1 inline-block text-sm rounded-full
                                ${item.isSolved ? 'text-blue-700 bg-blue-100 rounded-full' : 'text-red-500 bg-red-100 rounded-full'}`}>
                                        {item.isSolved ? 'Solved' : 'Not Solved'}
                                    </p>
                                </div>

                                <div className="card-actions mt-4">
                                    <Link to={`/details-issue/${item._id}`} className="w-full">
                                        <button className="btn bg-red-500 text-white hover:bg-red-600 transition w-full py-2 rounded-lg">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PrivateRoute>

    );
};

export default AllIssues;
