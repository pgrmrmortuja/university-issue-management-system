import {
    createBrowserRouter
} from "react-router";
// import '../../src/index.css'
import MainLayout from "../Layout/MainLayout";
import HomeLayout from "../Layout/Home/HomeLayout";
import ErrorPage from "../Shared/ErrorPage";
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import DashboardLayout from "../Dashboard/Dashboard/DashboardLayout";
import UserProfile from "../Dashboard/Dashboard/User/UserProfile";



export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
            { 
                index: true, 
                Component: HomeLayout 
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/signup',
                Component: SignUp,
            },
        ]
    },
    {
        path: "/dashboard",
        Component: DashboardLayout,
        children: [
            //User
            {
                path: 'user-profile',
                Component: UserProfile,
            },
        ]
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
