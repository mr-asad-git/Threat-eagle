import { useState } from 'react';
import CustomerDashboard from './CustomerDashboard';
import MyFiles from './MyFiles';
import Profile from './Profile';
import ScanHistory from './ScanHistory';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="p-6"><CustomerDashboard /></div>;
      case 'files':
        return <div className="p-6"><MyFiles /></div>;
      case 'scan':
        return <div className="p-6"><ScanHistory /></div>;
      case 'profile':
        return <div className="p-6"><Profile /></div>;
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