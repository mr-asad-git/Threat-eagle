import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../data/authUsers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const handleStorage = () => setCurrentUser(getCurrentUser());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const login = (user) => {
    try {
      // getCurrentUser reads from localStorage; calling it after login will sync state
      setCurrentUser(getCurrentUser());
    } catch (e) {
      setCurrentUser(user || null);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    } catch (e) {}
    setCurrentUser(null);
    // other components can listen to storage event or react to state change
  };

  const refresh = () => setCurrentUser(getCurrentUser());

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
