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
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
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
