const express = require('express');
const router = express.Router();

const {
  createAppointment,
  updateAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
} = require('../controllers/appointmentController');

// Create appointment
router.post('/', createAppointment);

// Get all appointments (or user-based if you add auth)
router.get('/', getAppointments);

// Get single appointment (optional)
router.get('/:id', getAppointmentById);

// Update appointment (status update also happens here)
router.put('/:id', updateAppointment);

// Delete appointment
router.delete('/:id', deleteAppointment);

module.exports = router;
