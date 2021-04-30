const log = require('./../loger/loger');

exports.LogInfo1 = (data)=>{
    try {
        log.info(JSON.stringify({
            data:data
        }));   
    } catch (error) {
        
    }
}
exports.LogInfo = (data)=>{
    try {
        log.info(JSON.stringify({
            data:data
        }));   
    } catch (error) {
        
    }
}
exports.LogError = (data,req , res)=>{
    try {
        log.info(new Error(JSON.stringify({
            request:{url : req.originalUrl,header:req.headers , body: req.body , params : req.params},
            data:data
        })));   
    } catch (error) {
        
    }
}