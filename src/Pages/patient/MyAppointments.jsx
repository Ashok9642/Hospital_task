import { useEffect, useState } from 'react';
import api from '../../services/api';
import { formatDate, formatTime } from '../../utils/dateFormatter';
export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      console.log('Hello');

      const res = await api.get('/appointments');

      setAppointments(res.data.data);
      console.log(res.data); // ✅ correct
    } catch (err) {
      console.log(err);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await api.put(`/appointments`, {
        status: 'Cancelled', // ✅ FIXED
      });

      alert('Appointment Cancelled ❌');
      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert('Cancel failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Appointments 📅</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Doctor</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-3">{app.doctor.name}</td>
                <td className="p-3">{formatDate(app.date)}</td>
                <td className="p-3">{formatTime(app.time)}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm
                      ${
                        app.status === 'Completed'
                          ? 'bg-green-500'
                          : app.status === 'Cancelled'
                            ? 'bg-red-500'
                            : 'bg-blue-500'
                      }`}
                  >
                    {app.status}
                  </span>
                </td>

                {
                  <td className="p-3">
                    {app.status === 'Upcoming' && (
                      <button
                        onClick={() => cancelAppointment(app._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
