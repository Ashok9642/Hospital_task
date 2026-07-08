const express = require('express');
const router = express.Router();

const {
  getDoctors,
  createDoctor,
  getDoctorPatients,
  getDoctorAppointments,
} = require('../controllers/doctorController');

router.get('/', getDoctors);

router.post('/', createDoctor);

// New Route
router.get('/patients', getDoctorPatients);
router.get('/appointments', getDoctorAppointments);

module.exports = router;
