const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'admin',     
  password: 'pass16643',
  database: 'app_db',
  connectionLimit: 5
});

module.exports = pool;
