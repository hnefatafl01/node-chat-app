const express = require('express');
const app = express();
const socketIO = require('socket.io');

const http = require('http');
const path = require('path');

var { generateMessage, generateLocationMessage } = require('./utils/message');

var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('connected to client- new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to nes chat!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined chat'));

    socket.on('createMessage', (message, callback) => {
        console.log('created message: ', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('data sent from server');
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', (req, res) => {
    res.status(204);
});

server.listen(port, () => console.log(`listening on port: ${port}`));