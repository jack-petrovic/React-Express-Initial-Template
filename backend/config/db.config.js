import dotenv from "dotenv";
dotenv.config();

export default {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USERNAME || "root",
  PASSWORD: process.env.DB_PASSWORD || "",
  DB: process.env.DB_DATABASE || "summing_up",
  dialect: "mysql",
  seederStorage: "sequelize",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
