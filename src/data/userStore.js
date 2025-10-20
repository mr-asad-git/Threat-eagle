// src/data/userStore.js

// 🔄 Get all users from localStorage
export const getStoredUsers = () => {
  const raw = localStorage.getItem('threatUsers');
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// 💾 Save updated users to localStorage
export const saveUsers = (users) => {
  localStorage.setItem('threatUsers', JSON.stringify(users));
};

// 🔍 Find a user by email and password
export const findUser = (email, password) => {
  const users = getStoredUsers();
  return users.find((u) => u.email === email && u.password === password) || null;
};

// 🔐 Update a user's password
export const updatePassword = (email, newPassword) => {
  const users = getStoredUsers();
  const updated = users.map((u) =>
    u.email === email ? { ...u, password: newPassword } : u
  );
  saveUsers(updated);
};

// 🧾 Optional: Generate a token from user object
export const getUserToken = (user) => {
  if (!user || !user.email || !user.role) return null;
  return `${user.email}-${user.role}`;
};

// ➕ Add a new user to threatUsers
export const addUser = (newUser) => {
  const users = getStoredUsers();
  users.push(newUser);
  saveUsers(users);
};