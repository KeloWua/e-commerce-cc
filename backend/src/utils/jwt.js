import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN || "1d";


export const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};


export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};