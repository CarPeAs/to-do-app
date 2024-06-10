const express = require('express');
const router = express.Router();
const db = require('../database');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await db.query('SELECT * FROM tasks');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una tarea por ID
router.get('/:id', async (req, res) => {
  try {
    const task = await db.query('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const result = await db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, status]);
    res.status(201).json({ id: result.insertId, title, description, status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una tarea por ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;
    await db.query('UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?', [title, description, status, req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una tarea por ID
router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
