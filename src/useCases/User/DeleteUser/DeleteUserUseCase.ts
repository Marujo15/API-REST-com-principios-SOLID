import { IUsersRepository } from "../../../repositories/IUsersRespository";
import { IDeleteUserRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase {
  constructor(private usersRepositories: IUsersRepository) {}

  public async execute(data: IDeleteUserRequestDTO) {
    const id = data.id;

    const user = await this.usersRepositories.findUserById(id);

    if (!user) {
      throw new Error("User not found");
    }

    await this.usersRepositories.deleteUserById(id);

    const deletedUser = {
        id, 
        name: user.name, 
        email: user.email
    }

    return deletedUser;
  }
}
