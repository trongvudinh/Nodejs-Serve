const jwt = require("jsonwebtoken");

let generateToken = (user, secretSignature, tokenLife,type) => {
  return new Promise((resolve, reject) => {
    const userData = {
      id: user.id,
      username: user.username,
      level: user.level,
      type:type,
      //0:user, 1: khach
      creattime:new Date(),
    }
    jwt.sign(
      {data: userData},
      secretSignature,
      {
        algorithm: "HS256",
        expiresIn: tokenLife,
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
    });
  });
}

let verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}
module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken,
};