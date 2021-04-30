const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const socketio = require('socket.io');
const log = require('./api/FuncLib/FuncLog');

server.listen(3001,function(){
    console.log('server 3001');
    log.LogInfo('Server Start');
});

const io = socketio.listen(server);
io.on('connection', (socket) => {
    console.log('wwwww : '+socket.id);

    socket.on('join', (data) => {
        console.log(data);
        // callback();
    });

    socket.on('sendMessage', (message, callback) => {
        console.log(message);

        callback();
    });

    socket.on('disconnect', () => {
        console.log('coneevct');
    })
});