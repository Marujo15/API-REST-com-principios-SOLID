import { PostgresUserRepository } from "../../../repositories/implementations/PostgreesUserRepository";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UpdateUserController } from "./UpdaUserController";

const postgresUsersRepository = new PostgresUserRepository();

const updateUserUseCase = new UpdateUserUseCase(
    postgresUsersRepository
);

const updateUserController = new UpdateUserController(
    updateUserUseCase
);

export { updateUserUseCase, updateUserController };
