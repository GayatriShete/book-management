const jwt = require("jsonwebtoken");
const logger = require("../../logger");
const { error } = require("winston");

exports.authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.error({message:'Access token required'})
    return res.status(401).json({ error: "Access token required"});
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    logger.error({message:'Invalid or expired token'})
    res.status(403).json({ error: "Invalid or expired token"});
  }
};
