import { PostgresUserRepository } from "../../../repositories/implementations/PostgreesUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserController } from "./CreateUserController";

const postgresUsersRepository = new PostgresUserRepository();

const createUserUseCase = new CreateUserUseCase(
    postgresUsersRepository
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserController, createUserUseCase };
