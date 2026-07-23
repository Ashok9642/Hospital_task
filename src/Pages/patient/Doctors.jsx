import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/doctors')
      .then((res) => setDoctors(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Doctors List 🩺</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div key={doc._id} className="bg-white shadow-md rounded-lg p-5 border hover:shadow-xl transition">
            <h3 className="text-xl font-semibold">{doc.name}</h3>

            <p className="text-gray-600">{doc.specialization}</p>

            <p className="text-sm mt-1">Experience: {doc.experience} years</p>

            <p className="text-sm">Rating: {doc.rating}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/patient/doctordetails/${doc._id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                View
              </button>

              <button
                onClick={() => navigate(`/patient/booking/${doc._id}`)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
