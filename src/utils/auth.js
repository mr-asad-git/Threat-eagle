export const getToken = () => localStorage.getItem('authToken');
export const getRole = () => localStorage.getItem('userRole');

export const isAuthenticated = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};