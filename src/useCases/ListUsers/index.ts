import { PostgresUserRepository } from "../../repositories/implementations/PostgreesUserRepository";
import { ListUsersController } from "./ListUsersController";
import { ListUserUseCase } from "./ListUsersUseCase";

const postgresUserRepository = new PostgresUserRepository()

const listUsersUseCase = new ListUserUseCase(
    postgresUserRepository
)

const listUsersController = new ListUsersController(
    listUsersUseCase
)

export { listUsersUseCase, listUsersController }