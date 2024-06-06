import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const id = await this.createUserUseCase.execute({
        name: name,
        email: email,
        password: password,
      });

      return res.status(201).json({
        newUser: { id, name, email },
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}
