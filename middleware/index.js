import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "../constants/index.js";

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const id = decodedToken.id;
    if (!id) {
      res.status(402).json({
        error: {
          message: 'Invalid token!'
        }
      });
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: {
        message: 'Invalid token!'
      }
    });
  }
};