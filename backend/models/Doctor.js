const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },

    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
    },

    experience: {
      type: Number,
      required: [true, 'Experience is required'],
      min: 0,
    },

    qualification: {
      type: String,
      default: '',
    },

    consultationFee: {
      type: Number,
      default: 0,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Doctor', doctorSchema);
