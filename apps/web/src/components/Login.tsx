'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_API_URL + 'auth/login',
        { email, password },
      );
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`;
          console.log('Authorization Header:', axios.defaults.headers.common['Authorization']);
        router.push('/');
      }
    } catch (error) {
      console.error('Login failed', error);
      setErrorMessage('Login failed. Please try again later.');
    }
  }

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-orange-600 text-white rounded hover:bg-orange-500">Login</button>
        </form>
      </div>
    </>
  );
}
