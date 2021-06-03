

exports.creatContentApproved = (app_code, userSend, userTo,data) => {
    
    switch (app_code) {
        case 0:
            return "";          
            break;
        case 1:
            return `${userSend.hoten} Yêu cầu thay đổi warning cho Video`;          
            break;
        case 2:
            return `${userSend.hoten} Muốn thêm series ${data.name} cho Video của mình`;
            break;
        case 3:
            return "";          
            break;
        default:
            break;
    }
}


exports.creatNoteApproved = (app_code, userSend, userTo,data) => {

    switch (app_code) {
        case 0:
            return "";          
            break;
        case 1:
            return `${userSend.hoten} mong muốn video của mình có warning = ${data.warning}`;         
            break;
        case 2:
            return ``;
            break;
        case 3:
            return "";          
            break;
        default:
            break;
    }
}
exports.creatUrlInfo = (app_code, userSend, userTo,data) => {

    switch (app_code) {
        case 0:
            return "";          
            break;
        case 1:
            return `${process.env.URL_HOST}/Movie/${data.id}`;       
            break;
        case 2:
            return `${process.env.URL_HOST}/Movie/${data.id}`;
            break;
        case 3:
            return "";          
            break;
        default:
            break;
    }
}

