import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = Number(localStorage.getItem('role'));
  
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};