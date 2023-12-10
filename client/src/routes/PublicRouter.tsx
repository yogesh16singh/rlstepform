import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PublicRouter = ({ children }) => {
    const auth = useSelector((state: any) => state?.auth?.isAuthenticated);

    return auth ? <Navigate to="/userdetails" replace /> : children;
};

export default PublicRouter;