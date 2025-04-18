// app.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Autorise les requêtes du frontend
app.use(express.json()); // Permet de lire les données JSON envoyées

// 👇 NEW: Import and use the auth routes
const authRoutes = require('./routes/authRoutes'); // Make sure the path is correct
app.use('/api/auth', authRoutes); // All auth-related routes will start with /api/auth

module.exports = app;
