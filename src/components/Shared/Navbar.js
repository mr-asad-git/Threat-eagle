import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, logout } from '../../utils/token';

export default function Navbar() {
  const navigate = useNavigate();
  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black border-b-2 border-yellow-500 text-yellow-300 font-mono px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-yellow-400 tracking-widest hover:text-yellow-300">
        ⚡ ThreatEagle
      </Link>

      <div className="flex gap-6 items-center text-sm">
        {role === 'Admin' && (
          <>
            <Link to="/admin/dashboard" className="hover:text-yellow-400">Dashboard</Link>
            <Link to="/admin/manage-users" className="hover:text-yellow-400">Users</Link>
            <Link to="/admin/view-reports" className="hover:text-yellow-400">Reports</Link>
            <Link to="/admin/settings" className="hover:text-yellow-400">Settings</Link>
          </>
        )}

        {role === 'Customer' && (
          <>
            <Link to="/customer/dashboard" className="hover:text-yellow-400">Dashboard</Link>
            <Link to="/customer/my-files" className="hover:text-yellow-400">My Files</Link>
            <Link to="/customer/history" className="hover:text-yellow-400">History</Link>
            <Link to="/customer/profile" className="hover:text-yellow-400">Profile</Link>
          </>
        )}

        {!role && (
          <>
            <Link to="/about" className="hover:text-yellow-400">About</Link>
            <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
          </>
        )}

        {role ? (
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 font-bold border border-yellow-500"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-yellow-400">Login</Link>
            <Link to="/signup" className="hover:text-yellow-400">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}