import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    alert(user?.id);
    if (!user?.id) return;

    api.get(`/doctors/appointments?doctorId=${user.id}`).then((res) => setAppointments(res.data.data));
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Appointments </h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a.appointmentId} className="border-t">
                <td className="p-3">{a.patientName}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.time}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm
                      ${
                        a.status === 'Completed'
                          ? 'bg-green-500'
                          : a.status === 'Upcoming'
                            ? 'bg-blue-500'
                            : 'bg-red-500'
                      }`}
                  >
                    {a.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
