import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { formatDate, formatTime } from '../../utils/dateFormatter';

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useSelector((state) => state.auth);

  const fetchAppointments = async () => {
    try {
      if (!user?.id) return;

      setLoading(true);
      setError(null); // reset old error before every fetch

      const res = await api.get(`/doctors/appointments?doctorId=${user.id}`);

      setAppointments(res.data?.data || []);
    } catch (err) {
      console.log(err.response?.data);

      // Treat "not found" as empty list, not a real error
      if (err.response?.status === 404) {
        setAppointments([]);
      } else {
        setError('Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [user]);

  const updateStatus = async (id, status, reason = '') => {
    try {
      await api.put(`/appointments/${id}`, {
        status,
        rejectionReason: reason,
      });

      fetchAppointments();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const handleReject = (id) => {
    const reason = window.prompt('Enter rejection reason');

    if (reason && reason.trim()) {
      updateStatus(id, 'Rejected', reason);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  // Only show this for real failures now, not for "no appointments"
  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Appointments</h2>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Patient</th>

              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-left">Time</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-5 text-center text-gray-500">
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((a) => (
                <tr key={a.appointmentId} className="border-t">
                  <td className="p-3">{a.patientName}</td>

                  <td className="p-3">{formatDate(a.date)}</td>

                  <td className="p-3">{formatTime(a.time)}</td>

                  <td className="p-3">
                    <span
                      className={`
                  px-2 py-1 rounded text-white text-sm

                  ${
                    a.status === 'Completed'
                      ? 'bg-green-500'
                      : a.status === 'Confirmed'
                        ? 'bg-blue-500'
                        : a.status === 'Rejected'
                          ? 'bg-red-500'
                          : 'bg-yellow-500'
                  }

                  `}
                    >
                      {a.status}
                    </span>

                    {a.status === 'Rejected' && (
                      <p className="text-sm text-red-600 mt-2">Reason: {a.rejectionReason}</p>
                    )}
                  </td>

                  <td className="p-3">
                    {a.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateStatus(a.appointmentId, 'Confirmed')}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() => handleReject(a.appointmentId)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {a.status === 'Confirmed' && (
                      <button
                        onClick={() => updateStatus(a.appointmentId, 'Completed')}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}

                    {a.status === 'Completed' && <span>Done</span>}

                    {a.status === 'Rejected' && <span>Rejected</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
