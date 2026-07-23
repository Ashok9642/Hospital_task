import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './reduxfeature/authSlice';

/* Layouts */
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

/* Pages */
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Home from './Pages/Home';

/* Routes */
import ProtectedRoute from './routes/ProtectedRoute';

/* Admin */
import AdminDashboard from './Pages/admin/Dashboard';
import AdminDoctors from './Pages/admin/Doctors';
import AdminPatients from './Pages/admin/Patients';
import AdminAppointments from './Pages/admin/Appointments';

/* Doctor */
import DoctorDashboard from './Pages/doctor/Dashboard';
import DoctorPatients from './Pages/doctor/Patients';
import DoctorAppointments from './Pages/doctor/Appointments';

/* Patient */
import PatientDashboard from './Pages/patient/Dashboard';
import PatientDoctors from './Pages/patient/Doctors';
import PatientAppointments from './Pages/patient/MyAppointments';
import PatientProfile from './Pages/patient/Profile';
import BookAppointment from './Pages/patient/Booking';
import DoctorDetails from './Pages/patient/DoctorDetails';

function App() {
  const dispatch = useDispatch();

  const { initialized, isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  if (!initialized) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

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

        {/* ================= PRIVATE ROUTES ================= */}

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

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={
            <PrivateLayout>
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/admin/doctors"
          element={
            <PrivateLayout>
              <ProtectedRoute role="admin">
                <AdminDoctors />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/admin/patients"
          element={
            <PrivateLayout>
              <ProtectedRoute role="admin">
                <AdminPatients />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        <Route
          path="/admin/appointments"
          element={
            <PrivateLayout>
              <ProtectedRoute role="admin">
                <AdminAppointments />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        {/* ================= DOCTOR ================= */}

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

        {/* ================= PATIENT ================= */}

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
          path="/patient/doctordetails/:doctorId"
          element={
            <PrivateLayout>
              <ProtectedRoute role="patient">
                <DoctorDetails />
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
          path="/patient/profile"
          element={
            <PrivateLayout>
              <ProtectedRoute role="patient">
                <PatientProfile />
              </ProtectedRoute>
            </PrivateLayout>
          }
        />

        {/* Default */}
        <Route path="*" element={<Navigate to={isLoggedIn ? '/home' : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
