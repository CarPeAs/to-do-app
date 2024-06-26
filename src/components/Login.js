// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true  // Habilitar el envío de cookies
});

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      const token = response.data.token;
      // console.log('Received token:', token); // Verificar que el token se recibe correctamente
      if (token) {
        localStorage.setItem('token', token);
        // console.log('Token stored:', token);
        onLogin(email, password);
        navigate('/home');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="form-group">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex items-start">
            <a href="#" className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full transition duration-200"
          >
            Login
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered? <a href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
