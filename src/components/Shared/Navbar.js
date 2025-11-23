import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getRole, logout } from '../../utils/token';
import { getCurrentUser } from '../../data/authUsers';


export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(getRole());
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const syncUser = () => {
      setRole(getRole());
      setUser(getCurrentUser());
    };
    window.addEventListener('storage', syncUser);
    syncUser();
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setRole(null);
    navigate('/login');
    window.dispatchEvent(new Event('storage'));
  };

  // Profile click handler
  const handleProfileClick = () => {
    if (role === 'Admin') {
      navigate('/admin/dashboard');
    } else if (role === 'Customer') {
      navigate('/customer/profile');
    }
  };

  // Dashboard click handler
  const handleDashboardClick = () => {
    if (role === 'Admin') {
      navigate('/admin/dashboard');
    } else if (role === 'Customer') {
      navigate('/customer/dashboard');
    }
  };

  return (
    <nav className="bg-black border-b-2 border-yellow-500 text-yellow-300 font-mono px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-yellow-400 tracking-widest hover:text-yellow-300">
        ⚡ ThreatEagle
      </Link>

      <div className="flex gap-6 items-center text-sm">
        {role === 'Admin' && (
          <>
            <button onClick={handleDashboardClick} className="hover:text-yellow-400">Dashboard</button>
            <Link to="/admin/manage-users" className="hover:text-yellow-400">Users</Link>
            <Link to="/admin/view-reports" className="hover:text-yellow-400">Reports</Link>
            <Link to="/admin/settings" className="hover:text-yellow-400">Settings</Link>
          </>
        )}

        {role === 'Customer' && (
          <>
            <button onClick={handleDashboardClick} className="hover:text-yellow-400">Dashboard</button>
            <Link to="/customer/my-files" className="hover:text-yellow-400">My Files</Link>
            <Link to="/customer/history" className="hover:text-yellow-400">History</Link>
          </>
        )}

        {!role && (
          <>
            <Link to="/about" className="hover:text-yellow-400">About</Link>
            <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
            {/* Hide Trial for logged-in users */}
            <Link to="/trial" className="hover:text-yellow-400">Trial</Link>
          </>
        )}

        {/* Profile icon and name for logged-in users */}
        {role && user && (
          <button
            onClick={handleProfileClick}
            className="flex items-center gap-2 px-3 py-1 rounded hover:bg-yellow-500/20 border border-yellow-500"
            title="View Profile"
          >
            <span className="inline-block w-8 h-8 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center text-lg">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </span>
            <span className="font-semibold text-yellow-300">{user.name || user.email}</span>
          </button>
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