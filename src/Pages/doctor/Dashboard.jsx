import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function DoctorDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/doctor/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome {data.doctor.name} 👨‍⚕️</h2>

      <p className="text-gray-600 mb-6">{data.doctor.specialization}</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-xl font-bold">{data.summary.totalPatients}</h3>
          <p>Total Patients</p>
        </div>

        <div className="bg-blue-100 shadow rounded p-4 text-center">
          <h3 className="text-xl font-bold">{data.summary.todayAppointments}</h3>
          <p>Today Appointments</p>
        </div>

        <div className="bg-green-100 shadow rounded p-4 text-center">
          <h3 className="text-xl font-bold">{data.summary.totalAppointments}</h3>
          <p>Total Appointments</p>
        </div>
      </div>

      {/* Today Appointments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Today's Appointments</h3>

        {data.todayAppointments.map((app, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded mb-2 flex justify-between">
            <p>{app.patientName}</p>
            <p>{app.time}</p>
            <span className="text-blue-600">{app.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
