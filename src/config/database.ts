import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME ?? "shopper_db",
  process.env.DB_USER ?? "shopper_user",
  process.env.DB_PASSWORD ?? "shopper_password",
  {
    host: process.env.DB_HOST ?? "shopper_db",
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT ?? "3306", 10),
  }
);

export default sequelize;
