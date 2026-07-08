const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDoctorPatients = async (req, res) => {
  try {
    // assuming auth middleware sets req.user
    const doctorId = req.user?.id;

    if (!doctorId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: doctorId missing',
      });
    }

    // Get all appointments for this doctor
    const appointments = await Appointment.find({ doctorId })
      .populate({
        path: 'patientId',
        select: 'name age gender condition lastVisit',
      })
      .sort({ date: -1 });

    // Transform response (clean frontend format)
    const patients = appointments.map((app) => ({
      appointmentId: app._id,
      patientId: app.patientId?._id,
      name: app.patientId?.name,
      age: app.patientId?.age,
      gender: app.patientId?.gender,
      condition: app.patientId?.condition,
      lastVisit: app.date,
      status: app.status,
    }));

    res.status(200).json({
      success: true,
      count: patients.length,
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user?.id || req.query.doctorId;
    console.log('from doctor table', doctorId);

    if (!doctorId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: doctorId missing',
      });
    }

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate({
        path: 'patient',
        select: 'name email phone',
      })
      .sort({ date: -1 });

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDoctors,
  createDoctor,
  getDoctorPatients,
};
