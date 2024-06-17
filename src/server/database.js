const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,     
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  bigIntAsNumber: true, // Para tratar los BigInt como números
  dateStrings: true // Para tratar fechas como cadenas
});

module.exports = pool;
