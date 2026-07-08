import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reduxfeature/authSlice';

function Navbar() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = user?.role || '';

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex gap-4 text-white items-center">
        {/* PUBLIC */}
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>

            {/* ADMIN */}
            {role === 'admin' && (
              <>
                <li>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/admin/patients">Patients</Link>
                </li>
                <li>
                  <Link to="/admin/appointments">Appointments</Link>
                </li>
              </>
            )}

            {/* DOCTOR */}
            {role === 'doctor' && (
              <>
                <li>
                  <Link to="/doctor/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/doctor/patients">Patients</Link>
                </li>
                <li>
                  <Link to="/doctor/appointments">Appointments</Link>
                </li>
              </>
            )}

            {/* PATIENT */}
            {role === 'patient' && (
              <>
                <li>
                  <Link to="/patient/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/patient/doctors">Doctors</Link>
                </li>
                <li>
                  <Link to="/patient/appointments">My Appointments</Link>
                </li>
                <li>
                  <Link to="/patient/profile">Profile</Link>
                </li>
              </>
            )}

            {/* LOGOUT */}
            <li>
              <button
                className="bg-red-500 px-3 py-1 rounded"
                onClick={() => {
                  dispatch(logout());
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
