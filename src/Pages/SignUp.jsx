import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router";
import Swal from 'sweetalert2'
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../Providers/AuthProvider';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, getJwt } = useContext(AuthContext);
  const navigate = useNavigate();



  const onSubmit = async (data) => {
    try {
      const imageFile = data.photoURL[0]; // get selected file

      if (!imageFile) {
        Swal.fire({
          icon: "warning",
          title: "No Image Selected",
          text: "Please select a profile image.",
        });
        return;
      }

      // Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", imageFile);

      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;
        data.photoURL = imageUrl; // replace file with hosted URL

        // 🔥 Then proceed with Firebase user creation & DB insertion
        createUser(data.email, data.password)
          .then(result => {
            const uid = result.user?.uid;

            updateUserProfile(data.name, data.photoURL)
              .then(() => {
                const userInfo = {
                  name: data.name,
                  photoURL: data.photoURL,
                  universityID: data.universityID,
                  department: data.department,
                  email: data.email,
                  role: "User",
                  uid: uid,
                };

                axiosPublic.post("/users", userInfo)
                  .then(res => {
                    if (res.data.insertedId) {

                      getJwt(data.email); // stores token in localStorage

                      reset();
                      Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Registration Successful.',
                        showConfirmButton: false,
                        timer: 1500
                      });
                      navigate("/");

                    }
                  })
              })
              .catch(error => console.log(error))
          })
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image upload failed!",
      });
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      <title>Sign Up | University</title>

      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-red-300">
        <h2 className="mb-6 text-3xl font-bold text-center text-red-700">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter your name"
              className="w-full input input-bordered bg-white"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">Name is required</p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Profile Photo
            </label>
            <input
              {...register("photoURL", { required: true })}
              type="file"
              accept="image/*"
              className="w-full text-black bg-white border-2 border-gray-300 rounded-lg file-input"
            />
            {errors.photoURL && (
              <p className="mt-1 text-sm text-red-600">Profile photo is required</p>
            )}
          </div>

          {/* University ID */}
          <div>
            <label className="block mb-1 font-medium text-black">
              University ID
            </label>
            <input
              {...register("universityID", { required: true })}
              type="text"
              placeholder="Enter Your University ID"
              className="w-full input input-bordered bg-white"
            />
            {errors.universityID && (
              <p className="mt-1 text-sm text-red-600">University ID is required</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Department
            </label>
            <input
              {...register("department", { required: true })}
              type="text"
              placeholder="Enter your department"
              className="w-full input input-bordered bg-white"
            />
            {errors.department && (
              <p className="mt-1 text-sm text-red-600">Department is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered bg-white"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium text-black">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern:
                  /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              placeholder="Enter your password"
              className="w-full input input-bordered bg-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-black"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {/* Password Validation Errors */}
            {errors.password?.type === "required" && (
              <p className="mt-1 text-sm text-red-600">
                Password is required
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="mt-1 text-sm text-red-600">
                Minimum 6 characters required
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="mt-1 text-sm text-red-600">
                Must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="mt-1 text-sm text-red-600">
                Must include uppercase, lowercase, number & symbol
              </p>
            )}
          </div>

          {/* Register Button */}
          <button className="w-full py-2 font-semibold text-white transition duration-300 bg-red-600 rounded-lg hover:bg-red-700">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-black-300" />
          <span className="mx-3 text-sm text-black">OR</span>
          <hr className="flex-1 border-black-300" />
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-red-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;