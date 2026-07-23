import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import AiAssistant from '../AiAssistant';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    phone: '',
  });

  // GET PATIENTS
  const getPatients = async () => {
    try {
      const res = await api.get('/patients');
      setPatients(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);

      // update UI without reload
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // EDIT
  const handleEdit = (patient) => {
    setFormData({
      name: patient.name,
      email: patient.email || '',
      password: '',
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
    });

    setEditId(patient._id);
    setShowModal(true);
  };

  // SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        await api.put(`/patients/${editId}`, {
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          phone: formData.phone,
        });

        setPatients((prev) => prev.map((p) => (p._id === editId ? { ...p, ...formData } : p)));

        setEditId(null);
      } else {
        // CREATE USER
        const userRes = await api.post('/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'patient',
        });

        const userId = userRes.data.data._id;

        // CREATE PATIENT PROFILE
        const patientRes = await api.post('/patients', {
          userId,
          name: formData.name,
          age: formData.age,
          gender: formData.gender,
          phone: formData.phone,
        });

        setPatients((prev) => [...prev, patientRes.data]);
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        phone: '',
      });

      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  // AG GRID COLUMN DEFINITIONS
  const columnDefs = [
    { headerName: 'Name', field: 'name', flex: 2 },
    { headerName: 'Age', field: 'age', flex: 1 },
    { headerName: 'Gender', field: 'gender', flex: 1 },
    { headerName: 'Phone', field: 'phone', flex: 2 },
    {
      headerName: 'Actions',
      field: '_id',
      flex: 1,
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <div className="flex gap-2 items-center h-full">
          <button onClick={() => handleEdit(params.data)} className="bg-green-500 text-white px-5 py-1 rounded">
            Edit
          </button>

          <button onClick={() => handleDelete(params.data._id)} className="bg-red-500 text-white px-5 py-1 rounded">
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Patients Management</h1>

        <button
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setFormData({
              name: '',
              email: '',
              password: '',
              age: '',
              gender: '',
              phone: '',
            });
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Patient
        </button>
      </div>

      {/* AG GRID TABLE */}
      <div className="ag-theme-alpine bg-white" style={{ height: 500, width: '100%' }}>
        <AgGridReact rowData={patients} columnDefs={columnDefs} pagination={true} paginationPageSize={5} />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Patient' : 'Add Patient'}</h2>

            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
                required
              />

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
                required
                disabled={!!editId}
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
                required={!editId}
              />

              <input
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-2"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded p-2 mb-4"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  {editId ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <AiAssistant />
    </div>
  );
};

export default Patients;
