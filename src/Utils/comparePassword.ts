import bcrypt from "bcrypt";

export async function comparePassword(
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
