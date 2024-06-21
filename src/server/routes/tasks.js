// src/server/routes/tasks.js

const express = require('express');
const router = express.Router();
const db = require('../database');
const authenticateJWT = require('../middleware/authenticateJWT');
const JSBI = require('jsbi');

// Convert BigInt to string in the result set
function stringifyBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
}

// Obtener todas las tareas
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const userId = JSBI.BigInt(req.user.id);
    const tasks = await db.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);

    res.json(stringifyBigInt(tasks));

    // res.json(tasksFormatted);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Obtener una tarea por ID
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const taskId = JSBI.BigInt(req.params.id);
    const task = await db.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json(stringifyBigInt(task));
  } catch (err) {
    console.error("Error fetching task by ID:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Crear una nueva tarea
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const userId = JSBI.BigInt(req.user.id);
    const { title, description, status, due_date } = req.body;
    if (!title || !description || !status) {
      return res.status(400).json(stringifyBigInt({ error: 'Todos los campos son obligatorios' }));
    }
    const result = await db.query('INSERT INTO tasks (user_id, title, description, status, due_date) VALUES (?, ?, ?, ?, ?)', [userId, title, description, status, due_date]);
    const newTask = {
      id: result.insertId.toString(),
      userId: userId.toString(),
      title,
      description,
      status,
      due_date
    };
    res.status(201).json(stringifyBigInt(newTask));
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una tarea
router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const userId = JSBI.BigInt(req.user.id);
    const taskId = JSBI.BigInt(req.params.id);
    const { title, description, status, due_date } = req.body;
    await db.query('UPDATE tasks SET title = ?, description = ?, status = ?, due_date = ? WHERE id = ? AND user_id = ?', [title, description, status, due_date, taskId, userId]);
    res.status(204).end();
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Eliminar una tarea por ID
router.delete('/:id',authenticateJWT, async (req, res) => {
  try {
    const taskId = JSBI.BigInt(req.params.id);
    await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.status(204).end();
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
