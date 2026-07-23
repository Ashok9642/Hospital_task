const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/asyncHandler');

const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find();
  res.status(200).json({
    success: true,
    data: doctors,
  });
});

const createDoctor = asyncHandler(async (req, res) => {
  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: 'doctor',
  });

  const doctor = await Doctor.create({
    userId: user._id,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    specialization: req.body.specialization,
    experience: req.body.experience,
  });

  res.status(201).json({
    success: true,
    data: doctor,
  });
});

const getDoctorPatients = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.query.doctorId;

  if (!userId) {
    const error = new Error('Unauthorized: User ID missing');
    error.statusCode = 401;
    throw error;
  }

  const doctor = await Doctor.findOne({
    userId,
  });

  if (!doctor) {
    const error = new Error('Doctor not found');
    error.statusCode = 404;
    throw error;
  }

  const appointments = await Appointment.find({
    doctor: doctor._id,
  })
    .populate({
      path: 'patient',
      select: 'name age gender phone diseaseHistory',
    })
    .sort({
      date: -1,
    });

  const patients = appointments.map((app) => ({
    appointmentId: app._id,
    patientId: app.patient?._id,
    name: app.patient?.name,
    age: app.patient?.age,
    gender: app.patient?.gender,
    phone: app.patient?.phone,
    diseaseHistory: app.patient?.diseaseHistory,
    lastVisit: app.date,
    status: app.status,
  }));

  res.status(200).json({
    success: true,
    count: patients.length,
    data: patients,
  });
});

const getDoctorAppointments = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id || req.query.doctorId;

  if (!doctorId) {
    const error = new Error('Unauthorized: User missing');
    error.statusCode = 401;
    throw error;
  }

  const doctor = await Doctor.findOne({
    userId: doctorId,
  });

  if (!doctor) {
    const error = new Error('Doctor not found');
    error.statusCode = 404;
    throw error;
  }

  const appointments = await Appointment.find({
    doctor: doctor._id,
  })
    .populate('patient', 'name email phone')
    .sort({
      date: -1,
    });

  const formatted = appointments.map((app) => ({
    appointmentId: app._id,
    patientId: app.patient?._id,
    patientName: app.patient?.name,
    email: app.patient?.email,
    phone: app.patient?.phone,
    date: app.date,
    time: app.time,
    status: app.status,
  }));

  res.status(200).json({
    success: true,
    count: formatted.length,
    data: formatted,
  });
});

const doctordashboardetails = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.query.doctorId;

  const doctor = await Doctor.findOne({
    userId,
  });

  if (!doctor) {
    const error = new Error('Doctor not found');
    error.statusCode = 404;
    throw error;
  }

  const appointments = await Appointment.find({
    doctor: doctor._id,
  }).populate('patient', 'name');

  const totalPatients = new Set(appointments.map((a) => a.patient?._id.toString())).size;

  const today = new Date().toDateString();

  const todayAppointments = appointments
    .filter((a) => new Date(a.date).toDateString() === today)
    .map((a) => ({
      patientName: a.patient?.name,
      time: a.time,
      status: a.status,
    }));

  res.json({
    doctor: {
      name: doctor.name,
      specialization: doctor.specialization,
    },

    summary: {
      totalPatients,
      totalAppointments: appointments.length,
      todayAppointments: todayAppointments.length,
    },

    todayAppointments,
  });
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');

  if (!doctor) {
    const error = new Error('Doctor not found');
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    data: doctor,
  });
});

module.exports = {
  getDoctors,
  createDoctor,
  getDoctorPatients,
  getDoctorAppointments,
  doctordashboardetails,
  getDoctorById,
};
