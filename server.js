const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

app.use(express.static('client'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

const server = app.listen(8000, () => {
    console.log('Server is running on port:', 8000);
});
const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log("Oh, I've got something from " + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', () => {
        console.log('Oh, socket ' + socket.id + ' has left');
        const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      const user = users.splice(index, 1)[0];
      console.log( 'User ' +  user.login +  ' with socket id ' +  user.id + ' has left the chat');
      socket.broadcast.emit('removeUser', user);
    }
    });
    socket.on('join', ({ login }) => {
        console.log('JOIN user: ' + login + ' id: ' + socket.id);
        users.push({ login: login, id: socket.id });
        socket.broadcast.emit('newUser', login);
      });
});
