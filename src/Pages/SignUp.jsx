import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router";
import Swal from 'sweetalert2'
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn, user } = useContext(AuthContext);
    const navigate = useNavigate();


    // const uid = user?.uid;
    // console.log("user er uid signup er time e", uid);

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: "User",
                    uid: result.user?.uid,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    })
            })
    }

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                const uid = result.user?.uid;
                console.log("jokhon user create holo", loggedUser);
                console.log("user create uid", uid);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log("jokhon create hoye update holo", data);
                        //create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: "User",
                            uid: uid,
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database.');
                                    reset();
                                    Swal.fire({
                                        position: 'top',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                        console.log('user profile info updated')

                    })
                    .catch(error => console.log(error))
            })
    };



    return  (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400">
      <title>Sign Up | University</title>

      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-pink-300">
        <h2 className="mb-6 text-3xl font-bold text-center text-pink-700">
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

          {/* Photo URL */}
          <div>
            <label className="block mb-1 font-medium text-black">
              Photo URL
            </label>
            <input
              {...register("photoURL", { required: true })}
              type="text"
              placeholder="Enter photo URL"
              className="w-full input input-bordered bg-white"
            />
            {errors.photoURL && (
              <p className="mt-1 text-sm text-red-600">Photo URL is required</p>
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
          <button className="w-full py-2 font-semibold text-white transition duration-300 bg-pink-600 rounded-lg hover:bg-pink-700">
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-black-300" />
          <span className="mx-3 text-sm text-black">OR</span>
          <hr className="flex-1 border-black-300" />
        </div>

        {/* Google Sign In */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium text-black">
            Continue With
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="p-3 text-4xl transition-transform duration-300 rounded-full hover:scale-110 hover:bg-pink-100"
          >
            <FcGoogle />
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-pink-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
    );
};

export default SignUp;