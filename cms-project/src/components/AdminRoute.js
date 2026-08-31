import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const { isAuthenticated, role } = useSelector((state) => state.auth);
    
    if (!isAuthenticated) {
        return <Navigate to="/admin-login" replace />;
    }

    if (role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;