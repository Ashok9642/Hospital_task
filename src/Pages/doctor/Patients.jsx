import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        if (!user?.id) return;

        const res = await api.get(`/doctors/patients?doctorId=${user.id}`);
        console.log('paitients details', res);
        setPatients(res.data?.data || []);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, [user]);

  if (loading) {
    return <div className="p-6 text-center">Loading patients...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">My Patients</h2>

        <p className="text-gray-500 mt-1">Patients who have appointments with you</p>
      </div>
      {console.log('PATIENTS STATE', patients)}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {patients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No patients found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Patient Name</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.patientId} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">{patient.name}</td>

                  <td className="p-4">{patient.age}</td>

                  <td className="p-4">{patient.gender}</td>

                  <td className="p-4">{patient.phone}</td>

                  <td className="p-4 text-center">
                    <Link
                      to={`/chat/${patient.doctorId}/${patient.patientId}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Chat
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
