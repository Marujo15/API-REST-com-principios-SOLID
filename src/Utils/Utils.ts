import bcrypt from "bcrypt";

export class Utils {
  private constructor() {}

  public static async hashPassword(password: string) {
    try {
      const salt = await bcrypt.genSalt(10);

      const hash: string = await bcrypt.hash(password, salt);

      return hash;
    } catch (error: any) {
      throw new Error(error)
    }
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string
  ) {
    try {
      const match = await bcrypt.compare(password, hashedPassword);

      return match;
    } catch (error) {
      console.error("Erro ao comparar senhas:", error);
    }
  }
}
