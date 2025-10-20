import { useState } from 'react';
import { findUser, updatePassword } from '../../data/userStore';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Admin data 
  
  // Users Data 
  // const users = [
  //   { id: 1, name: 'Alice Khan', email: 'alice@threat.com', role: 'Customer', status: 'Active' },
  //   { id: 2, name: 'Bob Malik', email: 'bob@threat.com', role: 'Customer', status: 'Suspended' },
  //   { id: 3, name: 'Charlie Admin', email: 'charlie@threat.com', role: 'Admin', status: 'Active' },
  // ];


  // Admin settings data

  
const [currentPassword, setCurrentPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [passwordStatus, setPasswordStatus] = useState(null);

const currentUser = JSON.parse(localStorage.getItem('currentUser'));


const handleChangePassword = () => {
  if (!currentUser || currentUser.role !== 'Admin') {
    setPasswordStatus('❌ No admin session found.');
    return;
  }

  const match = findUser(currentUser.email, currentPassword);
  if (!match) {
    setPasswordStatus('❌ Incorrect current password.');
    return;
  }

  updatePassword(currentUser.email, newPassword);
  setPasswordStatus('✅ Password changed successfully!');
  setCurrentPassword('');
  setNewPassword('');
};
  const [scanEnabled, setScanEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [auditLogging, setAuditLogging] = useState(true);
  const [roleAccess, setRoleAccess] = useState({
    customer: true,
    admin: true,
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
  return (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black/40 border-2 border-yellow-500 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-bold text-yellow-300">Total Users</h2>
          <p className="text-3xl font-bold text-yellow-400 mt-2">1,248</p>
        </div>
        <div className="bg-black/40 border-2 border-green-500 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-bold text-green-300">Files Scanned</h2>
          <p className="text-3xl font-bold text-green-400 mt-2">8,392</p>
        </div>
        <div className="bg-black/40 border-2 border-red-500 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-bold text-red-300">Threats Detected</h2>
          <p className="text-3xl font-bold text-red-400 mt-2">312</p>
        </div>
      </div>

      {/* Activity Chart */}
      <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-yellow-300 mb-4">📈 Weekly Activity</h3>
        <div className="h-64 bg-black/20 border border-yellow-500 rounded-lg flex items-center justify-center text-yellow-500">
          <span className="text-sm">[Chart Placeholder] — Integrate chart.js or Recharts here</span>
        </div>
      </div>

      {/* Recent Logs Table */}
      <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-yellow-300 mb-4">🧾 Recent Admin Logs</h3>
        <table className="w-full text-sm border-collapse border border-yellow-500">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="p-2 border border-yellow-400">#</th>
              <th className="p-2 border border-yellow-400">Action</th>
              <th className="p-2 border border-yellow-400">User</th>
              <th className="p-2 border border-yellow-400">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 text-yellow-200">
            {[
              { action: 'Deleted corrupted file', user: 'admin@threat.com', time: '10:42 AM' },
              { action: 'Approved new user', user: 'admin@threat.com', time: '09:15 AM' },
              { action: 'Updated scan rules', user: 'admin@threat.com', time: 'Yesterday' },
            ].map((log, i) => (
              <tr key={i}>
                <td className="p-2 border border-yellow-500">{i + 1}</td>
                <td className="p-2 border border-yellow-500">{log.action}</td>
                <td className="p-2 border border-yellow-500">{log.user}</td>
                <td className="p-2 border border-yellow-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* System Status Panel */}
      <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-yellow-300 mb-4">🧩 System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/40 border border-green-500 rounded-lg p-4">
            <h4 className="text-green-300 font-semibold">Server Uptime</h4>
            <p className="text-green-400 text-2xl mt-2">99.98%</p>
            <p className="text-yellow-200 text-sm mt-1">Last checked: 2 mins ago</p>
          </div>
          <div className="bg-black/40 border border-blue-500 rounded-lg p-4">
            <h4 className="text-blue-300 font-semibold">API Health</h4>
            <p className="text-blue-400 text-2xl mt-2">Operational</p>
            <p className="text-yellow-200 text-sm mt-1">Latency: 120ms</p>
          </div>
          <div className="bg-black/40 border border-red-500 rounded-lg p-4">
            <h4 className="text-red-300 font-semibold">Security Alerts</h4>
            <p className="text-red-400 text-2xl mt-2">3</p>
            <p className="text-yellow-200 text-sm mt-1">Last: 1 hour ago</p>
          </div>
        </div>
      </div>

      {/* Extended Logs */}
      <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-bold text-yellow-300 mb-4">📜 Extended Admin Logs</h3>
        <table className="w-full text-sm border-collapse border border-yellow-500">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="p-2 border border-yellow-400">#</th>
              <th className="p-2 border border-yellow-400">Action</th>
              <th className="p-2 border border-yellow-400">User</th>
              <th className="p-2 border border-yellow-400">Timestamp</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 text-yellow-200">
            {[
              { action: 'Reset user password', user: 'admin@threat.com', time: '2 days ago' },
              { action: 'Exported report logs', user: 'admin@threat.com', time: '3 days ago' },
              { action: 'Changed system settings', user: 'admin@threat.com', time: 'Last week' },
              { action: 'Reviewed flagged file', user: 'admin@threat.com', time: 'Last week' },
              { action: 'Added new admin', user: 'admin@threat.com', time: '2 weeks ago' },
            ].map((log, i) => (
              <tr key={i}>
                <td className="p-2 border border-yellow-500">{i + 4}</td>
                <td className="p-2 border border-yellow-500">{log.action}</td>
                <td className="p-2 border border-yellow-500">{log.user}</td>
                <td className="p-2 border border-yellow-500">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-20">
        <h3 className="text-xl font-bold text-yellow-300 mb-4">📌 Recent Activity Feed</h3>
        <ul className="space-y-3 text-yellow-200 text-sm">
          <li>🔄 System backup completed successfully — 2 minutes ago</li>
          <li>🛠️ Maintenance mode enabled — 1 hour ago</li>
          <li>📤 Report sent to security@threateagle.io — 3 hours ago</li>
          <li>🔐 Admin credentials updated — Yesterday</li>
          <li>📁 12 new files scanned — 2 days ago</li>
          <li>🚨 Threat alert resolved — 3 days ago</li>
          <li>📈 Weekly report generated — 5 days ago</li>
        </ul>
      </div>
    </>
  );
      case 'users':
  return (
    <>
      {/* User Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-black/40 border-2 border-yellow-500 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-bold text-yellow-300">Total Users</h2>
          <p className="text-3xl font-bold text-yellow-400 mt-2">1,248</p>
        </div>
        <div className="bg-black/40 border-2 border-green-500 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-bold text-green-300">Active Users</h2>
          <p className="text-3xl font-bold text-green-400 mt-2">1,032</p>
        </div>
        <div className="bg-black/40 border-2 border-red-500 rounded-xl p-6 shadow-lg text-center">
          <h2 className="text-lg font-bold text-red-300">Suspended Accounts</h2>
          <p className="text-3xl font-bold text-red-400 mt-2">42</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search users by name or email..."
          className="w-full bg-[#1a1a1a] text-yellow-200 placeholder-yellow-500 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all"
        />

      </div>

      {/* User Table */}
      <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-10 overflow-x-auto">
        <h3 className="text-xl font-bold text-yellow-300 mb-4">👥 User Directory</h3>
        <table className="min-w-full text-sm border-collapse border border-yellow-500">
          <thead className="bg-yellow-500 text-black">
            <tr>
              <th className="p-2 border border-yellow-400">#</th>
              <th className="p-2 border border-yellow-400">Name</th>
              <th className="p-2 border border-yellow-400">Email</th>
              <th className="p-2 border border-yellow-400">Role</th>
              <th className="p-2 border border-yellow-400">Status</th>
              <th className="p-2 border border-yellow-400">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-black/20 text-yellow-200">
            {[
              { name: 'Ayesha Khan', email: 'ayesha@threat.com', role: 'Admin', status: 'Active' },
              { name: 'Bilal Raza', email: 'bilal@threat.com', role: 'User', status: 'Suspended' },
              { name: 'Zara Malik', email: 'zara@threat.com', role: 'Moderator', status: 'Active' },
              { name: 'Ali Haider', email: 'ali@threat.com', role: 'User', status: 'Active' },
              { name: 'Fatima Noor', email: 'fatima@threat.com', role: 'User', status: 'Pending' },
            ].map((user, i) => (
              <tr key={i}>
                <td className="p-2 border border-yellow-500">{i + 1}</td>
                <td className="p-2 border border-yellow-500">{user.name}</td>
                <td className="p-2 border border-yellow-500">{user.email}</td>
                <td className="p-2 border border-yellow-500">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      user.role === 'Admin'
                        ? 'bg-yellow-500 text-black'
                        : user.role === 'Moderator'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-yellow-200'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-2 border border-yellow-500">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      user.status === 'Active'
                        ? 'bg-green-500 text-black'
                        : user.status === 'Suspended'
                        ? 'bg-red-500 text-white'
                        : 'bg-yellow-300 text-black'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="p-2 border border-yellow-500 space-x-2">
                  <button className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400 text-xs font-semibold">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400 text-xs font-semibold">
                    Suspend
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-between items-center text-yellow-200 text-sm mb-20">
        <span>Showing 1–5 of 1,248 users</span>
        <div className="space-x-2">
          <button className="px-3 py-1 bg-[#1a1a1a] border border-yellow-500 rounded hover:bg-yellow-700">Prev</button>
          <button className="px-3 py-1 bg-yellow-500 text-black rounded hover:bg-yellow-400">Next</button>
        </div>
      </div>
    </>
  );
      case 'settings':    
        return (
          <div className="min-h-screen bg-black text-yellow-300 font-mono px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
          ⚙️ System Settings
        </h1>

        {/* Feature Toggles */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">🔧 Feature Controls</h2>
          <div className="space-y-4">
            <Toggle
              label="Enable File Scanning"
              value={scanEnabled}
              onChange={() => setScanEnabled(!scanEnabled)}
            />
            <Toggle
              label="Enable Notifications"
              value={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            />
            <Toggle
              label="Enable Audit Logging"
              value={auditLogging}
              onChange={() => setAuditLogging(!auditLogging)}
            />
          </div>
        </div>

        {/* Role Access */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">🛡 Role Access</h2>
          <div className="space-y-4">
            <Toggle
              label="Customer Access"
              value={roleAccess.customer}
              onChange={() =>
                setRoleAccess((prev) => ({ ...prev, customer: !prev.customer }))
              }
            />
            <Toggle
              label="Admin Access"
              value={roleAccess.admin}
              onChange={() =>
                setRoleAccess((prev) => ({ ...prev, admin: !prev.admin }))
              }
            />
          </div>
        </div>

        {/* Change Password */}
        
        <div className="mb-10">
      <h2 className="text-xl font-bold text-yellow-300 mb-4">🔐 Change Password</h2>
      <div className="space-y-4">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
          className="w-full bg-[#1a1a1a] text-yellow-200 placeholder-yellow-500 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
          className="w-full bg-[#1a1a1a] text-yellow-200 placeholder-yellow-500 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg border-2 border-yellow-500 hover:bg-yellow-500 transition-all"
          onClick={handleChangePassword}
        >
          Change Password
        </button>
        {passwordStatus && (
          <div className="text-sm mt-2 text-yellow-300 font-semibold">{passwordStatus}</div>
        )}
      </div>
    </div>

        {/* Save Button */}
        <div className="text-center">
          <button
            className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg border-2 border-yellow-500 hover:bg-yellow-500 transition-all"
            onClick={() => alert('Settings saved successfully!')}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
    
        );
      case 'reports':
        return (
          <div className="bg-black/30 border border-yellow-500 rounded-xl p-6">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">📊 View Reports</h3>
            <p className="text-yellow-200">[Reports dashboard goes here]</p>
          </div>
        );
      default:
        return null;
    }
  };

  
  return (
    <div className="flex min-h-screen bg-black text-yellow-300 font-mono">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-yellow-500 p-6 fixed h-screen">
        <h2 className="text-2xl font-bold text-yellow-400 mb-10 tracking-wide">🛡️ Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'dashboard'
                ? 'bg-yellow-500 text-black font-bold'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            🛡️ Dashboard
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'users'
                ? 'bg-yellow-500 text-black font-bold'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            👥 Manage Users
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'settings'
                ? 'bg-yellow-500 text-black font-bold'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            ⚙️ Settings
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`text-left px-4 py-2 rounded-lg transition-all ${
              activeTab === 'reports'
                ? 'bg-yellow-500 text-black font-bold'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            📊 View Reports
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full px-6 py-10">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
  
}


// Toggle Component
function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between bg-black/30 border border-yellow-500 rounded-lg px-4 py-3">
      <span className="text-yellow-200 font-semibold">{label}</span>
      <button
        onClick={onChange}
        className={`w-14 h-7 rounded-full transition-all duration-300 border-2 ${
          value
            ? 'bg-yellow-400 border-yellow-500'
            : 'bg-black border-yellow-500'
        }`}
      >
        <div
          className={`w-5 h-5 bg-black rounded-full transform transition-all duration-300 ${
            value ? 'translate-x-7' : 'translate-x-0'
          }`}
        ></div>
      </button>
    </div>
  );
  
}


 // Admin setting (Change password)
    

  //   if (!currentAdmin || currentAdmin.role !== 'Admin') {
  //     setPasswordStatus('❌ No admin session found.');
  //     return;
  //   }

  //   const match = findUser(currentAdmin.email, currentPassword);
  //   if (!match) {
  //     setPasswordStatus('❌ Incorrect current password.');
  //     return;
  //   }

  //   updatePassword(currentAdmin.email, newPassword);
  //   setPasswordStatus('✅ Password changed successfully!');
  //   setCurrentPassword('');
  //   setNewPassword('');
  // };

  // const handleChangePassword = () => {
  //   if (!currentAdmin || currentAdmin.role !== 'Admin') {
  //     setPasswordStatus('❌ No admin session found.');
  //     return;
  //   }

  //   const match = findUser(currentAdmin.email, currentPassword);
  //   if (!match) {
  //     setPasswordStatus('❌ Incorrect current password.');
  //     return;
  //   }

  //   updatePassword(currentAdmin.email, newPassword);
  //   setPasswordStatus('✅ Password changed successfully!');
  //   setCurrentPassword('');
  //   setNewPassword('');
  // };