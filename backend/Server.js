const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const http = require('http');
// const initializeSocket = require('./socket/socket');
const { initializeSocket } = require('./socket/socket');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const errorHandler = require('./middleware/errorHandler');

const { Server } = require('socket.io');

const app = express();

// Create HTTP Server for Express + Socket.IO
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(cookieParser());

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

// Socket Connection
// io.on('connection', (socket) => {
//   console.log('User Connected:', socket.id);

//   socket.on('disconnect', () => {
//     console.log('User Disconnected:', socket.id);
//   });
// });
initializeSocket(io);

// Routes
app.use('/api', userRoutes);

app.use('/api/appointments', appointmentRoutes);

app.use('/api/patients', patientRoutes);

app.use('/api/doctors', doctorRoutes);

app.use('/api/dashboard', dashboardRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('Server running...');
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global Error Handler
app.use(errorHandler);

// Connect DB and Start Server
connectDB()
  .then(() => {
    server.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('DB Connection failed:', err.message);
  });
