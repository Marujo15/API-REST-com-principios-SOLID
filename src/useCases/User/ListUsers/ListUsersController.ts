import { Request, Response } from "express";
import { ListUserUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  public constructor(private listUserUseCase: ListUserUseCase) {}

  public async handle(req: Request, res: Response) {
    try {
      const result = await this.listUserUseCase.execute();

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
