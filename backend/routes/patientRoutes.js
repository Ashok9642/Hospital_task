const express = require('express');
const router = express.Router();

const {
  getPatients,
  createPatient,
  getProfile,
  updateProfile,
  getPatientDashboard,
  getPatientById,
} = require('../controllers/patientController');

const verifyToken = require('../middleware/auth');

router.use(verifyToken);

router.get('/', getPatients);
router.post('/', createPatient);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

router.get('/dashboard', getPatientDashboard);
router.get('/:id', getPatientById);

module.exports = router;
