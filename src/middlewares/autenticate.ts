import { NextFunction, Request, Response } from "express";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.session_id;

  if (!token)
    return res.status(401).json({ error: "Unauthorized: No tokens provided" });

  next();
}
