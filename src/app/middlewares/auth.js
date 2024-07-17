import jwt, { decode } from "jsonwebtoken";
import authConfig from "../../config/auth";

const authMiddleware = (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Token não providenciado" });
  }

  const token = authToken.split(" ").at(1);

  try {
    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
      if (err) {
        throw new Error();
      }
      req.userId = decoded.id;
      req.userName = decoded.name;
    });
  } catch (err) {
    return res.status(401).json({ error: "Token invalido" });
  }

  return next();
};

export default authMiddleware;
