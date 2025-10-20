import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { findUser, getUserToken } from '../../data/userStore';
import { validateUser } from '../../data/authUsers'
import './LoginPageStyling.css';

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialRole = location.state?.role || 'Customer';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialRole);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  // Reset password states
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [enteredOTP, setEnteredOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetError, setResetError] = useState('');


  
const handleLogin = (e) => {
  e.preventDefault();

  const user = validateUser(email, password, role);

  if (user && user.role === role) {
    const token = getUserToken(user); // ✅ use helper
    localStorage.setItem('authToken', token);

    setShowPopup(true);
    setError('');

    setTimeout(() => {
      setShowPopup(false);
      navigate(user.role === 'Admin' ? '/admin/dashboard' : '/customer/dashboard');
    }, 2000);
  } else {
    setError('Invalid credentials. Please try again.');
  }
};



  const handleSendOTP = () => {
    const user = findUser(resetEmail, '', role);
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOTP(otp);
      setOtpSent(true);
      setResetError('');
      alert(`🔐 Your OTP is: ${otp}`);
    } else {
      setResetError('Email not found for selected role.');
    }
  };

  const handleResetPassword = () => {
    if (enteredOTP === generatedOTP) {
      const users = JSON.parse(localStorage.getItem('threatUsers')) || [];
      const updated = users.map((u) =>
        u.email === resetEmail && u.role === role
          ? { ...u, password: newPassword }
          : u
      );
      localStorage.setItem('threatUsers', JSON.stringify(updated));
      setShowReset(false);
      alert('✅ Password updated. You can now log in.');
    } else {
      setResetError('Invalid OTP. Please try again.');
    }
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

      {/* Reset Password Popup */}
      {showReset && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
          <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 w-[350px] text-yellow-300 relative">
            <h3 className="text-xl font-bold mb-4">🔐 Reset Password</h3>

            {!otpSent ? (
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
                  onClick={handleSendOTP}
                  className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <label className="block mb-2">Enter OTP</label>
                <input
                  type="text"
                  value={enteredOTP}
                  onChange={(e) => setEnteredOTP(e.target.value)}
                  className="w-full px-3 py-2 mb-4 rounded bg-black text-white border border-yellow-500"
                  placeholder="6-digit code"
                />

                <label className="block mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 mb-4 rounded bg-black text-white border border-yellow-500"
                  placeholder="••••••••"
                />

                <button
                  onClick={handleResetPassword}
                  className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
                >
                  Reset Password
                </button>
              </>
            )}

            {resetError && <p className="text-red-500 text-sm mt-2">{resetError}</p>}
            <button onClick={() => setShowReset(false)} className="absolute top-2 right-3 text-yellow-400 hover:text-red-400 text-lg"
            >
              ✕
            </button>
      
          </div>
        </div>
      )}
    </div>
  );
}