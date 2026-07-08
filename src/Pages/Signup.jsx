import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErros] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email  is required';
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be 6 charecters';
    }
    setErros(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const postdata = await axios.post('http://localhost:5000/api/signup', form);
      // alert(postdata.data.message);
      console.log(postdata.data.message);
      navigate('./login');
    } catch (err) {
      // alert(err.postdata.data.error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-[380px] bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            <label className="text-sm text-gray-600">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">
            Already have an account?{' '}
            <span className="text-blue-600 cursor-pointer" onClick={() => navigate('./login')}>
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
