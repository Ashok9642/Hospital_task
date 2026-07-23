const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();

    const totalDoctors = await Doctor.countDocuments();

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);

    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = await Appointment.countDocuments({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    res.status(200).json({
      patients: totalPatients,

      doctors: totalDoctors,

      appointments: todayAppointments,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Dashboard data failed',

      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
