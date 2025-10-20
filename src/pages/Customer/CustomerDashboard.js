import React, { useState } from 'react';
import CustomerFiles from './MyFiles';
import ScanHistory from './ScanHistory';
import CustomerProfile from './Profile';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    scanned: 42,
    safe: 38,
    corrupted: 4,
  };

  const recentScans = [
    { file: 'project.js', status: 'Safe', time: '10:15 AM' },
    { file: 'invoice.html', status: 'Corrupted', time: 'Yesterday' },
    { file: 'notes.txt', status: 'Safe', time: '2 days ago' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
              🧑‍💻 Welcome Back, Customer
            </h1>

            {/* Stats Panel */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-black/40 border-2 border-yellow-500 rounded-lg p-6 text-center shadow-md">
                <h2 className="text-lg font-bold text-yellow-300">Files Scanned</h2>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.scanned}</p>
              </div>
              <div className="bg-black/40 border-2 border-green-500 rounded-lg p-6 text-center shadow-md">
                <h2 className="text-lg font-bold text-green-300">Safe Files</h2>
                <p className="text-3xl font-bold text-green-400 mt-2">{stats.safe}</p>
              </div>
              <div className="bg-black/40 border-2 border-red-500 rounded-lg p-6 text-center shadow-md">
                <h2 className="text-lg font-bold text-red-300">Corrupted Files</h2>
                <p className="text-3xl font-bold text-red-400 mt-2">{stats.corrupted}</p>
              </div>
            </div>

            {/* Recent Scans Table */}
            <div className="bg-black/30 border border-yellow-500 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">🧾 Recent Scans</h3>
              <table className="w-full text-sm border-collapse border border-yellow-500">
                <thead className="bg-yellow-500 text-black">
                  <tr>
                    <th className="p-2 border border-yellow-400">#</th>
                    <th className="p-2 border border-yellow-400">File</th>
                    <th className="p-2 border border-yellow-400">Status</th>
                    <th className="p-2 border border-yellow-400">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-black/20 text-yellow-200">
                  {recentScans.map((scan, i) => (
                    <tr key={i}>
                      <td className="p-2 border border-yellow-500">{i + 1}</td>
                      <td className="p-2 border border-yellow-500">{scan.file}</td>
                      <td
                        className={`p-2 border border-yellow-500 ${
                          scan.status === 'Corrupted' ? 'text-red-400' : 'text-green-400'
                        }`}
                      >
                        {scan.status}
                      </td>
                      <td className="p-2 border border-yellow-500">{scan.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'files':
        return <CustomerFiles />;
      case 'scan':
        return <ScanHistory />;
      case 'profile':
        return <CustomerProfile />;
      default:
        return <div className="p-6">⚠️ Unknown Tab</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-yellow-300 font-mono">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-yellow-500 p-6 fixed h-screen">
        <h2 className="text-2xl font-bold text-yellow-400 mb-8 tracking-widest">🧑‍💼 Customer</h2>
        <nav className="space-y-4">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`block w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'dashboard'
                ? 'bg-yellow-500 text-black'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`block w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'files'
                ? 'bg-yellow-500 text-black'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            Customer Files
          </button>
          <button
            onClick={() => setActiveTab('scan')}
            className={`block w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'scan'
                ? 'bg-yellow-500 text-black'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            Scan History
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`block w-full text-left px-4 py-2 rounded-lg font-semibold ${
              activeTab === 'profile'
                ? 'bg-yellow-500 text-black'
                : 'hover:bg-yellow-700 text-yellow-300'
            }`}
          >
            Profile
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full">{renderContent()}</main>
    </div>
  );
}