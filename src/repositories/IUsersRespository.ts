import { User } from "../entities/User";

export interface IUsersRepository {
  findUserByEmail(email: string): Promise<User | null>;

  findUserById(id: string): Promise<User | null>;

  save(user: User): Promise<void>;

  updateUserById(id: string, updatedData: Partial<User>): Promise<void>;

  deleteUserById(id: string): Promise<void>;
  
  listUsers(): Promise<User[]>
}
