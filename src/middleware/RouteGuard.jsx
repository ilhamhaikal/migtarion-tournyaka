import { Navigate, useLocation } from 'react-router-dom';

// Definisikan konstanta untuk role
const ROLE_USER = 3;
const RESTRICTED_ROLES = [ROLE_USER]; // Role yang tidak boleh akses dashboard

const RouteGuard = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const rawRole = localStorage.getItem('role');
  // Pastikan konversi ke number
  const userRole = rawRole ? Number(rawRole) : null;

  // Tambahan debugging untuk memastikan
  console.log('Token:', !!token);
  console.log('Raw role value:', rawRole);
  console.log('Converted role:', userRole);
  console.log('Is in restricted roles:', RESTRICTED_ROLES.includes(userRole));
  console.log('Is in allowed roles:', allowedRoles.includes(userRole));

  // User tidak login
  if (!token || userRole === null) {
    console.log('No token or invalid role, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Jika path mengandung 'dashboard' atau 'admin' dan user memiliki role 3, redirect
  if (
    (location.pathname.includes('/dashboard') || 
    location.pathname.includes('/admin')) &&
    RESTRICTED_ROLES.includes(userRole)
  ) {
    console.log('Access denied: user role not allowed to access dashboard');
    return <Navigate to="/" replace />;
  }

  // Jika role tidak termasuk dalam allowedRoles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    console.log('Access denied: role not allowed');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RouteGuard;
