// Save token and role
export const saveAuth = (token, role) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('userRole', role);
};

// Get token
export const getToken = () => localStorage.getItem('authToken');

// Get role
export const getRole = () => localStorage.getItem('userRole');

// Check if user is authenticated
export const isAuthenticated = () => !!getToken();

// Check if user is admin
export const isAdmin = () => getRole() === 'Admin';

// Check if user is customer
export const isCustomer = () => getRole() === 'Customer';

// Logout user
export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};