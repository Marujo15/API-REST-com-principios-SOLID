import { Request, Response } from "express";
import { LoginUserUseCase } from "./LoginUserUseCase";

export class LoginUserController {
  constructor(
    private loginUserUseCase: LoginUserUseCase
  ) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const result = await this.loginUserUseCase.execute({
        email,
        password,
      });

      res.cookie("session_id", result.sessionToken, {
        maxAge: 900000,
        httpOnly: true,
      });

      return res.status(200).json({ User_ID: result.id });

    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}
