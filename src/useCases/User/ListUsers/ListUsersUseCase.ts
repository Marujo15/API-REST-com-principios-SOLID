import { IUsersRepository } from "../../../repositories/IUsersRespository";

export class ListUserUseCase {
    public constructor(
        private postgreesUserRespository: IUsersRepository
    ) {}

    public async execute() {
        return await this.postgreesUserRespository.listUsers()
    }
}