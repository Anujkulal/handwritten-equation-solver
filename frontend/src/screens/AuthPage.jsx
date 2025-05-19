import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthPage = ({ mode }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup') {
      console.log('Signing up with:', formData);
    } else {
      console.log('Signing in with:', { email: formData.email, password: formData.password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          {mode === 'signup' ? 'Sign Up' : 'Sign In'}
        </h2>

        {mode === 'signup' && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
            required
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 cursor-pointer transition active:scale-95"
        >
          {mode === 'signup' ? 'Create Account' : 'Login'}
        </button>

        <div className="flex justify-center">
          {
            mode === "signup" ? (
              <div>
                <Link to="/signin" className='text-blue-800 hover:text-blue-600'>Already have an account?</Link>
              </div>
            ) : (
              <div className="">
                <Link to="/signup" className='text-blue-800 hover:text-blue-600'>Don't have an account?</Link>
                <Link to="/second" className='text-blue-800 hover:text-black'>move</Link>
              </div>
            )
          }

        </div>
      </form>
    </div>
  );
};

export const SignUp = () => <AuthPage mode="signup" />;
export const SignIn = () => <AuthPage mode="signin" />;
