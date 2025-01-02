import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = Number(localStorage.getItem('role'));
  
  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if role is allowed
  if (!allowedRoles.includes(role)) {
    // Redirect to home for role 3, dashboard for others
    return <Navigate to={role === 3 ? '/' : '/dashboard'} replace />;
  }
  
  return children;
};

export default ProtectedRoute;