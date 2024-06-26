// src/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const db = require('../database');
const bcrypt = require('bcrypt');
const authenticateJWT = require('../middleware/authenticateJWT');

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debugging line
    const { username, email, password } = req.body;
    const user = new User(username, email, password);
    await user.save();
    res.status(201).json({ message: 'Usuario creado correctamente' });
  } catch (err) {
    console.error(err.message); // Debugging line
    res.status(500).json({ error: err.message });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  try {
    console.log('Login request body:', req.body); // Debugging line
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Generated token:', token);
    res.cookie('token', token, { httpOnly: true, secure: false }); 
    res.json({ token });
  } catch (err) {
    console.error(err.message); // Debugging line
    res.status(500).json({ error: err.message });
  }
});

// // Middleware to protect routes
// const authenticateJWT = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied' });
//   }

//   try {
//     const verified = jwt.verify(token, JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ error: 'Invalid token' });
//   }
// };

// Obtener todos los usuarios
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un usuario por ID
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un usuario por ID
router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const { username } = req.body;
    console.log('Received username:', username); // Debugging line
    console.log('Request user ID:', req.user.id); // Debugging line

    if (!username) {
      return res.status(400).json({ error: 'El nombre de usuario es obligatorio' });
    }
    
    const userId = req.params.id;
    await db.query('UPDATE users SET username = ? WHERE id = ?', [username, userId]);

    res.status(200).json({ message: 'Nombre de usuario actualizado correctamente' });
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un usuario por ID
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


