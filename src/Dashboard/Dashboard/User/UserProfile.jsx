import React, { useContext, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {
  const { user, updateUserProfile, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false); // modal control
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    universityID: "",
    department: "",
  });

  const { data: userInfo = [], refetch } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/user-email/${user?.email}`);
      return response.data;
    },
  });

  const info = userInfo[0] || {};

  // 🔹 ফর্মের ইনপুট পরিবর্তন হ্যান্ডলার
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 ফর্ম সাবমিট করলে আপডেট ফাংশন
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Update Firebase DisplayName & Photo
      await updateUserProfile(formData.name, formData.photoURL);

      // Update MongoDB info
      await axiosSecure.patch(`/user-update/${user?.email}`, {
        name: formData.name,
        photoURL: formData.photoURL,
        universityID: formData.universityID,
        department: formData.department,
      });

      // Local update
      setUser({
        ...user,
        displayName: formData.name,
        photoURL: formData.photoURL,
      });
      refetch();

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your information has been successfully updated.",
      });

      setIsEditing(false);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center min-h-screen px-4">
      <title>User Profile | University</title>

      <h2 className="text-3xl font-semibold text-center mb-8">My Profile</h2>

      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center w-full max-w-md border relative">
        {/* 🔹 Edit Button */}
        <button
          onClick={() => {
            setFormData({
              name: user?.displayName || "",
              photoURL: user?.photoURL || "",
              universityID: info.universityID || "",
              department: info.department || "",
            });
            setIsEditing(true);
          }}
          className="absolute top-4 right-4 text-blue-600 hover:text-blue-800"
        >
          <FaEdit size={24} />
        </button>

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
          {"Student"}
        </span>

        {/* MongoDB Additional Info */}
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
            <strong>Last Sign-in:</strong>{" "}
            {user?.metadata?.lastSignInTime
              ? new Date(user.metadata.lastSignInTime).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>
      ====================================================================
      {/* 🔹 Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleUpdate}
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-2xl font-semibold text-center mb-4">
              Edit Profile
            </h3>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              value={formData.photoURL}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="universityID"
              placeholder="University ID"
              value={formData.universityID}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
