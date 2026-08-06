import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './Pages/Chat/Chat';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './reduxfeature/authSlice';

import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';

import ProtectedRoute from './routes/ProtectedRoute';

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
import BookAppointment from './Pages/patient/Booking';
import DoctorDetails from './Pages/patient/DoctorDetails';

import socket from './services/socket';

function App() {
  const dispatch = useDispatch();

  const { initialized, isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  // Socket Connection + Room Join

  useEffect(() => {
    const handleConnect = () => {
      console.log('Connected:', socket.id);

      if (user?.id && user?.role) {
        socket.emit('joinRoom', {
          userId: user.id,
          role: user.role,
        });

        console.log(`${user.role} joined room`);
      }
    };

    socket.on('connect', handleConnect);

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    return () => {
      socket.off('connect', handleConnect);

      socket.off('disconnect');
    };
  }, [user]);

  if (!initialized) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* SAME ROUTES */}

        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <PublicLayout>
                <Signup />
              </PublicLayout>
            )
          }
        />

        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <PublicLayout>
                <Login />
              </PublicLayout>
            )
          }
        />

        <Route
          path="/home"
          element={
            <PrivateLayout>
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/doctor/dashboard"
          element={
            <PrivateLayout>
              <ProtectedRoute role="doctor">
                <DoctorDashboard />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/doctor/patients"
          element={
            <PrivateLayout>
              <ProtectedRoute role="doctor">
                <DoctorPatients />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/doctor/appointments"
          element={
            <PrivateLayout>
              <ProtectedRoute role="doctor">
                <DoctorAppointments />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/patient/dashboard"
          element={
            <PrivateLayout>
              <ProtectedRoute role="patient">
                <PatientDashboard />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/patient/doctors"
          element={
            <PrivateLayout>
              <ProtectedRoute role="patient">
                <PatientDoctors />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/patient/booking/:doctorId"
          element={
            <PrivateLayout>
              <ProtectedRoute role="patient">
                <BookAppointment />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/patient/appointments"
          element={
            <PrivateLayout>
              <ProtectedRoute role="patient">
                <PatientAppointments />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />
        <Route
          path="/chat/:doctorId/:patientId"
          element={
            <PrivateLayout>
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
