




// 👇 NEW: Import and use the auth routes
const authRoutes = require('./routes/authRoutes'); // Make sure the path is correct
app.use('/api/auth', authRoutes); // All auth-related routes will start with /api/auth

module.exports = app;

 // app.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route de test
app.get('/', (req, res) => {
  res.send("Bienvenue sur le backend de la plateforme d'examen 🎓");
});

// Route de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Champs requis manquants' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });

    if (results.length > 0) {
      res.status(200).json({ message: 'Connexion réussie', user: results[0] });
    } else {
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  });
});

// Route de register (ajoutée par Abir)
app.post('/register', (req, res) => {
  const { fullname, email, password } = req.body;
  if (!fullname || !email || !password) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const query = 'INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)';
  db.query(query, [fullname, email, password], (err, result) => {
    if (err) {
      console.error('Erreur MySQL :', err);
      return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
    res.status(201).json({ message: 'Utilisateur inscrit avec succès' });
  });
});

module.exports = app;
 
