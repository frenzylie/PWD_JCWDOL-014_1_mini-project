'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    referredByNum: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Password does not match');
      return;
    }

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_API_URL + 'auth/register',
        formData,
      );
      if (response.status === 201) {
        router.push('/logIn');
      } else {
        setError('Registration failed. Please try again');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message || 'An unexpected error occurred',
        );
      } else {
        setError('An unexpected error occurred');
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
    <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="w-full p-2 mb-4 border border-gray-300 rounded bg-white"
      >
        <option value="">Select Role</option>
        <option value="Customer">Customer</option>
        <option value="Organizer">Organizer</option>
      </select>
      <input
        name="referredByNum"
        value={formData.referredByNum}
        onChange={handleChange}
        placeholder="Referred By (Optional)"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      {error && <p>{error}</p>}
      <button type="submit"
      className="w-full p-2 bg-orange-600 text-white rounded hover:bg-orange-500">
      Register</button>
    </form>
    </div>
  );
}
