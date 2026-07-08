import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/doctors/patients')
      .then((res) => setPatients(res.data))
      .catch((err) => {
        console.error(err);
        setError('Patients data load.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Patients</h2>

      {patients.length === 0 ? (
        <p className="text-gray-500">No patients found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {patients.map((p) => (
            <div key={p.patientId} className="bg-white shadow rounded p-4">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p>Age: {p.age}</p>
              <p>Gender: {p.gender}</p>
              <p className="text-gray-600 mt-2">Condition: {p.condition}</p>
              <p className="text-sm text-blue-500">Last Visit: {p.lastVisit}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
