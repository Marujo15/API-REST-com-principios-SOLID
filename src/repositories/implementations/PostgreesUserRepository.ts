import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRespository";
import { Pool } from "pg";

export class PostgresUserRepository implements IUsersRepository {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: "luizmarujo",
      password: "123",
      host: "localhost",
      database: "a06_q4_typescript",
      port: 5432,
    });
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const query = `
    SELECT * FROM Users WHERE email = $1
    `;

    const result = await this.pool.query(query, [email]);

    if (result.rows.length > 0) {
      const userFromDb = result.rows[0];

      const user: User = {
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        password: userFromDb.password,
      };

      return user;
    } else {
      return null;
    }
  }

  public async findUserById(id: string): Promise<User | null> {
    const query = `
    SELECT * FROM Users WHERE id = $1
    `;

    const result = await this.pool.query(query, [id]);

    if (result.rows.length > 0) {
      const userFromDb = result.rows[0];

      const user: User = {
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        password: userFromDb.password,
      };

      return user;
    } else {
      return null;
    }
  }

  public async save(user: User): Promise<void> {
    const query = `
        INSERT INTO Users (id, name, email, password)
        VALUES ($1, $2, $3, $4)
        `;

    this.pool
      .query(query, [user.id, user.name, user.email, user.password])
      .then(() => {
        console.log("User inserted successfully!", user);
      })
      .catch((err) => {
        console.error("Error inserting user:", err);
      });
  }

  public async updateUserById(
    id: string,
    updatedData: Partial<User>
  ): Promise<void> {
    const query = `
      UPDATE Users
      SET name = $1, password = $2, email = $3
      WHERE id = $4
    `;

    const { name, password, email } = updatedData;

    try {
      await this.pool.query(query, [name, password, email, id]);

      console.log(`User with email ${email} updated successfully!`);
    } catch (error) {
      console.error(`Error updating user ${name}:`, error);

      throw new Error("Failed to update user.");
    }
  }

  public async deleteUserById(id: string): Promise<void> {
    const query = `
      DELETE FROM Users WHERE id = $1
    `;

    try {
      await this.pool.query(query, [id]);

      console.log(`User with ID ${id} deleted successfully!`);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);

      throw new Error("Failed to delete user.");
    }
  }

  public async listUsers(): Promise<User[]> {
    const query = `
    SELECT * FROM Users
  `;

    try {
      // Execute a consulta SQL para buscar todos os usuários
      const result = await this.pool.query(query);

      // Mapeie os resultados para o formato da interface User
      const users: User[] = result.rows.map((userFromDb: any) => ({
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        password: userFromDb.password,
      }));

      return users;
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error("Failed to fetch users.");
    }
  }
}
