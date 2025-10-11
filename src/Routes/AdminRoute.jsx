import { Navigate, useLocation } from "react-router";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import Loading from "../Shared/Loading";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Loading></Loading> ;

    const token = localStorage.getItem("jwt");
    if (token) {
        const decoded = jwtDecode(token);
        if (decoded.role === "Admin") {
            return children;
        }
    }

    return <Navigate to="/dashboard/user/profile" state={{ from: location }} replace />;
};

export default AdminRoute;
