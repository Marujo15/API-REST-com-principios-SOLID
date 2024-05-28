import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  public async handle(req: Request, res: Response): Promise<Response> {
    const { newName, newEmail, newPassword } = req.body;
    const id: string = req.params.id

    try {
      const result = await this.updateUserUseCase.execute({
        id,
        newName: newName || null,
        newEmail: newEmail || null,
        newPassword: newPassword || null,
      });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: "Unexpected error" });
      }
    }
  }
}
