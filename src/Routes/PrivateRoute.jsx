import { Navigate, useLocation} from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../Shared/Loading";


const PrivateRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth();
    const location = useLocation();

    if (loading) return <Loading></Loading>;

    return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
    // return user ? children : signOut();
};

export default PrivateRoute;
