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
const REFRESH_TOKEN = '1//04sRMng4aNkqeCgYIARAAGAQSNwF-L9Ir3rihfNjDwik9l0b2-d4nGJOq6OXKvO7U3ggwuEzIvT4vcUqRmLOsHDBA_8sOdMYnqNE';

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
  
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN ,access_type: 'offline'});
  
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

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
const AddFileData = async (data,userid,location,size)=>{
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
    })
    df.save();
    DriveToken.update({}, { $inc: { totalvalue: size } });   
   } catch (error) {
       console.log(error)
   }
}

const uploadFile = async(file,filename,userid,location)=>{
    try {
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
        AddFileData(response.data,userid,location,file.size);
        console.log('111');
        return {status:'ok', data:response.data}

    } catch (error) {
        console.log(error);
        return { status:'err',data:''}
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

const  test = async ()=>{
    getfolderid('upload.avatar.user');
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
module.exports ={uploadFile , test}