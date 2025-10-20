// src/data/authUsers.js
import { findUser, getStoredUsers, saveUsers } from './userStore';

// ✅ Validate user and set authToken
export const validateUser = (email, password, role) => {
  const user = findUser(email, password);
  if (user && user.role === role) {
    const token = `${user.email}-${user.role}`;
    localStorage.setItem('authToken', token);
    return user;
  }
  return null;
};

// ✅ Get the currently logged-in user
export const getCurrentUser = () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;

  const [email, role] = token.split('-');
  if (!email || !role) return null;

  const users = getStoredUsers(); // ✅ reads from 'threatUsers'
  return users.find((u) => u.email === email && u.role === role) || null;
};

// 🔄 Update the current user's data
export const updateCurrentUser = (updatedUser) => {
  const token = localStorage.getItem('authToken');
  if (!token) return;

  const [email, role] = token.split('-');
  if (!email || !role) return;

  const users = getStoredUsers();
  const updated = users.map((u) =>
    u.email === email && u.role === role ? updatedUser : u
  );

  saveUsers(updated);
};