const DefualtValue = require('./../models/defualvalue');
const DefualtImg = require('./../models/Default_Img');
const DriveFolder = require('./../models/drivefolder');

exports.randomName = async () => {
    const ho = await DefualtValue.findOne({ id: 1 }).select('val');
    const tendem = await DefualtValue.findOne({ id: 2 }).select('val');
    const ten = await DefualtValue.findOne({ id: 3 }).select('val');
    const r1 = Math.floor(Math.random() * (ho.val.length - 1));
    const r2 = Math.floor(Math.random() * (tendem.val.length - 1));
    const r3 = Math.floor(Math.random() * (ten.val.length - 1));
    return ho.val[r1].trim() + " " + tendem.val[r2].trim() + " " + ten.val[r3].trim();
}
exports.randomAvatar = async () => {
    const listAvatar = await DefualtImg.findOne({ id: 2 }).select('list_img');
    const r = Math.floor(Math.random() * (listAvatar.list_img.length - 1));
    return listAvatar.list_img[r].url;
}
exports.randomUserTempId = () => {
    const r1 = Math.floor(Math.random() * 100);
    const re = "user_temp_" + r1.toString() + "_" + (new Date()).toISOString();
    const ss = Buffer.from(re).toString('base64');
    // console.log(re);

    return ss;
}
exports.getType = (file, type) => {
    //type: location to know file blob
    //0 : img,
    //1 :jpeg
    console.log(file.mimetype)
    switch (type) {
        case 0:
            return file.mimetype;
    }
}

exports.getFilename = (filename, type) => {
    //type: location to know file blob
    //0 : img,
    //1 :jpeg
    var re = new Date().toISOString();
    var index = filename.lastIndexOf('.');
    var name = filename.substr(0, index);
    var mimetype = filename.substr(index + 1, filename.length + 1);
    var s = '';
    console.log(type);
    console.log(`${re}-${name}.${mimetype}`);
    switch (type) {
        case 0:
            s = `${re}-${name}.${mimetype}`;
    }
    return s;
}
exports.getUrlByIdFile = (id, type, api) => {
    console.log(type);
    console.log(api);
    if (type == 0)
        return `https://drive.google.com/uc?id=${id}`;
    else {
        return `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${api}`
    }
}

exports.GetChatName = (user1,user2)=>{
    const t1 = user1;
    const t2 = user2;
    if (user1 > user2) {
        t1 = user2 ;
        t2 = user1;
    }
    return `chat_${t1}_${t2}`;
}