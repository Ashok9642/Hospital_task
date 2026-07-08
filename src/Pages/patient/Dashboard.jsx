import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/patient/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome {data.patient.name} 👋</h2>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4 text-center">
          <h3 className="text-xl font-bold">{data.summary.totalAppointments}</h3>
          <p>Total Appointments</p>
        </div>

        <div className="bg-blue-100 shadow rounded p-4 text-center">
          <h3 className="text-xl font-bold">{data.summary.upcomingAppointments}</h3>
          <p>Upcoming</p>
        </div>

        <div className="bg-green-100 shadow rounded p-4 text-center">
          <h3 className="text-xl font-bold">{data.summary.completedAppointments}</h3>
          <p>Completed</p>
        </div>

        <div className="bg-purple-100 shadow rounded p-4 text-center">
          <h3 className="text-xl font-bold">{data.summary.totalDoctors}</h3>
          <p>Doctors</p>
        </div>
      </div>

      {/* Upcoming Appointment */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Upcoming Appointment</h3>

        {data.appointments?.length > 0 ? (
          <div className="bg-gray-100 p-4 rounded shadow">
            <p>
              <b>Doctor:</b> {data.appointments[0].doctorName}
            </p>
            <p>
              <b>Date:</b> {data.appointments[0].date}
            </p>
            <p>
              <b>Time:</b> {data.appointments[0].time}
            </p>
          </div>
        ) : (
          <p>No upcoming appointments</p>
        )}
      </div>
    </div>
  );
}
