const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http'); 
const { Server } = require('socket.io'); 
require('dotenv').config();

// --- IMPORTS ---
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes'); 
const Message = require('./models/Message'); 

// --- ALLOWED ORIGINS ---
// Define your allowed domains once so it's easy to update later
const allowedOrigins = [
  "http://localhost:5173",
  "https://draxie-verse.vercel.app"
];

// --- APP SETUP ---
const app = express();

// Update Express CORS to recognize Vercel
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

connectDB();

// --- MOUNT ROUTES ---
app.use('/api', uploadRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes); 

// --- SOCKET.IO SETUP ---
const server = http.createServer(app);

// Update Socket.io CORS to recognize Vercel
const io = new Server(server, {
  cors: {
    origin: allowedOrigins, 
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`🔌 User connected: ${socket.id}`);

  socket.on('join_chat', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('send_message', async (data) => {
    // Save to MongoDB
    try {
      await Message.create({
        senderEmail: data.sender,
        receiverEmail: data.receiver,
        content: data.text,
      });
    } catch (error) {
      console.error("Error saving message to DB:", error);
    }

    // Broadcast to the room
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});