// Register.tsx

import axios from 'axios';
import React, { useState } from 'react';


const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Perform registration logic here
    console.log('Registration data:', { fullName, email, password });
    try {
      // Make API call using Axios
      const response = await axios.post('http://localhost:8000/api/v1/users/register', {
        fullName,
        email,
        password,
      });
      // Handle success
      console.log('Registration successful:', response.data);
    } catch (error) {
      // Handle error
      console.error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="w-full border rounded py-2 px-3"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border rounded py-2 px-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border rounded py-2 px-3"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
