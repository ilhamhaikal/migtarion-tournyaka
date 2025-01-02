import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = Number(localStorage.getItem('role'));
  const location = useLocation();

  // Debug logs
  console.log('Token:', token);
  console.log('Role:', role);
  console.log('Path:', location.pathname);

  // If not authenticated and trying to access protected route
  if (!token && location.pathname !== '/login' && location.pathname !== '/register') {
    return <Navigate to="/login" replace />;
  }

  // If authenticated and trying to access auth pages
  if (token && (location.pathname === '/login' || location.pathname === '/register')) {
    return <Navigate to={role === 3 ? '/' : '/dashboard'} replace />;
  }

  // For role-based access
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to={role === 3 ? '/' : '/dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;