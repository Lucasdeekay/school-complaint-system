// backend/middleware/auth.js
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../config";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ error: "No token provided" });
  }
  verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).send({ error: "Failed to authenticate token" });
    }
    req.userId = decoded.userId;
    next();
  });
};

export default verifyToken;
