const Message = require('../models/Message');

let io;

const initializeSocket = (socketIO) => {
  io = socketIO;

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinRoom', (room) => {
      socket.join(room);

      console.log('Joined room:', room);
    });

    socket.on('join_chat', ({ doctorId, patientId }) => {
      const room = `chat_${doctorId}_${patientId}`;

      socket.join(room);

      console.log('Joined chat room:', room);

      socket.emit('chat_joined', {
        room,
      });
    });

    // SEND MESSAGE
    socket.on('send_message', async ({ doctorId, patientId, senderRole, message }) => {
      try {
        const room = `chat_${doctorId}_${patientId}`;

        const savedMessage = await Message.create({
          doctorId,
          patientId,
          senderRole,
          message,
          isDelivered: false,
          isRead: false,
        });

        console.log('Message saved:', savedMessage._id);

        // Send to both users
        console.log('Sending message to room:', room);
        io.to(room).emit('receive_message', savedMessage);
      } catch (error) {
        console.error('Message save error:', error);
      }
    });

    // MESSAGE DELIVERED
    socket.on('message_delivered', async ({ messageId, doctorId, patientId }) => {
      try {
        const updatedMessage = await Message.findByIdAndUpdate(
          messageId,
          {
            isDelivered: true,
          },
          {
            new: true,
          },
        );

        if (!updatedMessage) {
          console.log('Message not found:', messageId);
          return;
        }

        const room = `chat_${doctorId}_${patientId}`;

        // Tell both users
        io.to(room).emit('message_status_updated', {
          messageId: updatedMessage._id,
          isDelivered: true,
          isRead: updatedMessage.isRead,
        });

        console.log('Message delivered:', messageId);
      } catch (error) {
        console.error('Delivery update error:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};
