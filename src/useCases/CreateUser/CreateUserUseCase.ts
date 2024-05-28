import { Utils } from "../../Utils/Utils";
import { UserValidation } from "../../Validation/UserValidation";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRespository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(private usersRepositories: IUsersRepository) {}

  public async execute(data: ICreateUserRequestDTO) {
    UserValidation.nameCheck(data.name);
    UserValidation.emailCheck(data.email);
    UserValidation.passwordCheck(data.password);

    const userAlreadyExists = await this.usersRepositories.findUserByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("The user already exists.");
    }

    const hashedPassword: string = await Utils.hashPassword(data.password);

    const user = new User({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });

    await this.usersRepositories.save(user);

    return user.id;
  }
}
