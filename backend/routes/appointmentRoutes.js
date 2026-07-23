const express = require('express');
const router = express.Router();

const {
  createAppointment,
  updateAppointment,
  getAppointments,
  getAppointmentById,
  deleteAppointment,
  getAllAppointments,
} = require('../controllers/appointmentController');
const verifyToken = require('../middleware/auth');
router.use(verifyToken);
router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/all', getAllAppointments);
router.get('/:id', getAppointmentById);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);
module.exports = router;
