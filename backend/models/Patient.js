const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: String,
    phone: {
      type: String,
      required: true,
    },
    diseaseHistory: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model('Patient', patientSchema);
