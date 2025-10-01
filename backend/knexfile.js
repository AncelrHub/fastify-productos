require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_CLIENT || 'pg',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'productosdb',
      port: process.env.DB_PORT || 5432
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
  }
};
