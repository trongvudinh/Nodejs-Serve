const jwtHelper = require("./../FuncLib/token");
const log = require('./../FuncLib/FuncLog');
const UserToken = require('./../models/token')

exports.is_token = async (req, res, next) => {
	try {
		// console.log(req.headers);
		const tokenFromClient = req.headers.authorization.split(" ")[1];
		if (tokenFromClient) {
			try {
				const decoded = await jwtHelper.verifyToken(tokenFromClient, process.env.JWT_SECRET);
				req.jwtDecoded = decoded;
				const re = await UserToken.find({user : decoded.data.id , token : tokenFromClient , type :decoded.data.type});
				if (re.length > 0)
				next();
				else 
				{
					log.LogError('Unauthorized',req,res);
					return res.status(401).json({
						message: 'Unauthorized.',
					});
				}
			} catch (error) {
				log.LogError(error,req,res);
				return res.status(401).json({
					message: 'Unauthorized.',
				});
			}
		} else {
			return res.status(403).json({
				message: 'No token provided.',
			});
		}
	} catch (error) {
		log.LogError(error,req,res);
		return res.status(401).json({
			message: 'Unauthorized.',
		});
	}
}


exports.is_user = async (req, res, next) => {
	try {
		// console.log(req.headers);
		const tokenFromClient = req.headers.authorization.split(" ")[1];
		if (tokenFromClient) {
			try {
				const decoded = await jwtHelper.verifyToken(tokenFromClient, process.env.JWT_SECRET);
				req.jwtDecoded = decoded;
				if (decoded.data.type == 1){
					log.LogError('Unauthorized',req,res);
					return res.status(401).json({
						message: 'Unauthorized.',
					});
				}
				const re = await UserToken.find({ $and :[{user : decoded.data.id  , type :decoded.data.type},
					{$or :[{token : tokenFromClient} , {refreshtoken : tokenFromClient}]}]});
				if (re.length > 0)
				next();
				else 
				{
					log.LogError('Unauthorized',req,res);
					return res.status(401).json({
						message: 'Unauthorized.',
					});
				}
			} catch (error) {
				log.LogError(error,req,res);
				return res.status(401).json({
					message: 'Unauthorized.',
				});
			}
		} else {
			return res.status(403).json({
				message: 'No token provided.',
			});
		}
	} catch (error) {
		log.LogError(error,req,res);
		return res.status(401).json({
			message: 'Unauthorized.',
		});
	}
}
exports.is_admin = async (req, res, next) => {
	try {
		// console.log(req.headers);
		const tokenFromClient = req.headers.authorization.split(" ")[1];
		if (tokenFromClient) {
			try {
				const decoded = await jwtHelper.verifyToken(tokenFromClient, process.env.JWT_SECRET);
				req.jwtDecoded = decoded;
				if (decoded.data.type == 1 && decoded.data.level>=6){
					log.LogError('Unauthorized',req,res);
					return res.status(401).json({
						message: 'Unauthorized.',
					});
				}
				const re = await UserToken.find({ $and :[{user : decoded.data.id  , type :decoded.data.type},
					{$or :[{token : tokenFromClient} , {refreshtoken : tokenFromClient}]}]});
				if (re.length > 0)
				next();
				else 
				{
					log.LogError('Unauthorized',req,res);
					return res.status(401).json({
						message: 'Unauthorized.',
					});
				}
			} catch (error) {
				log.LogError(error,req,res);
				return res.status(401).json({
					message: 'Unauthorized.',
				});
			}
		} else {
			return res.status(403).json({
				message: 'No token provided.',
			});
		}
	} catch (error) {
		log.LogError(error,req,res);
		return res.status(401).json({
			message: 'Unauthorized.',
		});
	}
}
