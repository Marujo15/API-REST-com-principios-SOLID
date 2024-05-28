import dotenv from "dotenv";
dotenv.config();

const config = {
  SECRET_KEY: process.env.SECRET_KEY || "uma_senha_qualquer",
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || "development",
};

export { config };
