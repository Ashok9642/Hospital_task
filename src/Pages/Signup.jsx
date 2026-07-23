import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be 6 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/signup', form);

      console.log(response.data.message);

      navigate('/login');
    } catch (error) {
      console.log('Signup Error:', error);
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-purple-500
      via-violet-600
      to-indigo-700
      px-4
    "
    >
      <div
        className="
        w-full
        max-w-md
        bg-white
        p-8
        rounded-2xl
        shadow-2xl
      "
      >
        {/* Header */}

        <div className="text-center mb-8">
          <div
            className="
            w-16
            h-16
            bg-purple-100
            rounded-full
            flex
            items-center
            justify-center
            mx-auto
            mb-4
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3M12 14a4 4 0 100-8 4 4 0 000 8zm0 0c-4 0-7 2-7 6h14c0-4-3-6-7-6z"
              />
            </svg>
          </div>

          <h2
            className="
            text-2xl
            font-bold
            text-gray-800
          "
          >
            Create Account
          </h2>

          <p
            className="
            text-gray-500
            text-sm
            mt-1
          "
          >
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}

          <div>
            <label
              className="
              text-sm
              font-medium
              text-gray-700
            "
            >
              Full Name
            </label>

            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              className="
                w-full
                mt-1
                px-4
                py-2.5
                border
                border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-purple-500
                focus:border-purple-500
              "
            />
          </div>

          {/* Email */}

          <div>
            <label
              className="
              text-sm
              font-medium
              text-gray-700
            "
            >
              Email Address
            </label>

            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="
                w-full
                mt-1
                px-4
                py-2.5
                border
                border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-purple-500
                focus:border-purple-500
              "
            />
          </div>

          {/* Password */}

          <div>
            <label
              className="
              text-sm
              font-medium
              text-gray-700
            "
            >
              Password
            </label>

            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="
                w-full
                mt-1
                px-4
                py-2.5
                border
                border-gray-300
                rounded-lg
                outline-none
                focus:ring-2
                focus:ring-purple-500
                focus:border-purple-500
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full
              bg-purple-600
              hover:bg-purple-700
              text-white
              py-2.5
              rounded-lg
              font-medium
              transition
            "
          >
            Sign Up
          </button>

          <p
            className="
            text-center
            text-sm
            text-gray-500
            mt-4
          "
          >
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="
                text-purple-600
                font-medium
                cursor-pointer
                hover:underline
              "
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
