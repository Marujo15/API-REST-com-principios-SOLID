import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);

    const hash: string = await bcrypt.hash(password, salt);

    return hash;
  } catch (error: any) {
    throw new Error(error);
  }
}
