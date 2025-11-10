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
import AdminProfile from "../Dashboard/Dashboard/Admin/AdminProfile";
import SubmitIssue from "../Dashboard/Dashboard/User/SubmitIssue";
import MyIssues from "../Dashboard/Dashboard/User/MyIssues";
import UpdateIssue from "../Dashboard/Dashboard/User/UpdateIssue";
import ManageIssues from "../Dashboard/Dashboard/Admin/ManageIssues";
import IssueDetails from "../Pages/IssueDetails";
import SavedIssues from "../Pages/SavedIssues";
import AllIssues from "../Pages/AllIssues";
import DetailsForAdmin from "../Dashboard/Dashboard/Admin/DetailsForAdmin";
import AboutUs from "../Pages/AboutUs";
import ManageUsers from "../Dashboard/Dashboard/Admin/ManageUsers";
import Faq from "../Pages/Faq";



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
                path: '/all-issues',
                Component: AllIssues,
            },
            {
                path: '/about',
                Component: AboutUs,
            },
            {
                path: '/faq',
                Component: Faq,
            },
            {
                path: '/details-issue/:id',
                Component: IssueDetails,
            },
            {
                path: '/saved-issues',
                Component: SavedIssues,
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
            //Admin
            {
                path: 'admin-profile',
                Component: AdminProfile,
            },
            {
                path: 'manage-issues',
                Component: ManageIssues,
            },
            {
                path: 'manage-users',
                Component: ManageUsers,
            },
            {
                path: 'details-issue-admin/:id',
                Component: DetailsForAdmin,
            },
            //User
            {
                path: 'student-profile',
                Component: UserProfile,
            },
            {
                path: 'submit-issue',
                Component: SubmitIssue,
            },
            {
                path: 'my-issues',
                Component: MyIssues,
            },
            {
                path: 'update-issue/:id',
                Component: UpdateIssue,
            },
        ]
    },
    {
        path: "*",
        Component: ErrorPage,
    },
]);
