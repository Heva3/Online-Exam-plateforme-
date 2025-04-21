// backend/app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// 1. Database Connection
connectDB();

// 2. Global Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080', // Match your frontend port
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsers
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 3. Routes
app.get('/', (req, res) => {
  res.send("Bienvenue sur le backend de la plateforme d'examen 🎓");
});

// Auth Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 4. Error Handling (should be last middleware)
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Handle 404 routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;