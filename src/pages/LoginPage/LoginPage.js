import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './LoginPageStyling.css';
// import Footer from '../../components/Footer';

export default function LoginPage() {
  const location = useLocation();
  const initialRole = location.state?.role || 'Customer';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialRole);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('threatUser'));

    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password &&
      storedUser.role === role
    ) {
      setShowPopup(true);
      setError('');
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      setError('Invalid credentials. Please try again.');
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
    </div>
  );
}