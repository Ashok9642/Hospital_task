import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSelector } from 'react-redux';
import { formatDate, formatTime } from '../../utils/dateFormatter';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    api.get(`/patients/dashboard?doctorId=${user.id}`).then((res) => {
      setData(res.data);
    });
  }, [user.id]);

  if (!data) {
    return <div className="p-5">Loading...</div>;
  }

  const pendingAppointments = data.appointments.filter((item) => item.status === 'Pending').length;

  const completedAppointments = data.appointments.filter((item) => item.status === 'Completed').length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome {data.patient.name} 👋</h2>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 shadow rounded p-4 text-center">
          <h3 className="text-2xl font-bold">{data.appointments.length}</h3>
          <p>Total Appointments</p>
        </div>

        <div className="bg-yellow-100 shadow rounded p-4 text-center">
          <h3 className="text-2xl font-bold">{pendingAppointments}</h3>
          <p>Pending</p>
        </div>

        <div className="bg-green-100 shadow rounded p-4 text-center">
          <h3 className="text-2xl font-bold">{completedAppointments}</h3>
          <p>Completed</p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3">Appointments</h3>

      {data.appointments.length > 0 ? (
        <table className="w-full border border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Specialization</th>
            </tr>
          </thead>

          <tbody>
            {data.appointments.map((item) => (
              <tr key={item._id}>
                <td className="border p-2">{formatDate(item.date)}</td>

                <td className="border p-2">{formatTime(item.time)}</td>

                <td className="border p-2">{item.status}</td>

                <td className="border p-2">{item.doctor?.name}</td>
                <td className="border p-2">{item.doctor?.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Appointments Found</p>
      )}
    </div>
  );
}
