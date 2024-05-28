export class UserValidation {
  private constructor() {}

  public static emailCheck(email: string): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email))
      throw new Error(`
      The email is invalid. 
      Please check the email example: 
      example@example.com
      `);
  }

  public static nameCheck(name: string): void {
    const cleanedName = name.trim();

    if (!(cleanedName.length >= 4))
      throw new Error("The name must have at least 4 characters");
  }

  public static passwordCheck(password: string): void {
    const hasLetter = /[a-zA-Z]/.test(password);

    const hasNumber = /\d/.test(password);

    if (!(password.length >= 8))
      throw new Error("The password must have at least 8 characters long");

    if (!hasNumber) throw new Error("The password must have at least 1 number");

    if (!hasLetter) throw new Error("The password must have at least 1 letter");
  }
}
