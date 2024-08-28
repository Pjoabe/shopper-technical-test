module.exports = {
  "development": {
    "username": "shopper_user",
    "password": "shopper_password",
    "database": "shopper_db",
    "host": "shopper_db", // Nome do serviço do banco de dados no Docker Compose
    "dialect": "mysql",
    "port": 3306
  },
  "test": {
    "username": "shopper_user",
    "password": "shopper_password",
    "database": "shopper_db_test", // Use um nome diferente para o banco de dados de teste, se necessário
    "host": "shopper_db", // Nome do serviço do banco de dados no Docker Compose
    "dialect": "mysql",
    "port": 3306
  },
  "production": {
    "username": "shopper_user",
    "password": "shopper_password",
    "database": "shopper_db_production", // Use um nome diferente para o banco de dados de produção, se necessário
    "host": "shopper_db", // Nome do serviço do banco de dados no Docker Compose
    "dialect": "mysql",
    "port": 3306
  }
}
