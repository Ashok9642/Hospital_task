const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const asyncHandler = require('../middleware/asyncHandler');

// Create Appointment
const createAppointment = asyncHandler(async (req, res) => {
  const { doctorId, patientId, appointmentDate, appointmentTime, status, reason } = req.body;

  let finalPatientId = patientId;

  if (!finalPatientId && req.user?.role === 'patient') {
    const patient = await Patient.findOne({
      userId: req.user.id,
    });

    if (!patient) {
      const error = new Error('Patient not found');
      error.statusCode = 404;
      throw error;
    }

    finalPatientId = patient._id;
  }

  const appointment = await Appointment.create({
    doctor: doctorId,

    patient: finalPatientId,

    date: appointmentDate,

    time: appointmentTime,

    reasons: reason || '',

    status: status || 'Pending',
  });

  res.status(201).json({
    success: true,

    message: 'Appointment created successfully',

    data: appointment,
  });
});

// Get Patient Appointments
const getAppointments = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({
    userId: req.user.id,
  });

  if (!patient) {
    const error = new Error('Patient not found');
    error.statusCode = 404;
    throw error;
  }

  const appointments = await Appointment.find({
    patient: patient._id,
  })

    .populate('doctor', 'name email specialization')

    .populate('patient', 'name email phone');

  res.status(200).json({
    success: true,

    data: appointments,
  });
});

const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,

    req.body,

    {
      new: true,
      runValidators: true,
    },
  );

  if (!appointment) {
    const error = new Error('Appointment not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,

    message: 'Updated successfully',

    data: appointment,
  });
});
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findByIdAndDelete(req.params.id);

  if (!appointment) {
    const error = new Error('Appointment not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,

    message: 'Deleted successfully',
  });
});
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)

    .populate('doctor', 'name email specialization')

    .populate('patient', 'name email phone');

  if (!appointment) {
    const error = new Error('Appointment not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: appointment,
  });
});

const getAllAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find()

    .populate('doctor', 'name email specialization')

    .populate('patient', 'name email phone')

    .sort({
      createdAt: -1,
    });

  res.status(200).json({ success: true, data: appointments });
});

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
  getAllAppointments,
  getAppointmentById,
};
