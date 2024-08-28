import app from './app';
import { createConnection } from 'mysql2/promise';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conexão com o banco de dados
    const connection = await createConnection({
      host: 'shopper_db',
      user: 'shopper_user',
      password: 'shopper_password',
      database: 'shopper_db',
      port: 3306 
    });
    
    
    console.log('Connected to the database');


    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

startServer();
