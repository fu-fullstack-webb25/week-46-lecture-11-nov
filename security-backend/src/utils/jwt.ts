import jwt from "jsonwebtoken";
import type { JwtPayload } from "../types/auth.types.js";

export const signToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, 'jesper', {
    expiresIn: "1h",
  });
};

export const verifyToken = (token : string) : JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, 'jesper') as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};