const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve static files if needed

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('video-action', (data) => {
    socket.broadcast.emit('video-action', data); // Sync video
  });

  socket.on('message', (msg) => {
    io.emit('message', msg); // Broadcast chat messages
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
