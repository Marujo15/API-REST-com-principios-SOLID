import { Request, Response } from "express";

export class LogoutUserController {
  public async handle(req: Request, res: Response) {
    res.clearCookie("session_id");
    res.status(201).json({ success: true });
  }
}
