import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import { accessTokenSelector } from "../../store/authSlice";


export const PrivateRoute = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const token = useAppSelector(accessTokenSelector);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};