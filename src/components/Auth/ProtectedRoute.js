import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../../utils/auth';


export default function ProtectedRoute({ children, role }) {
  if (!isAuthenticated()) return <Navigate to="/" />;
  if (role && getRole() !== role) return <Navigate to="/" />;
  return children;
}