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
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
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
      />
      {error && <p>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}
