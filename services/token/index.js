import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../../constants/index.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: 6000
  });
}