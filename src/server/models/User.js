// src/server/models/User.js
const pool = require('../database');

class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async createUserTable() {
    const conn = await pool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `);
    conn.release();
  }

  async save() {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, this.password]);
    conn.release();
  }

  static async findAll() {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM users');
    conn.release();
    return rows;
  }
}

module.exports = User;
