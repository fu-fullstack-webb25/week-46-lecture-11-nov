import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

export const requireAuth = (
  req : Request,
  res : Response,
  next : NextFunction
) => {
  // Hämta JWT från cookien
  const token = req.cookies?.token;
  console.log('Req:', req.cookies);
  console.log("Token from cookie:", token);

  if (!token) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  try {
    // Kontrollera signatur och giltighetstid
    const payload = verifyToken(token);
    console.log("Decoded JWT payload:", payload);

    // Token är giltig
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};