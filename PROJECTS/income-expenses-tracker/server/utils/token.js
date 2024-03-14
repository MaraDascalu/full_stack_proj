import jwt from "jsonwebtoken";

const { JWT_PRIVATE_KEY } = process.env;

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_PRIVATE_KEY, { expiresIn: "1h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return decoded;
  });
};

const getToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    return token;
  }
  return next(new Error("Token is missing!"));
};

export { generateToken, getToken, verifyToken };
