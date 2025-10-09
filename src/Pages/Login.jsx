import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router";
import Swal from 'sweetalert2'
import { toast } from "react-toastify";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";


const Login = () => {

    const [error, setError] = useState({});
    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [disabled, setDisabled] = useState(true);
    const { signIn, googleSignIn, setUser, user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation;
    const from = location.state?.from?.pathname || "/";


    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then((result) => {
                setUser(result.user);
                navigate(from, { replace: true });
                toast.success("Login successfully!");
            })
            .catch((err) => {
                console.log("Error", err.message);
                setError({ ...error, login: err.code });
                toast.error("Login failed. Please try again");
            })
    }

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
                            title: 'Login Successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    })
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }



    return (
         <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-400">
      <title>Login | University</title>

      {/* Login Card */}
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-pink-300">
        <h2 className="mb-6 text-3xl font-bold text-center text-pink-700">
          Welcome 👋
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-800">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full input input-bordered bg-white text-gray-900"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block mb-1 font-medium text-gray-800">
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full input input-bordered bg-white text-gray-900"
              required
            />

            {/* Show/Hide Password Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full py-2 font-semibold text-white transition duration-300 bg-pink-600 rounded-lg hover:bg-pink-700">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-sm text-gray-600">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <div className="flex flex-col items-center">
          <p className="mb-2 font-medium text-gray-800">
            Continue with Google
          </p>
          <button
            onClick={handleGoogleSignIn}
            className="p-3 text-4xl transition-transform duration-300 rounded-full hover:scale-110 hover:bg-pink-100"
          >
            <FcGoogle />
          </button>
        </div>

        {/* Register Link */}
        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-pink-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
    );
};

export default Login;