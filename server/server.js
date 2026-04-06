const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http'); // NEW: Required for Socket.io
const { Server } = require('socket.io'); // NEW: Import Socket.io
require('dotenv').config();

const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', uploadRoutes);

// --- NEW: SOCKET.IO SETUP ---
// 1. Create an HTTP server wrapping the Express app
const server = http.createServer(app);

// 2. Initialize Socket.io with CORS allowed for your React frontend
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your Vite frontend URL
    methods: ["GET", "POST"]
  }
});

// 3. Listen for real-time connections
io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  // When a user opens a specific chat, they "join" a room
  socket.on('join_chat', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // When a user sends a message
  socket.on('send_message', async (data) => {
    // Here you could also save `data` to MongoDB using the Message model
    // e.g., await Message.create({ senderEmail: data.sender, receiverEmail: data.receiver, content: data.text })
    
    // Bounce the message to everyone in that specific chat room
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// CRITICAL: Change app.listen to server.listen so WebSockets work!
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});