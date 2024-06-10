const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password]);
    res.status(201).json({ id: result.insertId, username, email, password });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un usuario por ID
router.put('/:id', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [username, email, password, req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


// Eliminar un usuario por ID
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

