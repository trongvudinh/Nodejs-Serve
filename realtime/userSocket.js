const googleDrive = require('./../api/FuncLib/googledrive');

var ListUser =[{
    user:{
        id:'_',
        type:0,//0:user ,1 :temp

    },
    socketId:'_',
    VideoTemp:[],
}];
const addUserSocket = (userId,type,socketId)=>{
    const temp ={
        user:{
            id:userId,
            type:type,

        },
        socketId:socketId,
        VideoTemp:[],
    }
        ListUser.push(temp);
}
const addVideoTemp =(socketId,fileId)=>{
    const temp = ListUser.find(c => c.socketId == socketId);
    console.log(temp);
    const index= ListUser.indexOf(temp);
    console.log(fileId);
    ListUser[index].VideoTemp.push(fileId);
}
const removeVideoTemp =(socketId,fileId)=>{
    const temp = ListUser.find(c => c.socketId == socketId);
    const index= ListUser.indexOf(temp);
    const listtemp = temp[index].VideoTemp.filter(c => c!= fileId);
    ListUser[index].VideoTemp =listtemp;
}

const DeleteUserSocket = (socketId)=>{
    const temp = ListUser.find(c => c.socketId == socketId);
    temp.VideoTemp.forEach(fileId => {
        googleDrive.DeleteVideoTemp(fileId);
    });
    ListUser = ListUser.filter(c => c.socketId != socketId);
}

const checkExitsSocketId = (socketId)=>{
    var check=false;
    const temp = ListUser.find( c => c.socketId == socketId);
    if (temp) check = true;
    return check;
}

const checkExitsFieldId = (socketId,fieldId)=>{
    var check=false;
    console.log(socketId);
    console.log(ListUser);
    const temp = ListUser.find( c => c.socketId == socketId);
    console.log(temp);
    if (temp){
       const temp2 =  temp.VideoTemp.find(c=>c ==fieldId);
       if (temp2) check = true;
    } 
    return check;
}

module.exports= {addUserSocket , addVideoTemp , DeleteUserSocket ,checkExitsSocketId,checkExitsFieldId ,removeVideoTemp};