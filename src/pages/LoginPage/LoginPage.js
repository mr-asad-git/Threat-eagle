import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { findUser, getUserToken } from '../../data/userStore';
import { validateUser } from '../../data/authUsers';
import { getCurrentUser } from '../../data/authUsers';


import './LoginPageStyling.css';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // normalize incoming role (handles 'customer'|'Customer'|'CUSTOMER')
  const normalizeRole = (r) => (r ? r.charAt(0).toUpperCase() + r.slice(1).toLowerCase() : 'Customer');
  const initialRole = normalizeRole(location.state?.role || 'Customer');

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialRole);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  // Reset password states (no OTP)
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStep, setResetStep] = useState(0); // 0: ask email, 1: ask new password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetError, setResetError] = useState('');
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState(null);
useEffect(() => {
  const user = getCurrentUser();
  setCurrentUser(user);
}, []);
  
 const handleLogin = (e) => {
  e.preventDefault();

  const user = validateUser(email, password, role);
  if (user && user.role && user.role.toLowerCase() === (role || '').toLowerCase()) {
    const token = getUserToken(user);
    localStorage.setItem('authToken', token);

    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (err) {
      // ignore storage errors
    }

    setShowPopup(true);
    setError('');

    setTimeout(() => {
      setShowPopup(false);

      // ✅ Use exact route casing as defined in App.js
      if (user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'Customer') {
        navigate('/customer/dashboard');
      } else if (user.role === 'Support') {
        navigate('/support/portal');
      } else {
        navigate('/');
      }

      // Optional: refresh header
      // window.location.reload();
    }, 2000);
  } else {
    setError('Invalid credentials. Please try again.');
  }
};

  const handleResetEmail = () => {
    // Only check email, not password
    const users = JSON.parse(localStorage.getItem('threatUsers')) || [];
    const user = users.find((u) => u.email === resetEmail && u.role === role);
    if (user) {
      setResetError('');
      setResetStep(1);
    } else {
      setResetError('Email not found for selected role.');
    }
  };

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setResetError('Please fill both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setResetError('Passwords do not match.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('threatUsers')) || [];
    const updated = users.map((u) =>
      u.email === resetEmail && u.role === role
        ? { ...u, password: newPassword }
        : u
    );
    localStorage.setItem('threatUsers', JSON.stringify(updated));
    setShowReset(false);
    setResetStep(0);
    setResetEmail('');
    setNewPassword('');
    setConfirmPassword('');
    alert('✅ Password updated. You can now log in.');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-gray-900 border border-yellow-500 rounded-xl p-8 w-full max-w-md shadow-lg"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center tracking-widest">
          Login
        </h2>

        {/* Email Input */}
        <label className="block text-yellow-300 font-semibold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="you@example.com"
        />

        {/* Password Input */}
        <label className="block text-yellow-300 font-semibold mb-2">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-yellow-400 text-sm hover:text-yellow-300"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Role Dropdown */}
        <label className="block text-yellow-300 font-semibold mb-2">Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white font-bold py-2 rounded-lg hover:bg-yellow-500 transition-all"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-white mt-3">
          Don't have an account?
          <Link
            to="/signup"
            className="text-yellow-500 ml-2 hover:border-b-2 hover:border-yellow-500 cursor-pointer"
          >
            Sign Up
          </Link>
        </p>

        {/* Forgot Password */}
        <p
          className="text-yellow-500 text-sm mt-4 text-center cursor-pointer hover:underline"
          onClick={() => setShowReset(true)}
        >
          Forgot Password?
        </p>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#0f0f0f] border border-green-500 rounded-xl px-8 py-6 text-green-300 shadow-[0_0_30px_#22c55e] text-center relative w-[300px]">
            <div className="text-4xl mb-2">✅</div>
            <p className="font-semibold">Logged in successfully!</p>
            <div className="absolute bottom-0 left-0 h-[4px] bg-green-500 animate-progress-line w-full"></div>
          </div>
        </div>
      )}

      {/* Reset Password Popup (no OTP) */}
      {showReset && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 w-[350px] text-yellow-300 relative">
            <h3 className="text-xl font-bold mb-4">🔐 Reset Password</h3>
            {resetStep === 0 ? (
              <>
                <label className="block mb-2">Enter your email</label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-3 py-2 mb-4 rounded bg-black text-white border border-yellow-500"
                  placeholder="you@example.com"
                />
                <button
                  onClick={handleResetEmail}
                  className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
                >
                  Next
                </button>
              </>
            ) : (
              <>
                <label className="block mb-2">Enter new password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 mb-4 rounded bg-black text-white border border-yellow-500"
                  placeholder="New password"
                />
                <label className="block mb-2">Re-enter new password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 mb-4 rounded bg-black text-white border border-yellow-500"
                  placeholder="Re-enter password"
                />
                <button
                  onClick={handleResetPassword}
                  className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
                >
                  Change Password
                </button>
              </>
            )}
            {resetError && <p className="text-red-500 text-sm mt-2">{resetError}</p>}
            <button onClick={() => { setShowReset(false); setResetStep(0); setResetEmail(''); setNewPassword(''); setConfirmPassword(''); setResetError(''); }} className="absolute top-2 right-3 text-yellow-400 hover:text-red-400 text-lg">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}