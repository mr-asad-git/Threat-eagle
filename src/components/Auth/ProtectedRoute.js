import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../../data/authUsers';

export default function ProtectedRoute({ role, children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" />;
  }

  return children;
}