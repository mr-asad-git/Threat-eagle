import React, { useState } from 'react';

export default function ManageUsers() {
  const [search, setSearch] = useState('');
  const users = [
    { id: 1, name: 'Alice Khan', email: 'alice@threat.com', role: 'Customer', status: 'Active' },
    { id: 2, name: 'Bob Malik', email: 'bob@threat.com', role: 'Customer', status: 'Suspended' },
    { id: 3, name: 'Charlie Admin', email: 'charlie@threat.com', role: 'Admin', status: 'Active' },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
          👥 Manage Users
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* User Table */}
        <div className="overflow-x-auto border border-yellow-500 rounded-xl">
          <table className="w-full text-sm border-collapse">
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
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-yellow-400">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, i) => (
                  <tr key={user.id}>
                    <td className="p-2 border border-yellow-500">{i + 1}</td>
                    <td className="p-2 border border-yellow-500">{user.name}</td>
                    <td className="p-2 border border-yellow-500">{user.email}</td>
                    <td className="p-2 border border-yellow-500">{user.role}</td>
                    <td className={`p-2 border border-yellow-500 ${
                      user.status === 'Suspended' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {user.status}
                    </td>
                    <td className="p-2 border border-yellow-500 space-x-2">
                      <button className="px-3 py-1 text-xs font-bold border border-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition">
                        View
                      </button>
                      <button className="px-3 py-1 text-xs font-bold border border-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition">
                        {user.status === 'Suspended' ? 'Activate' : 'Suspend'}
                      </button>
                      <button className="px-3 py-1 text-xs font-bold border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}