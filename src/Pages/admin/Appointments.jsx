import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const Appointments = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    doctorId: '',
    patientId: '',
    appointmentDate: '',
    appointmentTime: '',
  });

  const fetchData = async () => {
    try {
      setLoading(true);

      const [doctorRes, patientRes, appointmentRes] = await Promise.all([
        api.get('/doctors'),
        api.get('/patients'),
        api.get('/appointments'),
      ]);

      setDoctors(doctorRes.data?.data || doctorRes.data || []);
      setPatients(patientRes.data?.data || patientRes.data || []);
      setAppointments(appointmentRes.data?.data || []);
    } catch (error) {
      console.log('API Error:', error);
      setDoctors([]);
      setPatients([]);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    try {
      const payload = {
        doctorId: formData.doctorId,
        patientId: formData.patientId,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
      };

      const res = await api.post('/appointments', payload);

      if (res.status === 200 || res.status === 201) {
        alert('Appointment Created Successfully');

        setFormData({
          doctorId: '',
          patientId: '',
          appointmentDate: '',
          appointmentTime: '',
        });

        fetchData();
      }
    } catch (error) {
      console.log('Create Error:', error?.response?.data || error.message);
      alert(error?.response?.data?.message || 'Error creating appointment');
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Appointment Management</h1>
        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create Appointment</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* DOCTOR */}
            <select name="doctorId" value={formData.doctorId} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.name}
                </option>
              ))}
            </select>

            {/* PATIENT */}
            <select name="patientId" value={formData.patientId} onChange={handleChange} className="border p-2 rounded">
              <option value="">Select Patient</option>
              {patients.map((pat) => (
                <option key={pat._id} value={pat._id}>
                  {pat.name}
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            {/* TIME */}
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <button onClick={handleCreate} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded">
            Create
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Appointments List</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="p-3 text-left">Patient</th>
                    <th className="p-3 text-left">Doctor</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Time</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((a) => (
                      <tr key={a._id} className="border-b">
                        <td className="p-3">{a.patient?.name || '-'}</td>
                        <td className="p-3">{a.doctor?.name || '-'}</td>

                        <td className="p-3">
                          {a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString() : '-'}
                        </td>

                        <td className="p-3">{a.appointmentTime || '-'}</td>

                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              a.status === 'Confirmed'
                                ? 'bg-green-100 text-green-700'
                                : a.status === 'Cancelled'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {a.status || 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-6 text-gray-500">
                        No Appointments Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;
