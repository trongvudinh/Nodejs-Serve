const jwtHelper = require("./../controller/token");

exports.isuser =  async (req, res, next) => {
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if (tokenFromClient) {
      try {
        const decoded = await jwtHelper.verifyToken(tokenFromClient, process.env.JWT_SECRET);
        req.jwtDecoded = decoded;
        next();
      } catch (error) {
        return res.status(401).json({
          message: 'Unauthorized.',
        });
      }
    } else {
      return res.status(403).send({
        message: 'No token provided.',
      });
    }
  }
  