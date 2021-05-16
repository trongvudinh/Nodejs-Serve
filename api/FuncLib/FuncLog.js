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
exports.LogError = (err,req , res)=>{
    try {
        log.error(new Error(JSON.stringify({
            data:err.message ? err.message :err,
            request:{url : req.originalUrl,header:req.headers , body: req.body , params : req.params},
        })));   
    } catch (error) {
        
    }
}