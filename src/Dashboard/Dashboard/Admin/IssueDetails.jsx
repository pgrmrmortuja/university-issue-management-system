import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
// import Review from './Review';
import { AuthContext } from '../../../Providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const IssueDetails = () => {

    const { id } = useParams();
    const [issue, setIssue] = useState({});
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const userEmail = user?.email;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIssue = async () => {
            const response = await axiosSecure.get(`/issue-id/${id}`);
            setIssue(response.data);
        };

        fetchIssue();
    }, [id, axiosSecure]);

    const {
        _id,
        student_name,
        student_email,
        student_image,
        issue_title,
        issue_location,
        issue_details,
        issue_image
    } = issue;

    console.log('issue for details', issue);

    const saveIssue = {
        issue_id: _id,
        student_name,
        student_email,
        student_image,
        issue_title,
        issue_location,
        issue_details,
        issue_image,
        userEmail
    };

    // const handleWishlist = async event => {
    //     event.preventDefault();

    //     if (!issue || !issue._id) return;

    //     try {

    //         const checkRes = await axiosSecure.get(`/wishlists/check/${_id}?userEmail=${userEmail}`);
    //         if (checkRes.data.exists) {
    //             Swal.fire({
    //                 position: "top",
    //                 icon: "warning",
    //                 title: `${issue_title} is already in your wishlist.`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //             return;
    //         }


    //         const issueRes = await axiosSecure.post('/wishlists', saveIssue);

    //         if (issueRes.data.insertedId) {
    //             navigate("/all-issues");
    //             Swal.fire({
    //                 position: "top",
    //                 icon: "success",
    //                 title: `${issue_title} has been added to your wishlist.`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             });
    //         }
    //     } catch (error) {
    //         console.error("Error adding to wishlist:", error);
    //         Swal.fire({
    //             position: "top",
    //             icon: "error",
    //             title: "Something went wrong. Please try again later.",
    //             showConfirmButton: false,
    //             timer: 1500
    //         });
    //     }
    // };



    return (
        <div className='container p-4 mx-auto'>

            <title>Details | University</title>

            <h2 className="mb-5 text-3xl font-bold text-center">Issue Details</h2>
            <div className="p-5  rounded-lg hero  sm:p-10">
                <div className="flex flex-col items-center gap-5 hero-content">
                    <img
                        src={issue_image}
                        alt={issue_title}
                        className="w-full max-w-xs rounded-lg shadow-lg md:max-w-sm"
                    />
                    <div>
                        <h1 className="text-2xl font-semibold sm:text-3xl">{issue_title}</h1>
                        <p className="mt-2 text-lg">
                            <strong>Location:</strong> {issue_location}
                        </p>
                        <p className="mt-2 text-lg">
                            <strong>Student Name:</strong> {student_name}
                        </p>
                        <p className="mt-2 text-lg">
                            <strong>Student Email:</strong> {student_email}
                        </p>
                        <p className="mt-2 text-lg">
                            <strong>Description:</strong> {issue_details}
                        </p>


                        <button
                            // onClick={handleWishlist}
                            className="mt-4 text-white bg-pink-500 btn hover:bg-pink-600"
                        >
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>

            {/* <Review
                saveIssue={saveIssue}

            >

            </Review> */}
        </div>
    );
};

export default IssueDetails;