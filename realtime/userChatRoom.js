const googleDrive = require('../api/FuncLib/googledrive');

var ListUserRoom =[{
    room :{
        name:'',
    },
    listUser:[{
        id:'_',
        type:0,//0:user ,1 :temp
        socketId:'',
    }]
}];
const NewUserChatRoom = (roomName)=>{
    const temp = ListUserRoom.find( c => c.room.name == roomName);
    if (temp){}
    else ListUserRoom.push({
        room :{
            name:roomName,
        },
        listUser:[]
    })
}
const addUserToRoom = (roomName,user,socketId,type)=>{
    const temp = ListUserRoom.find( c => c.room.name == roomName);
    const index =ListUserRoom.indexOf(index);
    const listUs = ListUserRoom[index].listUser;
}

module.exports= {NewUserChatRoom};