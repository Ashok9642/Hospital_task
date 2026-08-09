const Message = require('../models/Message');

const getMessages = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const messages = await Message.find({
      doctorId,
      patientId,
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Get messages error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch messages',
    });
  }
};

module.exports = {
  getMessages,
};
