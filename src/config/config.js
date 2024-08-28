module.exports = {
  "development": {
    "username": "root",
    "password": "rootpassword",
    "database": "database_development",
    "host": "db",
    "dialect": "mysql",
    "port": 3306,
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "password",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
