import { User } from "../../entities/User";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";
import { UserValidation } from "../../Validation/UserValidation";
import { IUsersRepository } from "../../repositories/IUsersRespository";
import { Utils } from "../../Utils/Utils";

export class UpdateUserUseCase {
  constructor(private usersRepositories: IUsersRepository) {}

  public async execute(data: IUpdateUserRequestDTO) {
    const user = <User>(await this.usersRepositories.findUserById(data.id));

    const id: string = data.id // readonly

    const name: string = data.newName || user.name;
    const email: string = data.newEmail || user.email;
    let password: string = data.newPassword || user.password;

    UserValidation.nameCheck(name);
    UserValidation.emailCheck(email);
    UserValidation.passwordCheck(password);

    password = await Utils.hashPassword(password)

    const updatedUser: Partial<User> = {
      name,
      email,
      password,
    };

    await this.usersRepositories.updateUserById(data.id, updatedUser);

    return { id, name, email };
  }
}
