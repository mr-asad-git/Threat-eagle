import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminNav() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="backdrop-blur-md shadow-2xl py-3 px-6 flex items-center justify-between fixed top-0 w-full z-50 border-b border-yellow-400 bg-black/80">
      <div className="flex items-center gap-3">
        <img src="/logo192.png" alt="Threat Eagle" className="w-8 h-8 rounded-full" />
        <div>
          <div className="text-yellow-400 font-extrabold">Threat Eagle</div>
          <div className="text-xs text-yellow-200">{currentUser?.email || ''}</div>
        </div>
      </div>

      <ul className="flex items-center gap-3 text-sm">
        <li>
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `px-3 py-1 rounded font-semibold ${isActive ? 'bg-yellow-400 text-black' : 'text-yellow-200 hover:text-yellow-400'}`
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/manage-users"
            className={({ isActive }) =>
              `px-3 py-1 rounded font-semibold ${isActive ? 'bg-yellow-400 text-black' : 'text-yellow-200 hover:text-yellow-400'}`
            }
          >
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/view-reports"
            className={({ isActive }) =>
              `px-3 py-1 rounded font-semibold ${isActive ? 'bg-yellow-400 text-black' : 'text-yellow-200 hover:text-yellow-400'}`
            }
          >
            View Reports
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `px-3 py-1 rounded font-semibold ${isActive ? 'bg-yellow-400 text-black' : 'text-yellow-200 hover:text-yellow-400'}`
            }
          >
            Settings
          </NavLink>
        </li>
        <li>
          <button onClick={handleLogout} className="bg-yellow-400 text-black font-bold px-3 py-1 rounded hover:bg-yellow-500">Logout</button>
        </li>
      </ul>
    </nav>
  );
}
