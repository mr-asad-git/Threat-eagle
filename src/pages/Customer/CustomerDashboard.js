import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../data/authUsers';
import CustomerFiles from './MyFiles';
import ScanHistory from './ScanHistory';
import CustomerProfile from './Profile';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Dummy stats
  const stats = { scanned: 42, safe: 38, corrupted: 4 };

  // Dummy invoices data
  const invoices = [
    { month: 'Jan', uploaded: 12, safe: 10, corrupted: 2 },
    { month: 'Feb', uploaded: 18, safe: 16, corrupted: 2 },
    { month: 'Mar', uploaded: 25, safe: 22, corrupted: 3 },
  ];

  // Dummy activity feed
  const activities = [
    { id: 1, message: 'Uploaded invoice "invoice-Jan.pdf"', time: 'Today' },
    { id: 2, message: 'Scanned file "report-Feb.js" – Safe ✅', time: 'Yesterday' },
    { id: 3, message: 'Profile updated successfully', time: '2 days ago' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-yellow-400 mb-6 border-b border-yellow-500 pb-2">
              🧑‍💻 Dashboard Overview
            </h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/40 border border-yellow-500 rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold text-yellow-300">Files Scanned</h2>
                <p className="text-3xl font-bold text-yellow-400 mt-2">{stats.scanned}</p>
              </div>
              <div className="bg-black/40 border border-green-500 rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold text-green-300">Safe Files</h2>
                <p className="text-3xl font-bold text-green-400 mt-2">{stats.safe}</p>
              </div>
              <div className="bg-black/40 border border-red-500 rounded-lg p-6 text-center">
                <h2 className="text-lg font-semibold text-red-300">Corrupted Files</h2>
                <p className="text-3xl font-bold text-red-400 mt-2">{stats.corrupted}</p>
              </div>
            </div>

            {/* Invoices */}
            <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">📊 Invoices Uploaded</h3>
              <ul className="space-y-2 text-yellow-200">
                {invoices.map((inv, i) => (
                  <li key={i} className="flex justify-between border-b border-yellow-500 pb-1">
                    <span>{inv.month}</span>
                    <span>Uploaded: {inv.uploaded} | Safe: {inv.safe} | Corrupted: {inv.corrupted}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Activity */}
            <div className="bg-black/30 border border-yellow-500 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">📌 Recent Activity</h3>
              <ul className="space-y-2 text-yellow-200">
                {activities.map((act) => (
                  <li key={act.id} className="border-b border-yellow-500 pb-2">
                    <span className="block">{act.message}</span>
                    <span className="text-xs text-yellow-400">{act.time}</span>
                  </li>
                ))}
              </ul>
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
    <div className="min-h-screen bg-black text-yellow-300 font-mono">
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 border-b border-yellow-500 bg-black/50 py-4">
        {['dashboard', 'files', 'scan', 'profile'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              activeTab === tab
                ? 'bg-yellow-500 text-black'
                : 'text-yellow-300 hover:bg-yellow-700 hover:text-black'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="w-full mt-10">{renderContent()}</main>
    </div>
  );
}