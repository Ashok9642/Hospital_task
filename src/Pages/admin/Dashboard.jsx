import React from 'react';
import { fetchAiResponse } from '../../utils/aiEngine';

const Dashboard = () => {
  const stats = {
    patients: 250,
    doctors: 20,
    appointments: 45,
    revenue: 50000,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Hospital Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Patients Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm font-medium">Total Patients</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.patients}</p>
        </div>

        {/* Doctors Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm font-medium">Total Doctors</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.doctors}</p>
        </div>

        {/* Appointments Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm font-medium">Today's Appointments</h3>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.appointments}</p>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-gray-500 text-sm font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">₹{stats.revenue.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
