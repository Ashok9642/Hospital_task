import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/appointments', {
        doctor: doctorId,
        ...formData,
      });

      alert('Appointment Booked Successfully');
      navigate('/patient/my-appointments');
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Book Appointment</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Appointment Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Appointment Time</label>

            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Reason</label>

            <textarea
              rows="4"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Describe your health issue..."
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
