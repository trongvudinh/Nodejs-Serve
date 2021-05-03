const DefualtValue = require('./../models/defualvalue');
const DefualtImg = require('./../models/Default_Img');
exports.randomname = async() =>{
    const ho = await DefualtValue.findOne({id : 1}).select('val');
    const tendem = await DefualtValue.findOne({ id : 2}).select('val');
    const ten = await DefualtValue.findOne({ id : 3}).select('val');
    const r1 = Math.floor(Math.random() * (ho.val.length -1));
    const r2 = Math.floor(Math.random() * (tendem.val.length -1));
    const r3 = Math.floor(Math.random() * (ten.val.length -1));
    return ho.val[r1].trim() +" " + tendem.val[r2].trim() + " " + ten.val[r3].trim();
}
exports.randomavatar = async() =>{
    const listavatar = await DefualtImg.findOne({id : 2}).select('list_img');
    const r =  Math.floor(Math.random() * (listavatar.list_img.length -1));
    return listavatar.list_img[r].url;
}
exports.randomUserTempId = () =>{
    const r1 = Math.floor(Math.random() * 100);
    const re = "user_temp_"+ r1.toString() + "_" + (new Date()).toISOString();
    const ss = Buffer.from(re).toString('base64');
    // console.log(re);

    return ss;
}