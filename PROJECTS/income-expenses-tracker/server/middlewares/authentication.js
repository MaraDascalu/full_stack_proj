import { getToken, verifyToken } from "../utils/token.js";

const isAuthenticated = (req, res, next) => {
  // * get token from request header
  const token = getToken(req);

  // * verify token
  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    return next(new Error("Invalid/Expired token!"));
  }

  // * save the user into req object
  req.user = decodedToken.id;

  next();
};

export { isAuthenticated };
