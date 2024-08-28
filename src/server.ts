import app from './app';
import { createConnection } from 'mysql2/promise';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conexão com o banco de dados
    const connection = await createConnection({
      host: 'db', // Use o nome do serviço do banco no Docker Compose
      user: 'your_user',
      password: 'your_password',
      database: 'your_database_name',
      port: 3306 // Use a porta interna do contêiner MySQL, que é 3306
    });
    
    console.log('Connected to the database');

    // Iniciando o servidor
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
