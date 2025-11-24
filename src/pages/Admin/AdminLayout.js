import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-yellow-300 font-mono">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-yellow-500 p-6 fixed h-screen">
        <h2 className="text-2xl font-bold text-yellow-400 mb-10 tracking-wide">🛡️ Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'hover:bg-yellow-700 text-yellow-300'
              }`
            }
          >
            🛡️ Dashboard
          </NavLink>
          <NavLink
            to="/admin/manage-users"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'hover:bg-yellow-700 text-yellow-300'
              }`
            }
          >
            👥 Manage Users
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'hover:bg-yellow-700 text-yellow-300'
              }`
            }
          >
            ⚙️ Settings
          </NavLink>
          <NavLink
            to="/admin/reports"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-yellow-500 text-black font-bold'
                  : 'hover:bg-yellow-700 text-yellow-300'
              }`
            }
          >
            📊 View Reports
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full px-6 pt-nav py-10">{children}</main>
    </div>
  );
}