import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaExclamationCircle, FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { addUser } from '../../data/userStore';
import { getStoredUsers } from '../../data/userStore';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('Customer');
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const passwordsMatch = password === confirm && password.length > 0;

const handleSubmit = (e) => {
  e.preventDefault();
  setSubmitted(true);
  if (!passwordsMatch) return;

  const users = getStoredUsers();
  const exists = users.some((u) => u.email === email && u.role === role);
  if (exists) {
    alert('❌ User already exists for this role.');
    return;
  }

  const newUser = {
    email,
    password,
    role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
    name: email.split('@')[0],
  }

  addUser(newUser); // ✅ this was missing
  navigate('/login'); // ✅ this was missing
};


  
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-yellow-500 rounded-xl p-8 w-full max-w-md shadow-lg"
      >
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center tracking-widest">
          Create Account
        </h2>

        {/* Email */}
        <label className="block text-yellow-300 font-semibold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="you@example.com"
        />

        {/* Password */}
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
            className="absolute right-3 top-3 text-yellow-400 text-lg hover:text-yellow-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="block text-yellow-300 font-semibold mb-2">Confirm Password</label>
        <div className="relative mb-2">
          <input
            type={showConfirm ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 text-yellow-400 text-lg hover:text-yellow-300"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>

          {/* Icon Feedback */}
          {confirm.length > 0 && (
            <span className="absolute right-10 top-2 text-lg">
              {passwordsMatch ? (
                <FaCheckCircle className="text-green-500" />
              ) : (
                <FaExclamationCircle className="text-red-500" />
              )}
            </span>
          )}
        </div>

        {submitted && !passwordsMatch && (
          <p className="text-red-500 text-sm mb-4">Passwords do not match</p>
        )}

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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-bold py-2 rounded-lg hover:bg-yellow-500 transition-all shadow-[0_0_10px_#ff0] hover:shadow-[0_0_20px_#ff0]"
        >
          Sign Up
        </button>

        <p className="text-white mt-3">
          Already have an account?
          <Link
            to="/login"
            className="text-yellow-500 ml-2 hover:border-b-2 hover:border-yellow-500 cursor-pointer"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}