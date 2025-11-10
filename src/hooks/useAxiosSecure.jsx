import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const axiosSecure = axios.create({
        baseURL: "https://university-issue-management-system.vercel.app",
    });

    // Request Interceptor (Token Set)
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("jwt");
        console.log("JWT from localStorage:", token); // Debugging
        if (token) {
            console.log("Sending Token:", token); // DEBUGGING
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // Response Interceptor (403 Error Handle  Logout)
    axiosSecure.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response && error.response.status === 403) {
                console.log("403 Forbidden - Logging out user...");
                await logOut(); 
                navigate("/login"); 
            }
            return Promise.reject(error);
        }
    );

    return axiosSecure;
};

export default useAxiosSecure;
