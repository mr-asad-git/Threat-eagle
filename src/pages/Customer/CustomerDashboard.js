import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../../data/authUsers';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  // Dummy data for file progress
  const fileProgressData = [
    { month: 'Jan', uploaded: 12, scanned: 10, completed: 8 },
    { month: 'Feb', uploaded: 18, scanned: 15, completed: 14 },
    { month: 'Mar', uploaded: 25, scanned: 22, completed: 20 },
    { month: 'Apr', uploaded: 20, scanned: 18, completed: 17 },
    { month: 'May', uploaded: 30, scanned: 27, completed: 25 },
  ];

  // Dummy data for threats
  const threatData = [
    { name: 'Safe Files', value: 85 },
    { name: 'Moderate Threats', value: 10 },
    { name: 'High Threats', value: 5 },
  ];
  const COLORS = ['#22c55e', '#facc15', '#ef4444'];

  // Dummy user interactions
  const interactions = [
    { id: 1, user: 'alice@threat.com', action: 'Shared file "report.pdf"', time: 'Today' },
    { id: 2, user: 'bob@threat.com', action: 'Commented on "invoice.html"', time: 'Yesterday' },
    { id: 3, user: 'charlie@threat.com', action: 'Downloaded "project.js"', time: '2 days ago' },
  ];

  // Dummy meetings
  const meetings = [
    { id: 1, title: 'Security Briefing', date: '2025-11-20', time: '10:00 AM' },
    { id: 2, title: 'Customer Collaboration', date: '2025-11-22', time: '2:00 PM' },
    { id: 3, title: 'Threat Analysis Workshop', date: '2025-11-23', time: '4:00 PM' },
  ];

  // Dummy trending risks data
  const trendingRisks = [
    { month: 'Jan', phishing: 40, malware: 25, ransomware: 15 },
    { month: 'Feb', phishing: 50, malware: 30, ransomware: 20 },
    { month: 'Mar', phishing: 60, malware: 35, ransomware: 25 },
    { month: 'Apr', phishing: 55, malware: 40, ransomware: 30 },
    { month: 'May', phishing: 70, malware: 45, ransomware: 35 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            {/* Greeting */}
            <h1 className="text-3xl font-bold text-yellow-400 mb-6 border-b border-yellow-500 pb-2">
              🧑‍💻 Welcome Back, {currentUser?.name || 'Customer'}
            </h1>

            {/* Graphs Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* File Progress Graph */}
              <div className="bg-black/30 border border-yellow-500 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-4">📊 File Progress</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={fileProgressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="month" stroke="#facc15" />
                    <YAxis stroke="#facc15" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="uploaded" stroke="#facc15" strokeWidth={2} />
                    <Line type="monotone" dataKey="scanned" stroke="#22c55e" strokeWidth={2} />
                    <Line type="monotone" dataKey="completed" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Threats Graph */}
              <div className="bg-black/30 border border-yellow-500 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-300 mb-4">⚠️ Threats Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={threatData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {threatData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* User Interactions */}
            <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-yellow-300 mb-6">🤝 User Interactions & File Sharing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interactions.map((int) => (
                  <div
                    key={int.id}
                    className="bg-black/50 border border-yellow-500 rounded-lg p-4 shadow-md hover:bg-black/70 transition"
                  >
                    <p className="text-yellow-300 font-semibold mb-2">{int.user}</p>
                    <p className="text-yellow-200">{int.action}</p>
                    <p className="text-xs text-yellow-400 mt-2">{int.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Meetings */}
            <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">📅 Meetings</h3>
              <ul className="space-y-2 text-yellow-200">
                {meetings.map((meet) => (
                  <li key={meet.id} className="border-b border-yellow-500 pb-2">
                    <span className="block font-semibold">{meet.title}</span>
                    <span className="text-xs text-yellow-400">{meet.date} at {meet.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending Risks Graph */}
            <div className="bg-black/30 border border-yellow-500 rounded-xl p-6">
              <h3 className="text-xl font-bold text-yellow-300 mb-4">🌐 Trending Cyber Risks</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={trendingRisks}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#facc15" />
                  <YAxis stroke="#facc15" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="phishing" fill="#facc15" />
                  <Bar dataKey="malware" fill="#22c55e" />
                  <Bar dataKey="ransomware" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      default:
        return <div className="p-6">⚠️ Unknown Tab</div>;
    }
  };

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono">
      {/* Tab Navigation */}
            <div className="flex justify-center space-x-4 border-b border-yellow-500 bg-black/50 py-4">
           </div>

      {/* Main Content */}
      <main className="w-full mt-10">{renderContent()}</main>
    </div>
  );
}
      