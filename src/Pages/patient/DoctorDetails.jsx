import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function DoctorDetails() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await api.get(`/doctors/${doctorId}`);
        setDoctor(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!doctor) {
    return <h2>Doctor not found</h2>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{doctor.name}</h1>

      <p className="mt-3">Specialization: {doctor.specialization}</p>

      <p>Experience: {doctor.experience} years</p>

      <p>Consultation Fee: ₹ {doctor.consultationFee}</p>

      <h2 className="mt-6 text-xl font-semibold">Available Slots ⏰</h2>

      {doctor.availableSlots && doctor.availableSlots.length > 0 ? (
        <div className="mt-3">
          {doctor.availableSlots.map((slot, index) => (
            <button key={index} className="border px-4 py-2 mr-2 rounded">
              {slot}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-2">No slots available</p>
      )}
      <button
        onClick={() => navigate(`/patient/booking/${doctor._id}`)}
        className="mt-8 bg-blue-500 text-white px-6 py-3 rounded"
      >
        Book Appointment
      </button>
    </div>
  );
}
