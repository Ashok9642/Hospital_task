const express = require('express');
const router = express.Router();

const {
  getDoctors,
  createDoctor,
  getDoctorPatients,
  getDoctorAppointments,
  doctordashboardetails,
  getDoctorById,
} = require('../controllers/doctorController');
console.log({
  getDoctors,
  createDoctor,
  getDoctorPatients,
  getDoctorAppointments,
  doctordashboardetails,
  getDoctorById,
});
router.get('/', getDoctors);
router.post('/', createDoctor);
router.get('/patients', getDoctorPatients);
router.get('/appointments', getDoctorAppointments);
router.get('/dashboard', doctordashboardetails);
router.get('/:id', getDoctorById);

module.exports = router;
