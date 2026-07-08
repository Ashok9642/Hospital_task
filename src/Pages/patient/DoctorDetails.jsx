import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    api
      .get(`/doctors/${id}`)
      .then((res) => setDoctor(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const bookAppointment = async () => {
    if (!selectedSlot) {
      alert('Please select a slot');
      return;
    }

    try {
      await api.post('/appointments', {
        doctorId: id,
        date: '2026-07-10',
        time: selectedSlot,
        symptoms: 'General checkup',
      });

      alert('Appointment Booked Successfully ✅');

      navigate('/patient/appointments');
    } catch (err) {
      console.log(err);
      alert('Booking failed ❌');
    }
  };

  if (!doctor) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{doctor.name}</h2>

      <p className="text-gray-600">{doctor.specialization}</p>

      <p className="mt-2">Experience: {doctor.experience} years</p>

      <p>Consultation Fee: ₹{doctor.fee}</p>

      {/* Slots */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Available Slots ⏰</h3>

      <div className="flex gap-3 flex-wrap">
        {doctor.availableSlots?.map((slot, i) => (
          <button
            key={i}
            onClick={() => setSelectedSlot(slot)}
            className={`px-4 py-2 rounded border 
              ${selectedSlot === slot ? 'bg-green-500 text-white' : 'bg-white hover:bg-gray-100'}`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Book Button */}
      <button onClick={bookAppointment} className="mt-6 bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600">
        Book Appointment
      </button>
    </div>
  );
}
