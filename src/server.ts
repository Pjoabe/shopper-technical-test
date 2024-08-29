import app from "./app";
import sequelize from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database with Sequelize");

    sequelize.sync().then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
