// src/server/models/User.js
const pool = require('../database');
const bcrypt = require('bcrypt');

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
    console.log('Original password:', this.password); // Debug
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log('Hashed password:', hashedPassword); // Debug
    await conn.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [this.username, this.email, hashedPassword]);
    conn.release();
  }

  static async findAll() {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM users');
    conn.release();
    return rows;
  }

  static async findByEmail(email) {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM users WHERE email = ?', [email]);
    conn.release();
    return rows[0];
    // return rows.length ? rows[0] : null;
  }

  async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
