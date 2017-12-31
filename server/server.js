const express = require('express');
const app = express();
const socketIO = require('socket.io');

const http = require('http');
const path = require('path');

var port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('connected to client- new user connected');

    socket.on('createMessage', (message) => {
        console.log('created message: ', message);
        io.emit('newMessage', {
            text: message.text,
            from: message.from,
            createdAt: new Date().getTime()
        });
    })

    socket.on('disconnect', () => {
        console.log('client disconnected');
    })
})

app.use(express.static(path.join(__dirname, '../public')));

app.get('/favicon.ico', (req, res) => {
    res.status(204);
});

server.listen(port, () => console.log(`listening on port: ${port}`));