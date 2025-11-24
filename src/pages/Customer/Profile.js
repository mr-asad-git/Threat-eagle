import React, { useEffect, useState } from 'react';
import {
  getCurrentUser,
  updateCurrentUser,
} from '../../data/authUsers';
import { findUser, updatePassword } from '../../data/userStore';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(null);

  useEffect(() => {
    const current = getCurrentUser();
    if (current) setUser({ ...current });
  }, []);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateCurrentUser(user);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePassword = () => {
    if (!user || !user.email) {
      setPasswordStatus('❌ No user session found.');
      return;
    }

    const match = findUser(user.email, currentPassword);
    if (!match) {
      setPasswordStatus('❌ Incorrect current password.');
      return;
    }

    updatePassword(user.email, newPassword);
    setPasswordStatus('✅ Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
  };

  if (!user) {
    return (
      <div className="text-center text-yellow-400 mt-20">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono px-6 pt-40 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
          👤 My Profile
        </h1>

        <div className="bg-black/30 border border-yellow-500 rounded-xl p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Full Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Email Address</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Role (read-only) */}
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Role</label>
            <input
              type="text"
              value={user.role}
              disabled
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-yellow-400 border border-yellow-500 cursor-not-allowed"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Bio</label>
            <textarea
              value={user.bio || ''}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Tell us a bit about yourself..."
            />
          </div>

          {/* Save Button */}
          <div className="text-center">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg border-2 border-yellow-500 hover:bg-yellow-500 transition-all"
            >
              Save Changes
            </button>
          </div>

          {/* Confirmation */}
          {saved && (
            <div className="text-center text-green-400 font-semibold mt-4 animate-pulse">
              ✅ Profile updated successfully!
            </div>
          )}
        </div>

        {/* Change Password Section */}
        <div className="mt-12 bg-black/30 border border-yellow-500 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-yellow-300 mb-4">🔐 Change Password</h2>
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
    </div>
  );
}