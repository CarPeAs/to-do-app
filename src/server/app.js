require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configuración de CORS
const corsOptions = {
  origin: "http://localhost:8080",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
};

app.use(cors(corsOptions));

app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.path}`);
//   next();
// });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;


