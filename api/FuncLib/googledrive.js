const { google} =require('googleapis');
const fs = require('fs');
const FuncLib = require('./FuncLib');

const streamBuffers = require('stream');
const TblToken = require('./../models/driverefreshtoken');
const DriveFolder = require('./../models/drivefolder');
const driveFile = require('./../models/drivefile');
const DriveToken = require('./../models/driverefreshtoken');
const mongoose = require('mongoose');

const CLIENT_ID = '1030043852361-ouafeai2f4662jnkk9julgf3337cqtne.apps.googleusercontent.com';
const CLIENT_SECRET = 'MycSX3m0sBnldjFEHhjZ8sx5';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
//--kedidemnd@gmail.com-----------------------------------
//1//04fzQZ8UJ8WV3CgYIARAAGAQSNwF-L9Ir_HNkt8tdGmAYEJFabDykNTd7T8XDh_ZHDVd6nWn_4_utbVC8AV3DAlRwRItNNJ40_pI
const REFRESH_TOKEN = '1//047VidJsjPGGuCgYIARAAGAQSNwF-L9Iregr-YlT_r8rZCAfuyA6CbvJNkaaewxDwgG-J4YKcAjJpdfwTRLA3_52YfNfyOMPVDIw';
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
  
oauth2Client.setCredentials({})
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN ,access_type: 'offline'});
  
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

//-----taolatrong94@gmail.com-----------------------------------
const REFRESH_TOKEN2 = '1//04hO7tccHPuFlCgYIARAAGAQSNwF-L9IrkaOvbPo-qRRvqj9VdFU0Os5GnGWjdQFFMdEn0xIizwC4xxwuaOP29wODhhHZd1Jd3aI';
const oauth2Client2 = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
  
oauth2Client2.setCredentials({ refresh_token: REFRESH_TOKEN2 ,access_type: 'offline'});
  
const drive2 = google.drive({
    version: 'v3',
    auth: oauth2Client2,
});

//========================================================================================================================
//========================================================================================================================
//========================================================================================================================
//========================================================================================================================

const getFolderId = async(location)=>{
    const d = new Date();
    var s = `${location}.f${d.getFullYear()}.f${(d.getMonth() + 1)}`;
    const re = await DriveFolder.find();
    var arr = s.split(".");
    var f = re[0].folder;
    var check = false;
    arr.forEach(folder => {
        if (f[0][folder])
            f =f[0][folder];
        else check = true;
    });
    if (check) return ""; else return f[0].id;
}
const AddFileData = async (data,userid,location,size,key)=>{
   try {
    const r = await getFolderId(location);
    const df = new driveFile({
        _id : mongoose.Types.ObjectId(),
        email : 'kedidemnd@gmail.com',
        user : userid,
        location : r,
        fileid : data.id,
        fieldname : data.name,
        creattime:new Date(),
        key:key,
    })
    df.save();
    DriveToken.update({}, { $inc: { totalvalue: size } });   
   } catch (error) {
       console.log(error)
   }
}
const checkLimitUsage = async ()=>{
    const re = await drive.about.get({fields :'storageQuota' });
    const space = parseInt(re.data.limit,10) - parseInt(re.data.usage,10) -parseInt(re.data.usageInDrive,10) -parseInt(re.data.usageInDriveTrash,10);
    return space;
}
const check_aces_token = async (email)=>{
    const re = await TblToken.find({email : email})
    if (re.length >0){
        try {
            const time = new Date() - new Date(re[0].creattime);  
            if (time >60000) return {status : 'ok',token :re[0].token};
        } catch (error) {
            return {status : 'err',token :''};
        }      
    }
    else return {status : 'err',token :''};
}
//====================================================================================================================================================
//====================================================================================================================================================
const uploadFile = async(file,filename,userid,location,key)=>{
    try {
        const api = 'AIzaSyCcuPkd2GNFFvo0vgBhSnusi40OPu8rVI4';
        var myReadableStreamBuffer = new streamBuffers.Readable({
            read() {
              this.push(file.data);
              this.push(null);
            }
        });
        const type = FuncLib.getType(file,0)
        const idFolder = await getFolderId(location);
        console.log(idFolder)
        const response = await drive.files.create({
            requestBody: {
                name: filename, //This can be name of your choice
                mimeType: type,
                parents:[idFolder]
            },
            media: {
                mimeType: type,
                body: myReadableStreamBuffer,
            },
        });
        console.log(response.data);
        AddFileData(response.data,userid,location,file.size,key);
        console.log('111');
        return {status:'ok', data:response.data,gmail:api}

    } catch (error) {
        console.log(error);
        return { status:'err',data:'',gmail:''};
    }
}
const publicUrl = async(id)=>{
    try {
        await drive.permissions.create({
            fileId : id,
            requestBody:{
                role : 'reader',
                type :'anyone',
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const newFileByTemp= async(fileId,filename,userid,location,key,type)=>{
    try{
        const api = 'AIzaSyCcuPkd2GNFFvo0vgBhSnusi40OPu8rVI4';
        const idFolder = await getFolderId(location);
        const re = await drive.files.copy({
            fileId:fileId,
            requestBody:{
                name: filename,
                mimeType: type,
                parents:[idFolder]
            }
        })
        console.log(re.data);
        AddFileData(re.data,userid,location,0,key);
        console.log('111');
        return {status:'ok', data:re.data,gmail:api}
    } catch (error) {
    console.log(error);
    return { status:'err',data:'',gmail:''};
}
}
const  test = async ()=>{
    try{
        const re = await drive.files.list({q : `'1Mg5HHvXi61yJ-PvGU4SIO554cYlermY-' in parents`});
        //const re =await drive2.files.list();
        // const idFolder = await getFolderId("upload.avatar.company");
        // const re = await drive.files.copy({
        //     fileId:'1C8ga7TMpMW8XtWzhXwO3P6u0BaiCNmAX',
        //     requestBody:{
        //         name: 'test.mp4',
        //         mimeType: 'video/mp4',
        //         parents:[idFolder]
        //     }
        // })
        console.log(re.data);
        return re.data;

    }catch(error){
        console.log(error)
    }
}

//====================================================================================================================================================
//===========================================================    DRIVE2   =========================================================================================

const DeleteVideoTemp = async(filedId)=>{
    try {
        const api = 'AIzaSyC445uXRIUOq16aG-0zVYEkqNY-yxql8HM';
        const response = await drive2.files.delete({fileId : filedId});
        return {status:'ok', data:response.data,gmail:api};

    } catch (error) {
        console.log(error);
        return { status:'err',data:'',gmail:''};
    }
}

const upLoadvideoTemp = async(file,filename)=>{
    try {
        const api = 'AIzaSyCJye-ni4TMgycY1d5brVCnj8isQkBRxbc';
        var myReadableStreamBuffer = new streamBuffers.Readable({
            read() {
              this.push(file.data);
              this.push(null);
            }
        });
        const type = FuncLib.getType(file,0)
        const response = await drive2.files.create({
            requestBody: {
                name: filename, //This can be name of your choice
                mimeType: type,
                parents:['1nVMVx7gUlvu5IMpsY5k4IEe2q9MHu7b2']
            },
            media: {
                mimeType: type,
                body: myReadableStreamBuffer,
            },
        });
        console.log(response.data);
        return {status:'ok', data:response.data, gmail:api}

    } catch (error) {
        console.log(error);
        return { status:'err',data:'',gmail:''};
    }
}

module.exports ={uploadFile , test , upLoadvideoTemp , DeleteVideoTemp , newFileByTemp}