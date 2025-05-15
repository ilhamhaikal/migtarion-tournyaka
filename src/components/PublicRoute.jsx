import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isAuth = localStorage.getItem('token');
  const userRole = Number(localStorage.getItem('role'));

  if (isAuth) {
    return <Navigate to={userRole === 3 ? '/' : '/admin/dashboard'} replace />;
  }

  return children;
};

export default PublicRoute;