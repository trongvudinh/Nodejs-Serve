const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const socketio = require('socket.io');
const realtime =require('./realtime/realtime');
const log = require('./api/FuncLib/FuncLog');

server.listen(3001,function(){
    console.log('server 3001');
    log.LogInfo('Server Start');
});

const io = socketio.listen(server);
realtime.realtime(io);

exports.io = io;