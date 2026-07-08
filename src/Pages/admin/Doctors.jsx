import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const specializations = [
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Gynecology',
    'ENT',
    'Ophthalmology',
    'Psychiatry',
    'General Medicine',
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialization: '',
    experience: '',
  });

  // GET doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/doctors', formData);

      alert('Doctor Added Successfully');

      setFormData({
        name: '',
        email: '',
        phone: '',
        specialization: '',
        experience: '',
      });

      setDropdownOpen(false);
      setShowModal(false);
      getDoctors();
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Doctors Management</h1>

        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Doctor
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        <table className="w-full">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Specialization</th>
              <th className="p-3">Experience</th>
            </tr>
          </thead>

          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <tr key={doc._id} className="border-b">
                  <td className="p-3">{doc.name}</td>
                  <td className="p-3">{doc.email}</td>
                  <td className="p-3">{doc.phone}</td>
                  <td className="p-3">{doc.specialization}</td>
                  <td className="p-3">{doc.experience} Years</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="5">
                  No Doctors Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-[420px] rounded p-5 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Add Doctor</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              {/* SPECIALIZATION DROPDOWN */}
              <div className="mb-3 relative">
                <p className="mb-1 text-sm font-medium">Specialization</p>

                {/* SELECT BOX */}
                <div
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="border rounded p-2 bg-gray-50 cursor-pointer"
                >
                  {formData.specialization || 'Select Specialization'}
                </div>

                {/* DROPDOWN LIST */}
                {dropdownOpen && (
                  <div className="absolute z-10 w-full border rounded max-h-40 overflow-y-auto bg-white mt-1 shadow">
                    {specializations.map((item) => (
                      <div
                        key={item}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            specialization: item,
                          });
                          setDropdownOpen(false);
                        }}
                        className={`p-2 cursor-pointer hover:bg-blue-100 ${
                          formData.specialization === item ? 'bg-blue-200' : ''
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <input
                type="number"
                name="experience"
                placeholder="Experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border p-2 mb-3 rounded"
                required
              />

              {/* BUTTONS */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>

                <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
