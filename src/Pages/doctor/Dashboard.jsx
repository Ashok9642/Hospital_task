import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetDoctorDashboardQuery } from '../../services/doctorApi';
import { formatTime } from '../../utils/dateFormatter';
import socket from '../../services/socket';

export default function DoctorDashboard() {
  const { user } = useSelector((state) => state.auth);

  const { data, isLoading, error } = useGetDoctorDashboardQuery(user?.id);

  // realtime notification state
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (!user?.id) return;

    // Doctor specific room join
    socket.emit('joinRoom', {
      userId: user.id,
      role: 'doctor',
    });

    // Listen new appointment event
    socket.on('newAppointment', (data) => {
      setNotification(data.message);
    });

    // cleanup
    return () => {
      socket.off('newAppointment');
    };
  }, [user?.id]);

  if (isLoading) {
    return <div className="p-5">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Failed to load dashboard</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="p-6">
      {/* Realtime Notification */}

      {notification && <div className="bg-yellow-100 p-3 rounded mb-4">🔔 {notification}</div>}

      <h2 className="text-2xl font-bold mb-4">Welcome {data.doctor.name}</h2>

      <p className="text-gray-600 mb-6">{data.doctor.specialization}</p>

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

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Today's Appointments</h3>

        {data.todayAppointments.map((app, i) => (
          <div key={i} className="bg-gray-100 p-3 rounded mb-2 flex justify-between">
            <p>{app.patientName}</p>

            <p>{formatTime(app.time)}</p>

            <span className="text-blue-600">{app.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
