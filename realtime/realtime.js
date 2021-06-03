const socketio = require('socket.io');
const log = require('./../api/FuncLib/FuncLog');
const jwtHelper = require('./../api/FuncLib/token');
const FuncLib  = require('./../api/FuncLib/FuncLib');
const UserSocket = require('./userSocket');
const User = require('./../api/models/user');
const UserChatRoom = require('./userChatRoom');

const realtime = (io)=>{
    io.on('connection', async (socket) => {
        //console.log(socket.handshake)
        console.log('wwwww : '+socket.id);
        console.log(socket.handshake.query.user);
        const userId = '';
        const type ='';
        const token = socket.handshake.query.token;
        try {
            const decoded = await jwtHelper.verifyToken(token, process.env.JWT_SECRET);  
            const user = await User.find({id : decoded.data.id}).exec();
            const listFriend = user.lst_friend;
            const listFollow = user.lst_follow;
            socket.join(`onApproved_${user.id}`);
            socket.join(`onNotification_${user.id}`);
            if (user.level >= 7){
                socket.join(`onAdminApproved`);
                socket.join(`onAdminNotification`);
            }
            listFriend.forEach(friend => {
                socket.join(FuncLib.GetChatName(user.id,friend));
            });
            listFollow.forEach(fol => {
                socket.join(`follow_${fol}`);
            });
            userId =decoded.data.id;
            type = decoded.data.type;

        } catch (error) {
            
        }
        socket.join("admin_chat");

        UserSocket.addUserSocket(userId,type,socket.id);


        socket.on('join', (roomName) => {
            console.log(data);
            // callback();
        });
        socket.on('creatApproved',(data) =>{
            const approved =data.Notification;
            const roomName= approved.isto_admin ==0 ? `onAdminApproved` : `onApproved_${approved.touser}`;
            io.in(roomName).emit('newApproved',approved);
        })

        socket.on('sendMessage', (message, callback) => {
            console.log(message);
    
            callback();
        });
    
        socket.on('disconnect', () => {
            console.log('coneevct');
        })
    });
}
module.exports ={realtime};