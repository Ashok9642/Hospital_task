import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, loadUser } from '../reduxfeature/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      await dispatch(
        loginUser({
          email,
          password,
        }),
      ).unwrap();

      await dispatch(loadUser());

      navigate('/home', {
        replace: true,
      });
    } catch (error) {
      console.log('Login failed:', error);
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
      from-teal-600
      via-emerald-600
      to-teal-800
      px-4
    "
    >
      <div
        className="
        bg-white
        p-8
        rounded-2xl
        shadow-2xl
        w-full
        max-w-md
      "
      >
        {/* Header */}

        <div className="text-center mb-8">
          <div
            className="
            w-16
            h-16
            bg-teal-100
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
              className="h-8 w-8 text-teal-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14c3.314 0 6 2.686 6 6H6c0-3.314 2.686-6 6-6zm0-2a4 4 0 100-8 4 4 0 000 8z"
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
            Welcome Back
          </h2>

          <p
            className="
            text-gray-500
            text-sm
            mt-1
          "
          >
            Login to continue to your account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-1
            "
            >
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full
                px-4
                py-2.5
                border
                border-gray-300
                rounded-lg
                outline-none
                transition
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
              "
            />
          </div>

          <div>
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-1
            "
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="
                w-full
                px-4
                py-2.5
                border
                border-gray-300
                rounded-lg
                outline-none
                transition
                focus:ring-2
                focus:ring-teal-500
                focus:border-teal-500
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-teal-600
              hover:bg-teal-700
              text-white
              font-medium
              py-2.5
              rounded-lg
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />

                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}

            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p
          className="
          text-center
          text-sm
          text-gray-500
          mt-6
        "
        >
          Don't have an account?{' '}
          <a
            href="/signup"
            className="
              text-teal-600
              font-medium
              hover:underline
            "
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
