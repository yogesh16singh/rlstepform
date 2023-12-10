import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children }) => {
    const auth = useSelector((state: any) => state?.auth?.isAuthenticated);

    return auth ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;