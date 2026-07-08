import axios from 'axios';
import api from './api';

const API_URL = 'http://localhost:5000/api/appointments';

export const getAppointments = () => axios.get(API_URL);

export const createAppointment = (data) => axios.post(API_URL, data);

export const updateAppointment = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteAppointment = (id) => axios.delete(`${API_URL}/${id}`);
