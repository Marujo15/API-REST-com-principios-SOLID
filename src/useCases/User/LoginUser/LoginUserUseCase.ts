import { IUsersRepository } from "../../../repositories/IUsersRespository";
import { ILoginUserRequestDTO } from "./LoginUserDTO";
import { Utils } from "../../../Utils/Utils";
import { config } from "../../../config";
import jwt from "jsonwebtoken";

export class LoginUserUseCase {
  constructor(private usersRepositories: IUsersRepository) {}

  public async execute(data: ILoginUserRequestDTO) {
    const UserInDB = await this.usersRepositories.findUserByEmail(data.email);

    if (!UserInDB) {
      throw new Error(`The user doesn't exist.`);
    }

    const matchPasswords = await Utils.comparePassword(
      data.password,
      UserInDB.password
    );

    if (!matchPasswords) {
      throw new Error("Invalid email or password");
    }

    const user = {
      id: UserInDB.id,
      name: UserInDB.name,
      email: UserInDB.email,
    };

    const sessionToken = jwt.sign(user, config.SECRET_KEY);

    return {
      sessionToken: sessionToken,
      id: UserInDB.id,
    };
  }
}
