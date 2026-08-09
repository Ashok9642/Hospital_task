const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Doctor',
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient',
    },

    senderRole: {
      type: String,
      enum: ['doctor', 'patient'],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isDelivered: {
      type: Boolean,
      default: false,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', messageSchema);
