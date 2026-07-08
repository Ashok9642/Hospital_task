import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
  });

  useEffect(() => {
    api
      .get('/patients/profile')
      .then((res) => {
        setProfile(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      const res = await api.put('/patients/profile', formData);
      setProfile(res.data);
      setEditMode(false);
      alert('Profile Updated ✅');
    } catch (err) {
      console.log(err);
      alert('Update failed ❌');
    }
  };

  if (!profile) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-6">My Profile 👤</h2>

      {/* View Mode */}
      {!editMode ? (
        <div className="bg-white shadow p-5 rounded">
          <p>
            <b>Name:</b> {profile.name}
          </p>
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>Phone:</b> {profile.phone}
          </p>
          <p>
            <b>Age:</b> {profile.age}
          </p>
          <p>
            <b>Gender:</b> {profile.gender}
          </p>

          <button onClick={() => setEditMode(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      ) : (
        /* Edit Mode */
        <div className="bg-white shadow p-5 rounded space-y-3">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Name"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Email"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Phone"
          />

          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Age"
          />

          <input
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 w-full"
            placeholder="Gender"
          />

          <div className="flex gap-3">
            <button onClick={updateProfile} className="bg-green-500 text-white px-4 py-2 rounded">
              Save
            </button>

            <button onClick={() => setEditMode(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
