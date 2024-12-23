const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let users = [];

io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle video sync actions
  socket.on('video-action', (data) => {
    socket.broadcast.emit('video-action', data); // Broadcast video actions to others
  });

  // Handle messages
  socket.on('message', (msg) => {
    io.emit('message', msg); // Broadcast messages to all users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
