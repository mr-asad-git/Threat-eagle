import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function CustomerNav() {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="backdrop-blur-md shadow-2xl py-3 px-4 flex items-center justify-between fixed top-0 w-full z-50 border-b border-yellow-400 bg-black/70">
      <div className="flex items-center gap-3">
        <img src="/logo192.png" alt="Threat Eagle" className="w-8 h-8 rounded-full" />
        <div>
          <div className="text-yellow-400 font-extrabold">Threat Eagle</div>
          <div className="text-xs text-yellow-200">{currentUser ? currentUser.email : ''}</div>
        </div>
      </div>

      <ul className="flex items-center gap-3 text-sm">
        <li>
          <Link to="/customer/dashboard" className="text-yellow-200 hover:text-yellow-400 px-3 py-1 rounded">Dashboard</Link>
        </li>
        <li>
          <Link to="/customer/my-files" className="text-yellow-200 hover:text-yellow-400 px-3 py-1 rounded">My Files</Link>
        </li>
        <li>
          <Link to="/customer/history" className="text-yellow-200 hover:text-yellow-400 px-3 py-1 rounded">Scan History</Link>
        </li>
        <li>
          <Link to="/customer/profile" className="text-yellow-200 hover:text-yellow-400 px-3 py-1 rounded">Profile</Link>
        </li>
        <li>
          <button onClick={handleLogout} className="bg-yellow-400 text-black font-bold px-3 py-1 rounded hover:bg-yellow-500">Logout</button>
        </li>
      </ul>
    </nav>
  );
}
