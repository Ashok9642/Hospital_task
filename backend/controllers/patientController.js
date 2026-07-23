const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const asyncHandler = require('../middleware/asyncHandler');

const getPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find().sort({ createdAt: -1 });

  res.status(200).json(patients);
});

const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    const error = new Error('Patient not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(patient);
});
const createPatient = asyncHandler(async (req, res) => {
  const { userId, name, age, gender, phone } = req.body;

  const patient = await Patient.create({
    userId,
    name,
    age,
    gender,
    phone,
  });

  res.status(201).json({
    success: true,
    message: 'Patient created successfully',
    patient,
  });
});

const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!patient) {
    const error = new Error('Patient not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: 'Patient updated successfully',
    patient,
  });
});

// Delete Patient
const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) {
    const error = new Error('Patient not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    message: 'Patient deleted successfully',
  });
});
const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const profile = await Patient.findOne({
    userId,
  });

  if (!profile) {
    const error = new Error('Profile not found');
    error.statusCode = 404;
    throw error;
  }

  res.json(profile);
});
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const updated = await Patient.findOneAndUpdate({ userId }, req.body, {
    new: true,
  });

  if (!updated) {
    const error = new Error('Profile not found');
    error.statusCode = 404;
    throw error;
  }

  res.json(updated);
});

const getPatientDashboard = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  const patient = await Patient.findOne({
    userId,
  });

  if (!patient) {
    const error = new Error('Patient not found');
    error.statusCode = 404;
    throw error;
  }

  const appointments = await Appointment.find({
    patient: patient._id,
  })
    .populate('doctor', 'name specialization email')
    .sort({ date: -1 });

  res.status(200).json({
    success: true,
    patient,
    appointments,
  });
});

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  updateProfile,
  getProfile,
  getPatientDashboard,
};
