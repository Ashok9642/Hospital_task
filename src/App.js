import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './reduxfeature/authSlice';
import Navbar from './Pages/Navbar';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AdminDashboard from './Pages/admin/Dashboard';
import AdminDoctors from './Pages/admin/Doctors';
import AdminPatients from './Pages/admin/Patients';
import AdminAppointments from './Pages/admin/Appointments';
import DoctorDashboard from './Pages/doctor/Dashboard';
import DoctorPatients from './Pages/doctor/Patients';
import DoctorAppointments from './Pages/doctor/Appointments';
import PatientDashboard from './Pages/patient/Dashboard';
import PatientDoctors from './Pages/patient/Doctors';
import PatientAppointments from './Pages/patient/MyAppointments';
import PatientProfile from './Pages/patient/Profile';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, initialized, user } = useSelector((state) => state.auth);

  const role = user?.role;

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (!initialized) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute role="admin">
              <AdminDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <ProtectedRoute role="admin">
              <AdminPatients />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute role="admin">
              <AdminAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute role="doctor">
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            // <ProtectedRoute role="doctor">
            <DoctorPatients />
            // </ProtectedRoute>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute role="doctor">
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <ProtectedRoute role="patient">
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patient/doctors"
          element={
            <ProtectedRoute role="patient">
              <PatientDoctors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/appointments"
          element={
            <ProtectedRoute role="patient">
              <PatientAppointments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/profile"
          element={
            // <ProtectedRoute role="patient">
            <PatientProfile />
            // </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
